document.addEventListener("DOMContentLoaded", async function () {
    const searchInput = document.getElementById("search");
    const doctorsList = document.getElementById("doctors-list");

    async function loadPopup() {
        const response = await fetch('../pages/book_appointment_popup.html');
        const popupHTML = await response.text();
        document.body.insertAdjacentHTML('beforeend', popupHTML);

        const popupCloseButton = document.getElementById('popup-close');
        popupCloseButton.addEventListener('click', () => {
            const popup = document.getElementById('popup');
            popup.style.display = 'none';
        });

        const dateInput = document.getElementById('appointment-date');
        dateInput.addEventListener('change', (event) => {
            const doctorId = dateInput.dataset.doctorId;
            const selectedDate = event.target.value;
            fetchAvailableAppointments(doctorId, selectedDate);
        });
    }

    async function fetchDoctors(query = '') {
        const response = await fetch(`../../src/api/get_doctors.php?search=${query}`);
        const result = await response.json();

        if (result.success) {
            doctorsList.innerHTML = result.data.map(doctor => `
                <div class="doctor-card" data-id="${doctor.id}">
                    <img src="../images/${doctor.image}" alt="${doctor.first_name} ${doctor.last_name}" class="doctor-image">
                    <h3>${doctor.first_name} ${doctor.last_name}</h3>
                    <p><strong>Specialty:</strong> ${doctor.specialty}</p>
                </div>
            `).join('');
        }
    }

    // Fetch doctor details and populate popup
    async function fetchDoctorDetails(doctorId) {
        const response = await fetch(`../../src/api/get_doctor.php?doctor_id=${doctorId}`);
        const result = await response.json();

        if (result.success) {
            const doctor = result.data;
            const popup = document.getElementById('popup');

            // Populate popup with doctor data
            document.getElementById('popup-doctor-image').src = `../images/${doctor.image}`;
            document.getElementById('popup-doctor-name').innerText = `${doctor.firstName} ${doctor.lastName}`;
            document.getElementById('popup-doctor-specialty').innerText = doctor.specialty;
            document.getElementById('popup-doctor-email').innerText = doctor.email;
            document.getElementById('popup-doctor-phone').innerText = doctor.phone;
            document.getElementById('popup-doctor-description').innerText = doctor.description;

            const dateInput = document.getElementById('appointment-date');
            dateInput.dataset.doctorId = doctorId;

            const today = new Date().toISOString().split('T')[0];
            dateInput.value = today;
            fetchAvailableAppointments(doctorId, today);

            popup.style.display = 'flex';
        }
    }

    async function fetchAvailableAppointments(doctorId, date) {
        try {
            const response = await fetch(`../../src/api/get_doctor_appointments.php?doctor_id=${doctorId}&date=${date}`);
            const result = await response.json();
    
            if (result.success) {
                const appointmentsList = document.getElementById('appointments-list');
                const appointments = result.data;
            
                appointmentsList.innerHTML = '';
            
                appointments.forEach(app => {
                    const listItem = document.createElement('li');
                    listItem.innerHTML = `
                        <span>${app.time}</span>
                    `;
            
                    if (app.status === 'booked') {
                        const bookedSpan = document.createElement('span');
                        bookedSpan.textContent = '(Booked)';
                        bookedSpan.style.color = '#ff0000';
                        listItem.appendChild(bookedSpan);
                    } else {
                        const bookButton = document.createElement('button');
                        bookButton.textContent = 'Book';
                        bookButton.onclick = () => bookAppointment(doctorId, date, app.time);
                        listItem.appendChild(bookButton);
                    }
            
                    appointmentsList.appendChild(listItem);
                });
            
                appointmentsList.style.maxHeight = '160px';
                appointmentsList.style.overflowY = 'auto';
                appointmentsList.style.border = '1px solid #ddd';
                appointmentsList.style.padding = '10px';
                appointmentsList.style.backgroundColor = '#f9f9f9';
            } else {
                console.error('Failed to fetch appointments:', result.message);
            }
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    }
    
    async function bookAppointment(doctorId, date, time) {
        const symptoms = prompt("Enter your symptoms:");
    
        const response = await fetch('../../src/api/add_appointment.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                doctor_id: doctorId,
                date: date,
                time: time,
                symptoms: symptoms,
            })
        });
    
        const result = await response.json();
    
        if (result.success) {
            alert('Appointment booked successfully!');
            fetchAvailableAppointments(doctorId, date);
        } else {
            alert('Failed to book appointment: ' + result.message);
        }
    }

    await loadPopup();
    fetchDoctors();

    searchInput.addEventListener("input", () => fetchDoctors(searchInput.value));

    doctorsList.addEventListener("click", event => {
        const doctorCard = event.target.closest(".doctor-card");
        if (doctorCard) {
            fetchDoctorDetails(doctorCard.dataset.id);
        }
    });
});
