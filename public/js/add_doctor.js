document.getElementById("add-doctor-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("firstName", document.getElementById("firstName").value.trim());
    formData.append("lastName", document.getElementById("lastName").value.trim());
    formData.append("pin", document.getElementById("pin").value.trim());
    formData.append("birthdayDate", document.getElementById("birthdayDate").value);
    formData.append("email", document.getElementById("email").value.trim());
    formData.append("password", document.getElementById("password").value);
    formData.append("specialty", document.getElementById("specialty").value.trim());
    formData.append("phone", document.getElementById("phone").value.trim());

    const fileInput = document.getElementById("profileImage");
    if (fileInput.files.length > 0) {
        formData.append("profileImage", fileInput.files[0]);
    }

    try {
        const response = await fetch('../../src/api/add_doctor.php', {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();

        if (result.success) {
            window.location.replace("../pages/admin_panel.html");
        } else {
            alert("Error: " + result.message);
        }
    } catch (error) {
        console.error("Request error:", error);
        alert("An error occurred while connecting to the server.");
    }
});
