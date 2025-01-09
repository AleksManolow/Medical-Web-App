document.addEventListener("DOMContentLoaded", async function () {

    try {
        const response = await fetch("../../src/api/get_profile.php");
        const profile = await response.json();

        if (profile.success) {
            document.getElementById("userId").value = profile.data.id;

            document.getElementById("firstName").value = profile.data.firstName;
            document.getElementById("lastName").value = profile.data.lastName;
            document.getElementById("pin").value = profile.data.pin;
            document.getElementById("birthdayDate").value = profile.data.birthdayDate;
            document.getElementById("specialty").value = profile.data.specialty;
            document.getElementById("phone").value = profile.data.phone;
            document.getElementById("email").value = profile.data.email;
            document.getElementById("currentImage").src = `../images/${profile.data.image}`;
            document.getElementById("description").value = profile.data.description;
        } else {
            alert("Error fetching profile: " + profile.message);
        }
    } catch (error) {
        console.error("Error fetching profile data:", error);
    }

    document.getElementById("profile-form").addEventListener("submit", async function (event) {
        event.preventDefault();

        const formData = new FormData();
        formData.append("id", document.getElementById("userId").value.trim());
        formData.append("firstName", document.getElementById("firstName").value.trim());
        formData.append("lastName", document.getElementById("lastName").value.trim());
        formData.append("birthdayDate", document.getElementById("birthdayDate").value);
        formData.append("specialty", document.getElementById("specialty").value.trim());
        formData.append("phone", document.getElementById("phone").value.trim());
        formData.append("email", document.getElementById("email").value.trim());
        formData.append("pin", document.getElementById("pin").value.trim());
        formData.append("description", document.getElementById("description").value.trim());
        const fileInput = document.getElementById("profileImage");
        if (fileInput.files.length > 0) {
            formData.append("profileImage", fileInput.files[0]);
        }

        try {
            const response = await fetch("../../src/api/edit_profile.php", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();

            if (result.success) {
                alert("Profile updated successfully!");
                location.reload();
            } else {
                alert("Error saving changes: " + result.message);
            }
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    });
});
