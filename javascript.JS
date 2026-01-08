// Configuration constants
const CIRCUMFERENCE = 439.8;

function toggleModal() {
    document.getElementById('modal').classList.toggle('hidden');
}

function updateDashboard(isInitialLoad = false) {
    // 1. Get Values from inputs
    const target = parseFloat(document.getElementById('in-target').value) || 0;
    const current = parseFloat(document.getElementById('in-current').value) || 0;
    const months = parseInt(document.getElementById('in-months').value) || 1;

    // 2. Core Calculations
    const percentage = Math.min(100, (current / target) * 100);
    const monthly = (target - current) / months;

    // 3. Update Visual Ring
    const offset = CIRCUMFERENCE - (percentage / 100) * CIRCUMFERENCE;
    document.getElementById('ring').style.strokeDashoffset = offset;

    // 4. Update UI Texts
    document.getElementById('percent-text').innerText = Math.round(percentage) + "%";
    document.getElementById('monthly-out').innerText = "$" + (monthly > 0 ? monthly.toLocaleString(undefined, {minimumFractionDigits: 2}) : "0.00");
    
    // 5. Save to Local Storage (only if it's a user update, not the initial load)
    if (!isInitialLoad) {
        const userData = { target, current, months };
        localStorage.setItem('chronos_savings_data', JSON.stringify(userData));
        toggleModal(); // Close modal after sync
    }
}

function loadData() {
    const savedData = localStorage.getItem('chronos_savings_data');
    
    if (savedData) {
        const data = JSON.parse(savedData);
        
        // Fill the inputs with saved data
        document.getElementById('in-target').value = data.target;
        document.getElementById('in-current').value = data.current;
        document.getElementById('in-months').value = data.months;
        
        // Update the UI without triggering a re-save
        updateDashboard(true);
    } else {
        // First time user? Just run default values
        updateDashboard(true);
    }
}

// Initialize the system when the window loads
window.onload = loadData;