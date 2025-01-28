document.addEventListener("DOMContentLoaded", function() {
    const publicPages = ["../pages/index.html",  
        "../pages/login.html", 
        "../pages/register.html"].map(page => page.split('/').pop());

    const currentPath = window.location.pathname.split('/').pop();

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
        console.error('Session verification error:', error);
    });
});