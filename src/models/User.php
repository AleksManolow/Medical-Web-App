<?php
require_once "../config/db.php";
mb_internal_encoding("UTF-8");
class User {
    public $id;
    public $first_name;
    public $last_name;
    public $pin;
    public $birthday_date;
    public $email;
    public $password;
    public $role;
    public $years;
    public $image;
    public $specialty;
    public $phone;
    public $description;

    public function __construct($first_name,  $last_name,  $pin,  $birthday_date,  $email,  $password,  $role, $image, $specialty, $phone, $description) {
        $this->first_name = $first_name;
        $this->last_name = $last_name;
        $this->pin = $pin;
        $this->birthday_date = $birthday_date;
        $this->email = $email;
        $this->password = $password;
        $this->role = $role;
        $this->image = $image;
        $this->specialty = $specialty;
        $this->phone = $phone;
        $this->description = $description;

        //Calc years
        $birthDate = new DateTime($birthday_date);
        $currentDate = new DateTime();
        $age = $currentDate->diff($birthDate)->y;
        $this->years = $age;
    }

    public function validate(): void {
        if(empty($this->first_name)) {
            throw new Exception("The name field is required!");
        }
        if(empty($this->last_name)) {
            throw new Exception("The last name field is required!");
        }
        if(empty($this->email)) {
            throw new Exception("The email field is required!");
        }
        if(empty($this->password)) {
            throw new Exception("The password field is required!");
        }
        if(empty($this->pin)){
            throw new Exception("The Personal Identification Number field is mandatory!");
        }
        if(empty($this->birthday_date)){
            throw new Exception("The date of birth field is required!");
        }
        if(strlen($this->first_name) < 2 || strlen($this->first_name) >= 30) {
            throw new Exception("Please fill in a valid name!");
        }
        if(strlen($this->last_name) < 2 || strlen($this->last_name) >= 30 ) {
            throw new Exception("Please fill in a valid last name!");
        }
        if(!(preg_match('/^[^@]+@[^@]+\.[^@]+$/', $this->email))) {
            throw new Exception("Please fill in a valid email.");
        }
        if(strlen($this->password) < 8) {
            throw new Exception("Please fill in a valid password that is at least 8 characters long.");
        }
        if(strlen($this->pin) != 10 || !ctype_digit($this->pin)){
            throw new Exception("Please fill in a valid 10-digit personal identification number.");
        }
        if($this->role == "Doctor" && empty($this->specialty)){
            throw new Exception("The specialty field is required!");
        }
        if($this->role == "Doctor" && empty($this->phone)){
            throw new Exception("The phone field is required!");
        }
        if($this->role == "Doctor" && empty($this->description)){
            throw new Exception("The description field is required!");
        }
    }
    public function storeInDB(): void {
        try {
            $db = new DB();
			$conn = $db->getConnection();

            if($this->role == "Doctor")
            {
                $sql = "INSERT INTO users (FirstName, LastName, PIN, BirthdayDate, Email, Password, Role, Image, Years, Specialty, Phone, Description) 
                VALUES (:first_name, :last_name, :pin, :birthday_date, :email, :password, :role, :image, :years, :specialty, :phone, :description)";
                $stmt = $conn->prepare($sql);

                $hashedPassword = password_hash($this->password, PASSWORD_BCRYPT);

                $stmt->bindParam(':first_name', $this->first_name);
                $stmt->bindParam(':last_name', $this->last_name);
                $stmt->bindParam(':pin', $this->pin);
                $stmt->bindParam(':birthday_date', $this->birthday_date);
                $stmt->bindParam(':email', $this->email);
                $stmt->bindParam(':password', $hashedPassword);
                $stmt->bindParam(':role', $this->role);
                $stmt->bindParam(':image', $this->image);
                $stmt->bindParam(':years', $this->years);
                $stmt->bindParam(':specialty', $this->specialty);
                $stmt->bindParam(':phone', $this->phone);
                $stmt->bindParam(':description', $this->description);
            }
            else
            {
                $sql = "INSERT INTO users (FirstName, LastName, PIN, BirthdayDate, Email, Password, Role, Image, Years) 
                VALUES (:first_name, :last_name, :pin, :birthday_date, :email, :password, :role, :image, :years)";
                $stmt = $conn->prepare($sql);

                $hashedPassword = password_hash($this->password, PASSWORD_BCRYPT);

                $stmt->bindParam(':first_name', $this->first_name);
                $stmt->bindParam(':last_name', $this->last_name);
                $stmt->bindParam(':pin', $this->pin);
                $stmt->bindParam(':birthday_date', $this->birthday_date);
                $stmt->bindParam(':email', $this->email);
                $stmt->bindParam(':password', $hashedPassword);
                $stmt->bindParam(':role', $this->role);
                $stmt->bindParam(':image', $this->image);
                $stmt->bindParam(':years', $this->years);
            }

            $stmt->execute();
    
        } catch (PDOException $e) {
            throw new Exception("Database write error: " . $e->getMessage());
        }
    }
    
