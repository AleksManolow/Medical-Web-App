-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 25, 2025 at 12:22 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `medical_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `Id` int(11) NOT NULL,
  `DoctorId` int(11) NOT NULL,
  `PatientId` int(11) NOT NULL,
  `DateTime` datetime NOT NULL,
  `Symptoms` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`Id`, `DoctorId`, `PatientId`, `DateTime`, `Symptoms`) VALUES
(1, 7, 8, '2025-01-11 10:30:00', 'Not good!!!'),
(2, 9, 5, '2025-01-14 10:30:00', 'Ankle swelling'),
(3, 13, 8, '2025-01-14 14:30:00', 'Not goood!'),
(4, 7, 5, '2025-01-14 09:30:00', 'TEst'),
(5, 4, 8, '2025-01-24 08:30:00', 'Има сърцебиене!'),
(6, 9, 14, '2025-01-24 13:00:00', 'Изпитвам болкав коляното, която е следствие от падане на лед.'),
(7, 11, 14, '2025-01-11 13:00:00', 'Болка в зъб!'),
(8, 4, 14, '2025-02-18 11:00:00', 'Сърдечни проблеми!!!'),
(9, 15, 14, '2025-01-31 13:30:00', 'Болки в коленете!'),
(10, 15, 14, '2025-01-25 08:30:00', 'dasdas'),
(11, 12, 14, '2025-01-30 11:00:00', 'Силни болки'),
(12, 19, 14, '2025-01-30 10:30:00', 'Not good!');

-- --------------------------------------------------------

--
-- Table structure for table `recipes`
--

CREATE TABLE `recipes` (
  `Id` int(11) NOT NULL,
  `AppointmentId` int(11) NOT NULL,
  `Medication` text NOT NULL,
  `Dosage` text NOT NULL,
  `Instructions` text NOT NULL,
  `CreatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `recipes`
--

