
document.getElementById("register-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = {
        firstName: document.getElementById("firstName").value.trim(),
        lastName: document.getElementById("lastName").value.trim(),
        pin: document.getElementById("pin").value.trim(),
        birthdayDate: document.getElementById("birthdayDate").value,
        email: document.getElementById("email").value.trim(),
        password: document.getElementById("password").value,
        confirmPassword: document.getElementById("confirmPassword").value
    };

    if (formData.password !== formData.confirmPassword) {
        alert("Паролите не съвпадат!");
        return;
    }

    try {
        const response = await fetch('../../src/api/register.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (result.success) {
            alert("Регистрацията е успешна!");
            window.location.replace("../pages/login.html");
        } else {
            alert("Грешка при регистрация: " + result.message);
        }
    } catch (error) {
        console.error("Грешка при заявката:", error);
        alert("Възникна грешка при връзката със сървъра.");
    }
});
