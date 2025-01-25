<?php
require_once "../bootstrap.php";

session_start();

if (!isset($_SESSION['id'])) {
    echo json_encode([
        'success' => false,
        'message' => 'You are not logged in.',
    ]);
    exit;
}

$search = $_GET['search'] ?? '';

try {
    $doctors = User::searchDoctors($search);

    $response = [];
    foreach ($doctors as $doctor) {
        $response[] = [
            'id' => $doctor->id,
            'first_name' => $doctor->first_name,
            'last_name' => $doctor->last_name,
            'specialty' => $doctor->specialty,
            'email' => $doctor->email,
            'phone' => $doctor->phone,
            'image' => $doctor->image,
            'description' => $doctor->description,
        ];
    }

    echo json_encode(['success' => true, 'data' => $response]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>