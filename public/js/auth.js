document.addEventListener("DOMContentLoaded", function() {
    const publicPages = ["/Medical-Web-App/public/pages/index.html"];
    const currentPath = window.location.pathname;

    fetch('../../src/api/session.php', {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            updateNavigation(true);
        } else {
            updateNavigation(false);

            if (!publicPages.includes(currentPath)) {
                window.location.replace("../pages/login.html");
            }
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

