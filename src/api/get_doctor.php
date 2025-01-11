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

$doctorId = $_GET['doctor_id'];

try {
    $user = User::findById($doctorId);
    echo json_encode([
        'success' => true,
        'data' => [
            'id' => $user->id,
            'firstName' => $user->first_name,
            'lastName' => $user->last_name,
            'pin' => $user->pin,
            'birthdayDate' => $user->birthday_date,
            'email' => $user->email,
            'role' => $user->role,
            'years' => $user->years,
            'image' => $user->image,
            'specialty' => $user->specialty,
            'phone' => $user->phone,
            'description'=> $user->description
        ],
    ]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>
