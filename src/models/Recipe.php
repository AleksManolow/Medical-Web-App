<?php
require_once "../config/db.php";
mb_internal_encoding("UTF-8");

Class Recipe{
    public $id;
    public $appointment_id;
    public $medication;
    public $dosage;
    public $instructions;

    public function __construct($appointment_id, $medication, $dosage, $instructions)
    {
        $this->appointment_id = $appointment_id;
        $this->medication = $medication;
        $this->dosage = $dosage;
        $this->instructions = $instructions;
    }

    public function storeInDB(): void {
        try {
            $db = new DB();
			$conn = $db->getConnection();

            $sql = "INSERT INTO recipes (AppointmentId, Medication, Dosage, Instructions) 
            VALUES (:appointment_id, :medication, :dosage, :instructions)";
            $stmt = $conn->prepare($sql);

            $stmt->bindParam(':appointment_id', $this->appointment_id);
            $stmt->bindParam(':medication', $this->medication);
            $stmt->bindParam(':dosage', $this->dosage);
            $stmt->bindParam(':instructions', $this->instructions);

            $stmt->execute();
    
        } catch (PDOException $e) {
            throw new Exception("Грешка при запис в базата данни: " . $e->getMessage());
        }
    }
    public function validate(): void {
        if(empty($this->medication)) {
            throw new Exception("Полето лекарства е задължително!");
        }
        if(empty($this->dosage)) {
            throw new Exception("Полето дозировка е задължително!");
        }
        if(empty($this->instructions)) {
            throw new Exception("Полето инструкции е задължително!");
        }
    }
}