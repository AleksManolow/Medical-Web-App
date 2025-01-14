<?php
require_once "../bootstrap.php";

header('Content-Type: application/json');

session_start();

$id = $_SESSION['id'];

if (!isset($id)) {
    echo json_encode([
        'success' => false,
        'message' => 'Не сте логнати.',
    ]);
    exit;
}

$fromDate = isset($_GET['fromDate']) ? $_GET['fromDate'] : null;
$toDate = isset($_GET['toDate']) ? $_GET['toDate'] : null;

try {
    $appointments = Appointment::getAppointmentsByDateRangeAndId($fromDate, $toDate, $id, $_SESSION['role']);
    
    if ($appointments['success']) {
        echo json_encode($appointments);
    } else {
        echo json_encode(['success' => false, 'message' => 'Няма записани часове за този период.']);
    }

} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Грешка при извличане на данни: ' . $e->getMessage()]);
}
?>
