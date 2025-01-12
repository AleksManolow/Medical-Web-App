<?php
require_once "../bootstrap.php";

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $doctorId = $_GET['doctor_id'];
        $date = $_GET['date']; 

        $response = Appointment::getAvailableSlots($doctorId, $date);
        echo json_encode($response);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }
}
?>