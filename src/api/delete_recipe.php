<?php
require_once "../bootstrap.php";

header('Content-Type: application/json');
session_start();

if (!isset($_SESSION['id'])) {
    echo json_encode([
        'success' => false,
        'message' => 'Не сте логнати.',
    ]);
    exit;
}

if($_SESSION['role'] != 'Doctor')
{
    echo json_encode([
        'success' => false,
        'message' => 'Не сте доктор.',
    ]);
    exit;
}

$appointmentId = $_GET['id'];

try {
    $result = Recipe::deleteRecipe($appointmentId);

    if ($result != 0) {
        echo json_encode([
            'success' => true
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'No recipe found for this appointment ID.']);
    }
    
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Error fetching recipe: ' . $e->getMessage()]);
}