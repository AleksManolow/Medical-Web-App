document.addEventListener("DOMContentLoaded", async function () {
    const selectFromDate = document.getElementById("appointment-from-date");
    const selectToDate = document.getElementById("appointment-to-date");
    const appointmentsList = document.getElementById("appointments-list");

    // Функция за зареждане на попъпа
    async function loadPopup() {
        const response = await fetch('../pages/create_recipe_popup.html');
        const popupHTML = await response.text();
        document.body.insertAdjacentHTML('beforeend', popupHTML);

        // Затваряне на попъпа
        const closePopupButton = document.getElementById("close-popup");
        closePopupButton.addEventListener("click", () => {
            const popup = document.getElementById("recipe-popup");
            popup.classList.add("hidden");
        });

        // Добавяме събитие за изпращане на формата за рецепта
        const recipeForm = document.getElementById("recipe-form");
        recipeForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const formData = new FormData(recipeForm);
            
            // Изпращане на данни за рецептата към сървъра
            const response = await fetch("../../src/api/add_recipe.php", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();
            if (result.success) {
                alert("Recipe added successfully!");
                const popup = document.getElementById("recipe-popup");
                popup.classList.add("hidden");
                recipeForm.reset();
            } else {
                alert("Error adding recipe: " + result.message);
            }
        });
    }

    async function fetchAppointments(fromDate = '', toDate = '') {
        const response = await fetch(`../../src/api/get_appointments.php?fromDate=${fromDate}&toDate=${toDate}`);
        const result = await response.json();

        if (result.success) {
            appointmentsList.innerHTML = result.data.map(appointment => {
                const [date, time] = appointment.date_time.split(' ');
    
                return `
                    <div class="appointment-card" data-id="${appointment.id}">
                        <div class="patient-info">
                            <p><strong>Patient</strong></p>
                            <img src="../images/${appointment.patient_image}" alt="${appointment.patient_first_name} ${appointment.patient_last_name}" class="appointment-image">
                            <h3>${appointment.patient_first_name} ${appointment.patient_last_name}</h3>
                        </div>
                        <div class="doctor-info">
                            <p><strong>Doctor</strong></p>
                            <img src="../images/${appointment.doctor_image}" alt="${appointment.doctor_first_name} ${appointment.doctor_last_name}" class="appointment-image">
                            <h3>${appointment.doctor_first_name} ${appointment.doctor_last_name}</h3>
                        </div>
                        <div class="date-info">
                            <p><strong>Date:</strong> ${date}</p>
                            <p><strong>Time:</strong> ${time}</p>
                            <p><strong>Symptoms:</strong> ${appointment.symptoms}</p>
                        </div>
                        <div class="button-list">
                            <button type="button" class="appointment-button add-recipe-button">Add recipe</button>
                            <button type="button" class="appointment-button">View recipe</button>
                            <button type="button" class="appointment-button">Delete recipe</button>
                        </div>
                    </div>
                `;
            }).join('');
        } else {
            appointmentsList.innerHTML = `<p>Няма намерени записи за този период.</p>`;
        }
    }

    loadPopup()
    // Извикваме fetchAppointments без дати, за да вземем всички данни по подразбиране
    fetchAppointments();

    // Добавяме събитие за филтриране на резултати при промяна на датите
    selectFromDate.addEventListener("change", () => fetchAppointments(selectFromDate.value, selectToDate.value));
    selectToDate.addEventListener("change", () => fetchAppointments(selectFromDate.value, selectToDate.value));

    // Показване на попъпа за добавяне на рецепта
    appointmentsList.addEventListener("click", function (event) {
        if (event.target.classList.contains("add-recipe-button")) {
            const appointmentId = event.target.closest(".appointment-card").dataset.id;
            const popup = document.getElementById("recipe-popup");
            const appointmentIdInput = document.getElementById("appointment-id");
            appointmentIdInput.value = appointmentId;
            popup.classList.remove("hidden");
        }
    });
});
