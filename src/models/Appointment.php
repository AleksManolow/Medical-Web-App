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
            throw new Exception("Database write error:" . $e->getMessage());
        }
    }
    public static function getAvailableSlots($doctor_id, $date) {
        try {
            $db = new DB();
            $conn = $db->getConnection();

            $startTime = strtotime("$date 08:00");
            $endTime = strtotime("$date 17:00");
            $interval = 30 * 60; 
            $allSlots = [];

            for ($time = $startTime; $time < $endTime; $time += $interval) {
                $allSlots[] = date("H:i", $time);
            }

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

            $availableSlots = [];
            foreach ($allSlots as $slot) {
                $availableSlots[] = [
                    'time' => $slot,
                    'status' => in_array($slot, $bookedSlots) ? 'booked' : 'free'
                ];
            }

            return ['success' => true, 'data' => $availableSlots];

        } catch (PDOException $e) {
            throw new Exception("Error retrieving available hours:" . $e->getMessage());
        }
    }
    public static function getAppointmentsByDateRangeAndId($fromDate, $toDate, $id, $role) {
        try {
            $db = new DB();
            $conn = $db->getConnection();
    
            $sql = "SELECT a.Id AS id,  
                    a.DateTime AS date_time,
                    a.Symptoms AS symptoms,
                    d.FirstName AS doctor_first_name, 
                    d.LastName AS doctor_last_name, 
                    d.Image AS doctor_image,
                    p.FirstName AS patient_first_name, 
                    p.LastName AS patient_last_name, 
                    p.Image AS patient_image, 
                    r.Id As recipe_id
                    FROM appointments a
                    JOIN users d ON a.DoctorId = d.Id
                    JOIN users p ON a.PatientId = p.Id
                    LEFt JOIN recipes r ON r.AppointmentId = a.Id";
    
            $conditions = [];
            if ($fromDate && $toDate) {
                $conditions[] = "a.DateTime BETWEEN :fromDate AND :toDate";
            }
    
            if ($id) {
                if ($role == 'Patient') {
                    $conditions[] = "a.PatientId = :patientId";
                } elseif ($role == 'Doctor') {
                    $conditions[] = "a.DoctorId = :doctorId";
                }
            }
    
            if (count($conditions) > 0) {
                $sql .= " WHERE " . implode(" AND ", $conditions);
            }
    
            $stmt = $conn->prepare($sql);
    
            if ($fromDate && $toDate) {
                $stmt->bindParam(':fromDate', $fromDate);
                $stmt->bindParam(':toDate', $toDate);
            }
    
            if ($id) {
                if ($role == 'Patient') {
                    $stmt->bindParam(':patientId', $id);
                } elseif ($role == 'Doctor') {
                    $stmt->bindParam(':doctorId', $id);
                }
            }
    
            $stmt->execute();
    
            $appointments = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
            return ['success' => true, 'data' => $appointments];
    
        } catch (PDOException $e) {
            throw new Exception("Data retrieval error:" . $e->getMessage());
        }
    }
}