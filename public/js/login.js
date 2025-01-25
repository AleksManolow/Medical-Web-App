document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (!email || !password) {
        alert('Please fill in all fields.');
        return;
    }

    loginUser(email, password);
});

function loginUser(email, password) {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    fetch('../../src/api/session.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            if (data.success) {
                window.location.replace("../pages/index.html");
            }

            if (data.role === 'Admin') {
                window.location.href = '../pages/admin_panel.html';
            }
        } else {
            console.log('Login error:', data.message);
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function logoutUser() {
    fetch('../../src/api/session.php', {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            if (data.success) {
                window.location.replace("../pages/login.html");
            }
        } else {
            console.log('Output error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function checkSession() {
    fetch('../../src/api/session.php', {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('User is logged in:', data.email);
            console.log('Role:', data.role);
        } else {
            console.log('You are not logged in.');
            alert('You are not logged in!');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
