
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
        alert("The passwords do not match!");
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
            alert("Registration is successful!");
            window.location.replace("../pages/login.html");
        } else {
            alert("Registration error:" + result.message);
        }
    } catch (error) {
        console.error("Request error:", error);
        alert("An error occurred while connecting to the server.");
    }
});
