<?php
require_once "../bootstrap.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    mb_internal_encoding("UTF-8");

    session_start();

    $doctor_id = $_SESSION['id'];

    if (!isset($doctor_id)) {
        echo json_encode([
            'success' => false,
            'message' => 'You are not logged in.',
        ]);
        exit;
    }
    
    if($_SESSION['role'] != 'Doctor')
    {
        echo json_encode([
            'success' => false,
            'message' => 'You are not a doctor.',
        ]);
        exit;
    }

    $appointmentId = $_POST['appointment_id'];
    $medication = $_POST['medication'];
    $dosage = $_POST['dosage'];
    $instructions = $_POST['instructions'];

    $recipe = new Recipe($appointmentId, $medication, $dosage, $instructions);

    try {
        $recipe->validate();
        $recipeId = $recipe->storeInDB();
        echo json_encode(['success' => true, 'data'=> $recipeId]);
    } catch (Exception $e) {
        echo json_encode([
            'success' => false,
            'message' => $e->getMessage(),
        ]);
    }   
}
?>