INSERT INTO `recipes` (`Id`, `AppointmentId`, `Medication`, `Dosage`, `Instructions`, `CreatedAt`) VALUES
(19, 6, 'dsadsadasd', 'dasdasdasdasdas\r\ndsadasd\r\ndasdsadsadasd', 'dasdsada\r\ndasdsadasdasd\r\ndsadasdas', '2025-01-25 09:31:42'),
(20, 5, 'dsadasdasd', 'dasdasdasd', 'dasdasdasdas', '2025-01-25 09:32:29'),
(21, 9, 'Аркоксия - 2 пъти по 1 на ден.', 'Артрит начален стадии!', 'Повече движение и ограничаване в храната.', '2025-01-25 09:47:31'),
(25, 12, 'dasdasd', 'dsadasdas', 'dsadasd', '2025-01-25 11:12:34');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `Id` int(11) NOT NULL,
  `FirstName` text NOT NULL,
  `LastName` text NOT NULL,
  `PIN` text NOT NULL,
  `BirthdayDate` date NOT NULL,
  `Email` text NOT NULL,
  `Password` text NOT NULL,
  `Role` text NOT NULL,
  `Years` int(11) NOT NULL,
  `Image` text NOT NULL,
  `Specialty` text DEFAULT NULL,
  `Phone` text DEFAULT NULL,
  `Description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`Id`, `FirstName`, `LastName`, `PIN`, `BirthdayDate`, `Email`, `Password`, `Role`, `Years`, `Image`, `Specialty`, `Phone`, `Description`) VALUES
(1, 'Aleks', 'Manolov', '0545217845', '2005-12-28', 'aleksmanolov@abv.bg', 'Aleks123', 'Admin', 19, 'default_pic.jpg', NULL, NULL, ''),
(2, 'Gosho', 'Georgiew', '0254782156', '2000-12-04', 'gosho123@abv.bg', '$2y$10$7PUEil/W6/dRbpiDFUtcnuRR9yAKImTYpKZkSxb6.a778ckXcZFwq', 'Patient', 24, 'default_pic.jpg', NULL, NULL, ''),
(3, 'Иван', 'Иванов', '0145781256', '1999-12-11', 'ivanivanov@abv.bg', '$2y$10$7ifGixIi9SSL8nv7xpWKm.VmTXQPthlVl9lqRPApiR.4p0sv1RkOm', 'Admin', 25, 'default_pic.jpg', '', '', ''),
(4, 'Гери', 'Григорова', 'Top Doctor', '2000-01-02', 'gerigrig@abv.bg', '$2y$10$CxJap0zfBSGuHcVrw8yNiems587w4KF0v5Oz6Hsm9ahdEiwLfUF2a', 'Doctor', 25, '677929c05a940_images123.jpg', 'cardiologist', '0878451246', 'Top Doctor'),
(5, 'Гриша', 'Иванов', '0845124512', '1999-01-02', 'grishaIvn@abv.bg', '$2y$10$UZmsFEJZ2diyyJUEVUp/h.fQ01DHs1AeyJZ3Lr6YWoyaszMJiDtii', 'Patient', 26, 'default_pic.jpg', '', '', ''),
(6, 'Nikol', 'Georgieva', '0545125478', '1978-01-02', 'nikolGeorg@abv.bg', '$2y$10$A5zg86WpqvBUK3k9zToTAeGqmB9BPh6vZTdRqYo1Xt8TqFWIy2xsS', 'Doctor', 47, 'viber_image_2024-12-23_11-50-55-890.jpg', 'Surgical Sciences – Ophthalmology', '0879451245', 'Cataract, Cornea and Anterior Segment Refractive Surgery Pediatric Ophthalmology'),
(7, 'Grigor', 'Petrov', '7845124565', '1978-01-15', 'grigor123@abv.bg', '$2y$10$PwfmHg296cN4R0H5skwRX.9CeZD/WW5uwRZt0er.6/oUWonu5pXgm', 'Doctor', 46, '677fcb37589dc_nfzezNcE36Xj5BHvSDZ7TFj0ZQuJr9vMZUqrZEfx.jpg', 'surgeon', '0878451245', 'Surgeon with many years of experience'),
(8, 'Martin', 'Petrov', '7845124512', '1978-01-09', 'martinp123@abv.bg', '$2y$10$1.FrQFZAz3S.jOQ7Qze/OufHP0DXecJmLp92BGj0ieb4L0Momctti', 'Patient', 47, 'default_pic.jpg', NULL, NULL, NULL),
(9, 'Silvana', 'Ilieva', '8945784512', '1989-01-09', 'silventoo@abv.bg', '$2y$10$V/u3N/FPjzYQs19EOp3oHua5s7xl/1bnnlUXtaAo3rza2dmzHoZWW', 'Doctor', 36, '6782c02a43e82_JCzEc5GsOkEuGMR9hK8HQ8ZzKKYknXeaL3yEDt9L.jpg', 'orthopedist', '0878471246', 'An extremely good orthopedist with a lot of experience proven over the years'),
(10, 'Nasko', 'Nikolov', '7745124512', '1977-01-09', 'naskon123456@abv.bg', '$2y$10$QPRKA.Minxd80mLS4dD02.oykF0PZU1FL5210LIRbskpjHuhRfamq', 'Doctor', 48, '6782c1054edbe_Screenshot 2025-01-11 210522.png', 'orthopedist', '0878451246', 'Exceptional in the field'),
(11, 'Stefan', 'Aleksandrov', '6645124565', '1966-07-16', 'stefan123456@abv.bg', '$2y$10$csGBMnFpq4Sgstgvecu84ebUqrXSoxQj1VHOtklyzIN5tpbl7SuUC', 'Doctor', 58, '6782c1cc1f364_Screenshot 2025-01-11 210713.png', 'dentalist', '0878458956', 'Dentalist with many years of experience'),
(12, 'Aleksandra', 'Aleksova', '8045124512', '1980-01-10', 'aleksandra123456@abv.bg', '$2y$10$JfxMglSYnu//5z3efQ9yZu.FGcSQzSLKN0y34vI6C5OLQ0uHUn2Da', 'Doctor', 45, '6782c2996c12b_Screenshot 2025-01-11 211214.png', 'surgeon', '0878788978', 'Top Doctor'),
(13, 'Vladi', 'Stefanova', '6845124565', '1968-09-11', 'vladi123@abv.bg', '$2y$10$5s../BLN1lWD9ssRzizGfuUK0NATGtG.B9qr/fcl2awn.huObfJM.', 'Doctor', 56, '6782c322ddf64_Screenshot 2025-01-11 211431.png', 'cardiologist', '0878458977', 'Exceptional in the field'),
(14, 'Никола', 'Стефанов', '7845124578', '1978-01-15', 'patient@abv.bg', '$2y$10$6P55.An1ADcFLhtuBLl/m.PVqPhyEOtySV91IIR/O1HqpYlywN.oG', 'Patient', 47, 'default_pic.jpg', '', '', ''),
(15, 'Абдулкабар', 'Картал', '7845124565', '1978-01-09', 'abdul@abv.bg', '$2y$10$0VXA.V5bElk3fcENmUj25.dYrlIgi8BrLEV64BLcRhvDUW67CJ2tK', 'Doctor', 47, '6794b20222e15_Abdulcabbar-kartal-1920x700-1.jpg', 'Хирургиг', '0878458977', '2007 Професионална степен, Истанбулски университет, Медицински факултет, Истанбул  2013 Професионална степен, болница за образование и изследвания Sisli Etfal'),
(18, 'admin', 'admin', '7845124565', '1978-01-17', 'admin@abv.bg', '$2y$10$HOZEYgQHJEPtZjBl281TMuUcn2zKGo5VmS3.gvCrPqkzCJX0CkyAC', 'Admin', 47, 'default_pic.jpg', '', '', ''),
(19, 'Radina', 'Solakova', '8245124512', '1982-01-09', 'doctor@abv.bg', '$2y$10$0PoQVcDtmzSbahNIRCPN0u9cKVwMgQR1OSigTtBMRZtTA.c8Ful.S', 'Doctor', 43, '6794c6caa0075_Radina-Solakova.jpg', 'gastroenterologist', '0878458977', 'Dr. Radina Solakova graduated from the Medical University of Sofia in 2018.');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `DoctorId` (`DoctorId`),
  ADD KEY `PatientId` (`PatientId`);

--
-- Indexes for table `recipes`
--
ALTER TABLE `recipes`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `AppointmentId` (`AppointmentId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `recipes`
--
ALTER TABLE `recipes`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `appointments`
--
ALTER TABLE `appointments`
  ADD CONSTRAINT `appointments_ibfk_1` FOREIGN KEY (`DoctorId`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `appointments_ibfk_2` FOREIGN KEY (`PatientId`) REFERENCES `users` (`id`);

--
-- Constraints for table `recipes`
--
ALTER TABLE `recipes`
  ADD CONSTRAINT `recipes_ibfk_1` FOREIGN KEY (`AppointmentId`) REFERENCES `appointments` (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
