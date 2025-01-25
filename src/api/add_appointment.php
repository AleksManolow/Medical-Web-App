<?php
require_once "../bootstrap.php";
$phpInput = json_decode(file_get_contents('php://input'), true);
mb_internal_encoding("UTF-8");

session_start();

$patient_id = $_SESSION['id'];

if (!isset($patient_id)) {
    echo json_encode([
        'success' => false,
        'message' => 'You are not logged in.',
    ]);
    exit;
}

if($_SESSION['role'] != 'Patient')
{
    echo json_encode([
        'success' => false,
        'message' => 'You are not a patient.',
    ]);
    exit;
}

$date_time = $phpInput['date'] . ' ' . $phpInput['time'];

$appointment = new Appointment($phpInput['doctor_id'], $patient_id, $date_time, $phpInput['symptoms']);

try {
    $appointment->storeInDB();
    echo json_encode(['success' => true]);
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage(),
    ]);
}  