document.addEventListener("DOMContentLoaded", async function () {
    const selectFromDate = document.getElementById("appointment-from-date");
    const selectToDate = document.getElementById("appointment-to-date");
    const appointmentsList = document.getElementById("appointments-list");

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
                            <button type="button" class="appointment-button">Click Me!</button>
                            <button type="button" class="appointment-button">Click Me!</button>
                            <button type="button" class="appointment-button">Click Me!</button>
                        </div>
                    </div>
                `;
            }).join('');
        } else {
            appointmentsList.innerHTML = `<p>Няма намерени записи за този период.</p>`;
        }
    }

    // Извикваме fetchAppointments без дати, за да вземем всички данни по подразбиране
    fetchAppointments();

    // Добавяме събитие за филтриране на резултати при промяна на датите
    selectFromDate.addEventListener("change", () => fetchAppointments(selectFromDate.value, selectToDate.value));
    selectToDate.addEventListener("change", () => fetchAppointments(selectFromDate.value, selectToDate.value));

});
