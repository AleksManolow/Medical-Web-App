<?php
require_once '../bootstrap.php';
require_once "../config/db.php";
session_start();

switch ($_SERVER['REQUEST_METHOD']) {
    case 'POST':
        $email = isset($_POST['email']) ? $_POST['email'] : null;
        $password = isset($_POST['password']) ? $_POST['password'] : null;

        if ($email && $password) {
            $connection  = (new Db())->getConnection();
            $selectStatement = $connection->prepare("SELECT * FROM `users` WHERE `email` = :email");

            $selectStatement->execute([
                'email' => $email,
            ]);

            $userData = $selectStatement->fetch();
            if ($userData && password_verify($password, $userData['Password'])) {
                $_SESSION['email'] = $email;
                $_SESSION['role'] = $userData['Role'];
                $_SESSION['id'] = $userData['Id'];

                echo json_encode([
                    'success' => true,
                    'id' => $userData['Id'], 
                    'email' => $email,
                    'role' => $userData['Role'],
                ]);
            } else {
                // Неуспешен логин
                echo json_encode([
                    'success' => false,
                    'message' => 'Невалиден имейл или парола.',
                ]);
            }
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'Имейл и парола са задължителни.',
            ]);
        }
        break;

    case 'DELETE':
        session_destroy();
        echo json_encode([
            'success' => true,
        ]);
        break;

    case 'GET':
        if (isset($_SESSION['email'])) {
            echo json_encode([
                'success' => true,
                'id' => $_SESSION['id'],
                'email' => $_SESSION['email'],
                'role' => $_SESSION['role'], 
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'Не сте логнати.',
            ]);
        }
        break;
}
?>
