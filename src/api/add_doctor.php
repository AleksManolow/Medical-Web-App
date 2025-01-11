<?php
require_once "../bootstrap.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    mb_internal_encoding("UTF-8");

    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $pin = $_POST['pin'];
    $birthdayDate = $_POST['birthdayDate'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $specialty = $_POST['specialty'];
    $phone = $_POST['phone'];
    $description = $_POST['description'];

    $imageName = 'default_pic.jpg';

    if (!empty($_FILES['profileImage']['name'])) {
        $uploadDir = '../../public/images/';
        $imageName = uniqid() . '_' . basename($_FILES['profileImage']['name']);
        $uploadFile = $uploadDir . $imageName;

        if (!move_uploaded_file($_FILES['profileImage']['tmp_name'], $uploadFile)) {
            echo json_encode(['success' => false, 'message' => 'Failed to upload profile image.']);
            exit;
        }
    }

    $user = new User($firstName, $lastName, $pin, $birthdayDate, $email, $password, "Doctor", $imageName, $specialty, $phone, $description);

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
}
?>
