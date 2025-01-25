document.addEventListener("DOMContentLoaded", async function () {
    const selectFromDate = document.getElementById("appointment-from-date");
    const selectToDate = document.getElementById("appointment-to-date");
    const appointmentsList = document.getElementById("appointments-list");

    const today = new Date();
    const lastMonth = new Date(today); 
    lastMonth.setMonth(today.getMonth() - 1);

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const day = String(date.getDate()).padStart(2, '0'); 
        return `${year}-${month}-${day}`;
    };

    selectFromDate.value = formatDate(lastMonth); 
    selectToDate.value = formatDate(today); 

    async function loadAddPopup() {
        const response = await fetch('../pages/create_recipe_popup.html');
        const popupHTML = await response.text();
        document.body.insertAdjacentHTML('beforeend', popupHTML);

        const closePopupButton = document.getElementById("close-popup");
        closePopupButton.addEventListener("click", () => {
            const popup = document.getElementById("recipe-popup");
            popup.classList.add("hidden");
        });

        const recipeForm = document.getElementById("recipe-form");
        recipeForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            const formData = new FormData(recipeForm);
            
            const response = await fetch("../../src/api/add_recipe.php", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();
            if (result.success) {
                const appointmentCard = document.querySelector(`.appointment-card[data-id="${formData.get('appointment_id')}"]`);
        
                const recipeIdInput = appointmentCard.querySelector('input[recipe-id]');
                recipeIdInput.setAttribute('recipe-id', result.data.recipeId);

                authRecipeButtons();

                const popup = document.getElementById("recipe-popup");
                popup.classList.add("hidden");
                recipeForm.reset();
            } else {
                alert("Error adding recipe: " + result.message);
            }
        });
    }

    async function loadViewPopup() {
        const response = await fetch('../pages/view_recipe_popup.html');
        const popupHTML = await response.text();
        document.body.insertAdjacentHTML('beforeend', popupHTML);

        const closeViewPopupButton = document.getElementById("close-view-popup");
        closeViewPopupButton.addEventListener("click", () => {
            const popup = document.getElementById("view-recipe-popup");
            popup.classList.add("hidden");
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
                        <input type="hidden" recipe-id="${appointment.recipe_id}" value="">
                        <div class="date-info">
                            <p><strong>Date:</strong> ${date}</p>
                            <p><strong>Time:</strong> ${time}</p>
                            <p><strong>Symptoms:</strong> ${appointment.symptoms}</p>
                        </div>
                        <div class="button-list">
                            <button type="button" class="appointment-button add-recipe-button">Add recipe</button>
                            <button type="button" class="appointment-button view-recipe-button">View recipe</button>
                            <button type="button" class="appointment-button delete-recipe-button">Delete recipe</button>
                        </div>
                    </div>
                `;
            }).join('');
            
            authRecipeButtons();
        } else {
            appointmentsList.innerHTML = `<p>No records found for this period.</p>`;
        }
    }

    async function authRecipeButtons() {
        try {
            const response = await fetch('../../src/api/session.php', { method: 'GET' });
            const data = await response.json();
    
            if (data.success) {
                const role = data.role;
                const appointmentCards = document.querySelectorAll('.appointment-card');
    
                appointmentCards.forEach(card => {
                    const recipeId = card.querySelector('input[recipe-id]').getAttribute('recipe-id');
                    const addButton = card.querySelector('.add-recipe-button');
                    const viewButton = card.querySelector('.view-recipe-button');
                    const deleteButton = card.querySelector('.delete-recipe-button');
    
                    addButton.style.display = 'none';
                    viewButton.style.display = 'none';
                    deleteButton.style.display = 'none';
    
                    if (role === "Doctor") {
                        if (recipeId && recipeId !== "null") {
                            viewButton.style.display = 'block';
                            deleteButton.style.display = 'block';
                        } else {
                            addButton.style.display = 'block';
                        }
                    } else if (role === "Admin" || role === "Patient") {
                        if (recipeId && recipeId !== "null") {
                            viewButton.style.display = 'block';
                        }
                    }
                });
            } else {
                console.error('Session validation error: User is not authenticated.');
            }
        } catch (error) {
            console.error('Session verification error:', error);
        }
    }

    appointmentsList.addEventListener("click", async (event) => {
        if (event.target.classList.contains("view-recipe-button")) {
            const appointmentId = event.target.closest(".appointment-card").dataset.id;

            const response = await fetch(`../../src/api/get_recipe.php?id=${appointmentId}`);
            const result = await response.json();

            if (result.success) {
                document.getElementById("view-patient-name").innerText = `${result.data.patient_first_name} ${result.data.patient_last_name}`;
                document.getElementById("view-doctor-name").innerText = `${result.data.doctor_first_name} ${result.data.doctor_last_name}`;
                document.getElementById("view-date").innerText = result.data.date.split(' ')[0];
                document.getElementById("view-time").innerText = result.data.date.split(' ')[1];
                document.getElementById("view-symptoms").innerText = result.data.symptoms;
                document.getElementById("view-medication").innerText = result.data.medication;
                document.getElementById("view-dosage").innerText = result.data.dosage;
                document.getElementById("view-instructions").innerText = result.data.instructions;

                const popup = document.getElementById("view-recipe-popup");
                popup.classList.remove("hidden");
            } else {
                alert("Error loading recipe: " + result.message);
            }
        }
    });

    loadAddPopup();
    loadViewPopup();
    fetchAppointments();
    authRecipeButtons();
    
    selectFromDate.addEventListener("change", () => fetchAppointments(selectFromDate.value, selectToDate.value));
    selectToDate.addEventListener("change", () => fetchAppointments(selectFromDate.value, selectToDate.value));

    appointmentsList.addEventListener("click", function (event) {
        if (event.target.classList.contains("add-recipe-button")) {
            const appointmentId = event.target.closest(".appointment-card").dataset.id;
            const popup = document.getElementById("recipe-popup");
            const appointmentIdInput = document.getElementById("appointment-id");
            appointmentIdInput.value = appointmentId;
            popup.classList.remove("hidden");
        }
    });

    appointmentsList.addEventListener("click", async (event) => {
        if (event.target.classList.contains("delete-recipe-button")) {
            if(confirm("Are you sure you want to delete the recipe?"))
            {
                const appointmentId = event.target.closest(".appointment-card").dataset.id;

                const response = await fetch(`../../src/api/delete_recipe.php?id=${appointmentId}`);
                const result = await response.json();
    
                if (result.success) {
                    const appointmentCard = document.querySelector(`.appointment-card[data-id="${appointmentId}"]`);
            
                    const recipeIdInput = appointmentCard.querySelector('input[recipe-id]');
                    recipeIdInput.setAttribute('recipe-id', null);
    
                    authRecipeButtons();
    
                } else {
                    alert("Error loading recipe: " + result.message);
                }
            }
            
        }
    });
});