    public static function findById($id): ?User {
        try {
            $db = new DB();
            $conn = $db->getConnection();
    
            $sql = "SELECT * FROM users WHERE Id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
            $stmt->execute();
    
            $userData = $stmt->fetch(PDO::FETCH_ASSOC);
    
            if ($userData) {
                $user = new User(
                    $userData['FirstName'],
                    $userData['LastName'],
                    $userData['PIN'],
                    $userData['BirthdayDate'],
                    $userData['Email'],
                    $userData['Password'],
                    $userData['Role'],
                    $userData['Image'],
                    $userData['Specialty'] ?? null,
                    $userData['Phone'] ?? null,
                    $userData['Description'] ?? null
                );
    
                $user->id = $userData['Id'];
                return $user;
            } else {
                return null;
            }
        } catch (PDOException $e) {
            throw new Exception("Error retrieving user: " . $e->getMessage());
        }
    }
    public static function update($id, $firstName, $lastName, $birthdayDate, $specialty, $phone, $email, $profileImage, $pin, $description): void 
    {
        try {
            $db = new DB();
            $conn = $db->getConnection();

            $sql = "UPDATE users 
            SET FirstName = :firstName, 
                LastName = :lastName, 
                PIN = :pin,
                BirthdayDate = :birthdayDate, 
                Specialty = :specialty, 
                Phone = :phone, 
                Email = :email, 
                Image = :profileImage,
                Description = :description
            WHERE Id = :id";

            $stmt = $conn->prepare($sql);

            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
            $stmt->bindParam(':firstName', $firstName);
            $stmt->bindParam(':lastName', $lastName);
            $stmt->bindParam(':pin', $pin);
            $stmt->bindParam(':birthdayDate', $birthdayDate);
            $stmt->bindParam(':specialty', $specialty);
            $stmt->bindParam(':phone', $phone);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':profileImage', $profileImage);
            $stmt->bindParam(':description', $description);

            $stmt->execute();
        } catch (PDOException $e) {
            throw new Exception("Database write error: " . $e->getMessage());
        }
    }
    public static function searchDoctors($search): array
    {
        try {
            $db = new DB();
            $conn = $db->getConnection();
        
            $sql = "SELECT * FROM users WHERE Role = 'Doctor' AND (CONCAT(FirstName, ' ', LastName) LIKE :search OR Specialty LIKE :search)";
            $stmt = $conn->prepare($sql);
            $stmt->bindValue(':search', '%' . $search . '%', PDO::PARAM_STR);
            $stmt->execute();
        
            $doctorData = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $doctors = [];
        
            foreach ($doctorData as $doctor) {
                $user = new User(
                    $doctor['FirstName'],
                    $doctor['LastName'],
                    $doctor['PIN'],
                    $doctor['BirthdayDate'],
                    $doctor['Email'],
                    $doctor['Password'],
                    $doctor['Role'],
                    $doctor['Image'],
                    $doctor['Specialty'] ?? null,
                    $doctor['Phone'] ?? null,
                    $doctor['Description'] ?? null
                );
                $user->id = $doctor['Id'];
                $doctors[] = $user;
            }
        
            return $doctors;
        } catch (PDOException $e) {
            throw new Exception("Error when searching for doctors: " . $e->getMessage());
        }
    }
}
