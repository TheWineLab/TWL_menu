function showMenuButtons() {
    if (document.getElementById('back-button').classList.contains('disabled')) {
        return;
    }
    document.getElementById('menu-buttons').style.display = 'flex';
    document.getElementById('back-button').classList.add('disabled');
    document.getElementById('pdf-container').style.display = 'none';
    document.getElementById('access-message').style.display = 'none';
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const toggleButton = document.getElementById('dark-mode-toggle');
    const toggleLabel = document.getElementById('dark-mode-label');
    if (document.body.classList.contains('dark-mode')) {
        toggleButton.textContent = '☀️';
        toggleLabel.textContent = 'Light Mode';
    } else {
        toggleButton.textContent = '🌙';
        toggleLabel.textContent = 'Dark Mode';
    }
}