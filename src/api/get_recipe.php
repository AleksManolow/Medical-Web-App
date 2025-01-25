<?php
require_once "../bootstrap.php";

header('Content-Type: application/json');
session_start();

if (!isset($_SESSION['id'])) {
    echo json_encode([
        'success' => false,
        'message' => 'You are not logged in.',
    ]);
    exit;
}

$appointmentId = $_GET['id'];

try {
    $result = Recipe::getRecipeDetailsByAppointmentId($appointmentId);

    if ($result) {
        echo json_encode([
            'success' => true,
            'data' => [
                'patient_first_name' => $result['patient_first_name'],
                'patient_last_name' => $result['patient_last_name'],
                'doctor_first_name' => $result['doctor_first_name'],
                'doctor_last_name' => $result['doctor_last_name'],
                'date' => $result['appointment_date'],
                'symptoms' => $result['symptoms'],
                'medication' => $result['medication'],
                'dosage' => $result['dosage'],
                'instructions' => $result['instructions'],
            ]
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'No recipe found for this appointment ID.']);
    }
    
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Error fetching recipe: ' . $e->getMessage()]);
}