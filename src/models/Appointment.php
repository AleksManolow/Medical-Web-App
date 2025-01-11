<?php
require_once "../config/db.php";
mb_internal_encoding("UTF-8");
class Appointment{
    public $id;
    public $doctor_id;
    public $patient_id;
    public $date_time;
    public $symptoms;

    public function __construct($doctor_id, $patient_id, $date_time, $symptoms)
    {
        $this->doctor_id = $doctor_id;
        $this->patient_id = $patient_id;
        $this->date_time = $date_time;
        $this->symptoms = $symptoms;
    }
    
    public function storeInDB(): void {
        try {
            $db = new DB();
			$conn = $db->getConnection();

            $sql = "INSERT INTO appointments (DoctorId, PatientId, DateTime, Symptoms) 
            VALUES (:doctor_id, :patient_id, :date_time, :symptoms)";
            $stmt = $conn->prepare($sql);

            $stmt->bindParam(':doctor_id', $this->doctor_id);
            $stmt->bindParam(':patient_id', $this->patient_id);
            $stmt->bindParam(':date_time', $this->date_time);
            $stmt->bindParam(':symptoms', $this->symptoms);

            $stmt->execute();
    
        } catch (PDOException $e) {
            throw new Exception("Грешка при запис в базата данни: " . $e->getMessage());
        }
    }
    public static function getAvailableSlots($doctor_id, $date) {
        try {
            $db = new DB();
            $conn = $db->getConnection();

            // Генериране на всички потенциални часове за деня
            $startTime = strtotime("$date 09:00");
            $endTime = strtotime("$date 17:00");
            $interval = 30 * 60; // Интервал от 30 минути
            $allSlots = [];

            for ($time = $startTime; $time < $endTime; $time += $interval) {
                $allSlots[] = date("H:i", $time);
            }

            // Взимане на записаните часове от базата
            $sql = "SELECT DATE_FORMAT(DateTime, '%H:%i') as time 
                    FROM appointments 
                    WHERE DoctorId = :doctor_id AND DATE(DateTime) = :date";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':doctor_id', $doctor_id);
            $stmt->bindParam(':date', $date);
            $stmt->execute();

            $bookedSlots = [];
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $bookedSlots[] = $row['time'];
            }

            // Обединяване на свободните и заетите часове
            $availableSlots = [];
            foreach ($allSlots as $slot) {
                $availableSlots[] = [
                    'time' => $slot,
                    'status' => in_array($slot, $bookedSlots) ? 'booked' : 'free'
                ];
            }

            return ['success' => true, 'data' => $availableSlots];

        } catch (PDOException $e) {
            throw new Exception("Грешка при извличане на наличните часове: " . $e->getMessage());
        }
    }
}