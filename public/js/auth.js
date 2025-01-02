document.addEventListener("DOMContentLoaded", function() {
    fetch('../../src/api/session.php', {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            updateNavigation(true);
        } else {
            updateNavigation(false);
        }
    })
    .catch(error => {
        console.error('Грешка при проверка на сесията:', error);
    });
});

function updateNavigation(isLoggedIn) {
    if (isLoggedIn) {
        document.getElementById('login-link').style.display = 'none';
        document.getElementById('register-link').style.display = 'none';
        document.getElementById('logout-link').style.display = 'block';
    } else {
        document.getElementById('login-link').style.display = 'block';
        document.getElementById('register-link').style.display = 'block';
        document.getElementById('logout-link').style.display = 'none';
    }
}

