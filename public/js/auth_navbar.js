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
    const publicPages = ["../pages/index.html"].map(page => page.split('/').pop());
    const currentPath = window.location.pathname.split('/').pop();

    fetch('../../src/api/session.php', {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            updateNavigationAuthentication(true);
            updateNavigationMain(true, data.role);

            if(currentPath == "profile.html" && data.role == "Patient"){
                document.getElementById('specialty-form').style.display = 'none';
                document.getElementById('phone-form').style.display = 'none';
                document.getElementById('description-form').style.display = 'none';
            }

            if(data.role == "Admin")
            {
                const logoLink = document.querySelector(".logo");
                logoLink.setAttribute('href', 'admin_panel.html');
            }

            const getStartedButton = document.getElementById("get-start-btn");
            if (getStartedButton) {
                getStartedButton.style.display = "none";
            }
        } else {

            updateNavigationAuthentication(false);
            updateNavigationMain(false, null);

            if (!publicPages.includes(currentPath) && currentPath != "login.html" && currentPath != "register.html") {
                window.location.replace("../pages/login.html");
            }
        }
    })
    .catch(error => {
        console.error('Session verification error:', error);
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
            document.getElementById('appointments-link').style.display = 'block';
        }
        else if(role == 'Patient'){
            document.getElementById('add-doctor-link').style.display = 'none';
            document.getElementById('all-doctors-link').style.display = 'block';
            document.getElementById('appointments-link').style.display = 'block';
        }
        else if(role == 'Doctor'){
            document.getElementById('add-doctor-link').style.display = 'none';
            document.getElementById('all-doctors-link').style.display = 'none';
            document.getElementById('appointments-link').style.display = 'block';
        }
        
    } else {
        document.getElementById('add-doctor-link').style.display = 'none';
        document.getElementById('all-doctors-link').style.display = 'none';
        document.getElementById('all-patients-link').style.display = 'none';
        document.getElementById('appointments-link').style.display = 'none';
    }
}

