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

    public function __construct($first_name,  $last_name,  $pin,  $birthday_date,  $email,  $password,  $role, $image, $specialty, $phone) {
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

        //Calc years
        $birthDate = new DateTime($birthday_date);
        $currentDate = new DateTime();
        $age = $currentDate->diff($birthDate)->y;
        $this->years = $age;
    }

    public function validate(): void {
        if(empty($this->first_name)) {
            throw new Exception("Полето име е задължително!");
        }
        if(empty($this->last_name)) {
            throw new Exception("Полето фамилия е задължително!");
        }
        if(empty($this->email)) {
            throw new Exception("Полето имeйл е задължително!");
        }
        if(empty($this->password)) {
            throw new Exception("Полето парола е задължително!");
        }
        if(empty($this->pin)){
            throw new Exception("Полето ЕГН е задължително!");
        }
        if(empty($this->birthday_date)){
            throw new Exception("Полето дата на раждане е задължително!");
        }
        if(strlen($this->first_name) < 2 || strlen($this->first_name) >= 30) {
            throw new Exception("Моля, попълнете валидно име!");
        }
        if(strlen($this->last_name) < 2 || strlen($this->last_name) >= 30 ) {
            throw new Exception("Моля, попълнете валиднa фамилия!");
        }
        if(!(preg_match('/^[^@]+@[^@]+\.[^@]+$/', $this->email))) {
            throw new Exception("Моля, попълнете валиден имейл.");
        }
        if(strlen($this->password) < 8) {
            throw new Exception("Моля, попълнете валидна парола, която е поне 8 символа.");
        }
        if(strlen($this->pin) != 10 || !ctype_digit($this->pin)){
            throw new Exception("Моля, попълнете валидна ЕГН, която е 10 цифри.");
        }
        if($this->role == "Doctor" && empty($this->specialty)){
            throw new Exception("Полето специалност е задължително!");
        }
        if($this->role == "Doctor" && empty($this->phone)){
            throw new Exception("Полето телефон е задължително!");
        }
    }
    public function storeInDB(): void {
        try {
            // Свързване с базата данни
            $db = new DB();
			$conn = $db->getConnection();

            if($this->role == "Doctor")
            {
                $sql = "INSERT INTO users (FirstName, LastName, PIN, BirthdayDate, Email, Password, Role, Image, Years, Specialty, Phone) 
                VALUES (:first_name, :last_name, :pin, :birthday_date, :email, :password, :role, :image, :years, :specialty, :phone)";
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
            throw new Exception("Грешка при запис в базата данни: " . $e->getMessage());
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
                // Създаване на обект User от извлечените данни
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
                    $userData['Phone'] ?? null
                );
    
                $user->id = $userData['Id'];
                return $user;
            } else {
                return null;
            }
        } catch (PDOException $e) {
            throw new Exception("Грешка при извличане на потребител: " . $e->getMessage());
        }
    }
    public static function update($id, $firstName, $lastName, $birthdayDate, $specialty, $phone, $email, $profileImage, $pin): void 
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
                Image = :profileImage
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

            $stmt->execute();
        } catch (PDOException $e) {
            throw new Exception("Грешка при запис в базата данни: " . $e->getMessage());
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
                    $doctor['Phone'] ?? null
                );
                $user->id = $doctor['Id'];
                $doctors[] = $user;
            }
        
            return $doctors;
        } catch (PDOException $e) {
            throw new Exception("Грешка при търсенето на доктори: " . $e->getMessage());
        }
    }
}
