<?php
require_once "../bootstrap.php";
$phpInput = json_decode(file_get_contents('php://input'), true);
mb_internal_encoding("UTF-8");

$user = new User($phpInput['firstName'], $phpInput["lastName"], $phpInput['pin'], $phpInput['birthdayDate'], 
                            $phpInput['email'], $phpInput['password'], "Patient", 'default_pic.jpg', null, null);
                            
try {
    $user->validate();
    $user->storeInDB();
    echo json_encode(['success' => true]);
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage(),
    ]);
}   