// login.js - JavaScript код за логин и сесия

// Функция за изпращане на формата и логин на потребителя
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Проверка дали има стойности в полетата
    if (!email || !password) {
        alert('Моля, попълнете всички полета.');
        return; // Спираме изпращането на формата, ако липсват данни
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
            console.log('Грешка при логин:', data.message);
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('Грешка:', error);
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
            console.log('Грешка при изход');
        }
    })
    .catch(error => {
        console.error('Грешка:', error);
    });
}

function checkSession() {
    fetch('../../src/api/session.php', {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Потребител е логнат:', data.email);
            console.log('Роля:', data.role);  // Можете да използвате ролята за различни проверки
        } else {
            console.log('Не сте логнати');
            alert('Не сте логнати!');
        }
    })
    .catch(error => {
        console.error('Грешка:', error);
    });
}
