const eventInput = document.getElementById('eventInput');
const targetDate = document.getElementById('targetDate');
const countdownEl = document.getElementById('countdown');
const containerEl = document.querySelector('.container');
const modal = document.getElementById('modal');
const settingsBtn = document.getElementById('settings-btn');
const closeIcon = document.querySelectorAll('.close');
const colorModal = document.getElementById('color-modal');
const colorBtn = document.getElementById('color-btn');
const colorSelect = document.getElementById('colorSelect');

function updateCountdown() {
    const eventName = eventInput.value || 'Notion Launch';
    const targetDateTime = new Date(targetDate.value).getTime();
    const now = new Date().getTime();
    const distance = targetDateTime - now;

    if (distance < 0) {
        countdownEl.innerHTML = `${eventName} has already occurred.`;
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownEl.innerHTML = `${eventName}<br>${days}d ${hours}h ${minutes}m ${seconds}s`;
}

settingsBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

colorBtn.addEventListener('click', () => {
    colorModal.style.display = 'block';
});

closeIcon.forEach(icon => {
    icon.addEventListener('click', () => {
        modal.style.display = 'none';
        colorModal.style.display = 'none';
    });
});

window.addEventListener('click', (event) => {
    if (event.target === modal || event.target === colorModal) {
        modal.style.display = 'none';
        colorModal.style.display = 'none';
    }
});

targetDate.addEventListener('change', updateCountdown);
eventInput.addEventListener('input', updateCountdown);

colorSelect.addEventListener('change', () => {
    const selectedColor = colorSelect.value;
    containerEl.style.backgroundColor = selectedColor;
    savePreferences();
});

function savePreferences() {
    const preferences = {
        eventName: eventInput.value,
        targetDateTime: targetDate.value,
        containerColor: containerEl.style.backgroundColor
    };
    localStorage.setItem('countdownPreferences', JSON.stringify(preferences));
}

function loadPreferences() {
    const preferences = JSON.parse(localStorage.getItem('countdownPreferences'));
    if (preferences) {
        eventInput.value = preferences.eventName;
        targetDate.value = preferences.targetDateTime;
        containerEl.style.backgroundColor = preferences.containerColor;
        updateCountdown();
    } else {
        countdownEl.innerHTML = 'Notion Launch<br>365d 0h 0m 0s';
    }
}

loadPreferences();
setInterval(updateCountdown, 1000);
