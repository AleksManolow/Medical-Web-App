document.addEventListener("DOMContentLoaded", function() {
    const publicPages = ["/Medical-Web-App/public/pages/index.html",  
        "/Medical-Web-App/public/pages/login.html", 
        "/Medical-Web-App/public/pages/register.html"];

    const currentPath = window.location.pathname;

    fetch('../../src/api/session.php', {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        if (!data.success) {
        
            if (!publicPages.includes(currentPath)) {
                window.location.replace("../pages/login.html");
            }
        }
    })
    .catch(error => {
        console.error('Грешка при проверка на сесията:', error);
    });
});