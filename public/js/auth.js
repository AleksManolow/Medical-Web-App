document.addEventListener("DOMContentLoaded", function() {
    const publicPages = ["/Medical-Web-App/public/pages/index.html"];
    const currentPath = window.location.pathname;

    fetch('../../src/api/session.php', {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            //Управление на навигацията
            updateNavigation(true);

            //Ако сме в profile.html и не сме доктори да се премахват полетата за специалалност и телефон
            if(currentPath == "/Medical-Web-App/public/pages/profile.html" && data.role == "Patient"){
                document.getElementById('specialty-form').style.display = 'none';
                document.getElementById('phone-form').style.display = 'none';
            }

            //Ако сме админ логото да ни препращаа към админския панел а не към обикновенния
            if(data.role == "Admin")
            {
                const logoLink = document.querySelector(".logo");
                logoLink.setAttribute('href', 'admin_panel.html');
            }

        } else {
            //Управление на навигацията
            updateNavigation(false);

            //Ако не сме логнати и се опитаме да достъпиме страница ще ни прати да се логнем!! 
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
        document.getElementById('profile-link').style.display = 'block';
    } else {
        document.getElementById('login-link').style.display = 'block';
        document.getElementById('register-link').style.display = 'block';
        document.getElementById('logout-link').style.display = 'none';
        document.getElementById('profile-link').style.display = 'none';
    }
}

