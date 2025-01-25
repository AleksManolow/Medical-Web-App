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

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'];
    if($id != $_SESSION['id'])
    {
        echo json_encode([
            'success' => false,
            'message' => 'It is not possible for someone else to change a person profile.',
        ]);
        exit;
    }
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $birthdayDate = $_POST['birthdayDate'];
    $specialty = $_POST['specialty'] ?? null;
    $phone = $_POST['phone'] ?? null;
    $email = $_POST['email'];
    $pin = $_POST['pin'];
    $description = $_POST['description'];
    
    $profileImage = null;

    if (!empty($_FILES['profileImage']['name'])) {
        $uploadDir = '../../public/images/';
        $profileImage = uniqid() . '_' . basename($_FILES['profileImage']['name']);
        $uploadFile = $uploadDir . $profileImage;

        if (!move_uploaded_file($_FILES['profileImage']['tmp_name'], $uploadFile)) {
            echo json_encode(['success' => false, 'message' => 'Failed to upload profile image.']);
            exit;
        }
    }
    else{
        $currPictur = User::findById($id)->image;
        $profileImage = $currPictur;
    }

    try {
        User::update($id, $firstName, $lastName, $birthdayDate, $specialty, $phone, $email, $profileImage, $pin, $description);
        echo json_encode(['success' => true]);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }
}
?>