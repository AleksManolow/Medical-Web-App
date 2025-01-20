//вмъкване на navbar.html
window.onload = function() {
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-container').innerHTML = data;
        })
        .catch(error => {
            console.error('Error loading navbar:', error);
        });
}

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
            updateNavigationAuthentication(true);
            updateNavigationMain(true, data.role);

            //Ако сме в profile.html и не сме доктори да се премахват полетата за специалалност и телефон
            if(currentPath == "/Medical-Web-App/public/pages/profile.html" && data.role == "Patient"){
                document.getElementById('specialty-form').style.display = 'none';
                document.getElementById('phone-form').style.display = 'none';
                document.getElementById('description-form').style.display = 'none';
            }

            //Ако сме админ логото да ни препращаа към админския панел а не към обикновенния
            if(data.role == "Admin")
            {
                const logoLink = document.querySelector(".logo");
                logoLink.setAttribute('href', 'admin_panel.html');
            }

            //Управление на навигацията
            const getStartedButton = document.getElementById("get-start-btn");
            if (getStartedButton) {
                getStartedButton.style.display = "none";
            }
        } else {

            updateNavigationAuthentication(false);
            updateNavigationMain(false, null);
            //Ако не сме логнати и се опитаме да достъпиме страница ще ни прати да се логнем!! 
            if (!publicPages.includes(currentPath) && currentPath != "/Medical-Web-App/public/pages/login.html" && currentPath != "/Medical-Web-App/public/pages/register.html") {
                window.location.replace("../pages/login.html");
            }
        }
    })
    .catch(error => {
        console.error('Грешка при проверка на сесията:', error);
    });
});

function updateNavigationAuthentication(isLoggedIn) {
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

function updateNavigationMain(isLoggedIn, role) {
    if (isLoggedIn) {
        if(role == 'Admin')
        {
            document.getElementById('add-doctor-link').style.display = 'block';
            document.getElementById('all-doctors-link').style.display = 'block';
            document.getElementById('all-patients-link').style.display = 'block';
            document.getElementById('appointments-link').style.display = 'block';
        }
        else if(role == 'Patient'){
            document.getElementById('add-doctor-link').style.display = 'none';
            document.getElementById('all-doctors-link').style.display = 'block';
            document.getElementById('all-patients-link').style.display = 'none';
            document.getElementById('appointments-link').style.display = 'block';
        }
        else if(role == 'Doctor'){
            document.getElementById('add-doctor-link').style.display = 'none';
            document.getElementById('all-doctors-link').style.display = 'none';
            document.getElementById('all-patients-link').style.display = 'none';
            document.getElementById('appointments-link').style.display = 'block';
        }
        
    } else {
        document.getElementById('add-doctor-link').style.display = 'none';
        document.getElementById('all-doctors-link').style.display = 'none';
        document.getElementById('all-patients-link').style.display = 'none';
        document.getElementById('appointments-link').style.display = 'none';
    }
}

