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

// Функция за логин на потребител
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
            // Логинът е успешен
            console.log('Успешен логин:', data.email);
            console.log('Роля:', data.role);  // Ролята на потребителя
            alert('Добре дошъл, ' + data.email);

            // Може да редиректнете или да актуализирате UI тук според ролята
            if (data.role === 'Admin') {
                // Например, ако ролята е "admin", можем да пренасочим към административен панел
                window.location.href = '/admin_dashboard';  // Тук добавете правилния адрес за администраторския панел
            }
        } else {
            // Грешка при логин
            console.log('Грешка при логин:', data.message);
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('Грешка:', error);
    });
}

// Функция за изход на потребител
function logoutUser() {
    fetch('../../src/api/session.php', {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Успешен изход');
            alert('Изходът е успешен.');
            // Може да обновите UI или да редиректнете
        } else {
            console.log('Грешка при изход');
        }
    })
    .catch(error => {
        console.error('Грешка:', error);
    });
}

// Функция за проверка на сесията
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
