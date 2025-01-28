<h1 align="center">
  Medical Appointment Management System
</h1>

<p align="center">
  Book appointments, view medical records, and manage your healthcare with ease.
</p>


# Introduction
The "Medical Appointment Management System" is a web-based application designed to facilitate interactions between administrators, doctors, and patients. 
The project aims to create a system for booking medical examinations.
The user can search for a doctor with the option of filtering by name or specialty. When a doctor is selected from the displayed list, the user sees information about him. This includes general information. The free hours with this doctor available for booking are also displayed.
From the displayed list of free hours, the user can reserve an appointment for an examination only if he is registered in the system as a patient and has logged in to his account. If the user has logged in to his profile with the role of a patient, he can select one of the free hours and save it, and when saving he must enter his symptoms. When a reservation is made, it is recorded in the database and displayed to the patient and the doctor.
The patient can review all his past and future examinations. After having undergone an examination, the patient can see in his profile the prescription that the doctor issued him.
The user with the role of a doctor can see his reserved hours, as well as those that are not yet occupied. The doctor has the ability to issue, remove and review a prescription for a given examination, which will be shown to the patient.
The user with the admin role can add doctors, see all doctors and their information. The admin can also view all reserved appointments with doctors, as well as the prescriptions issued by the doctor.


## :ledger: Index
- [About](#beginner-about)
- [Installation](#electric_plug-installation)
- [Credentials](#key-credentials)
- [Build With](#hammer-build-with)
- [Gallery](#camera-gallery)


##  :beginner: About
"Medical Appointment Management System" caters to tree user types:

1. **Admin**
    - Admin is responsible for managing the system. He can add new doctors by entering information about them, and view data for all available doctors. In addition, the administrator has access to the list of reserved appointments with each doctor, as well as the prescriptions issued by them. This allows him to monitor and maintain the efficiency of the system.
2. **Doctor**
    - Doctor can see both his booked hours and those that remain free. He has the ability to issue prescriptions for certain examinations, as well as review or remove them if necessary. All this is aimed at better time management and ensuring quality care for patients.
3. **Patient**
    - Patient has the opportunity to register in the system, after which he can search for doctors using filters by name or specialty. After finding a suitable doctor, the patient can view detailed information about him, including a list of available hours. Only registered users with the patient role can reserve an appointment for an examination, for which they need to enter their symptoms. In addition, patients have access to the history of their past and future examinations, as well as to their issued prescriptions.


##  :electric_plug: Installation
To start the application, you first need to install **PHP** and **MySQL**. For convenience, you can directly install **XAMPP** – [https://www.apachefriends.org/](https://www.apachefriends.org/).  
XAMPP provides both PHP and MySQL in a single package, eliminating the need to install and configure them separately.

After installing XAMPP, you need to start the **Apache Web Server** and **MySQL**. The default ports should work, but if another resource is already running on any of them, you must update the ports in the configuration files.

### :key: Database Configuration
The next step is to configure the database connection in the application:  

1. Open the file `db.php`, located in the `/src/config` directory, and provide the following details for the database connection:  
   - **`$dbhost`**: Should be `localhost`, unless you are using a different installation.  
   - **`$dbName`**: The name of the database, which is `medical_system` by default, but can be changed.  
   - **`$port`**: If you are using the default port `3306`, there is no need to specify it. For a different port, set it here.  
   - **`$userName`**: The username of the database user with access rights (default is `root`).  
   - **`$userPassword`**: The password for the database user (default is an empty string).  

2. Create a database in **MySQL** with a name matching the value of `$dbName` (default is `medical_system`).  

3. Run the SQL script `initDatabase.sql` located in the `database` folder to initialize the database structure and data.


##  :key: Credentials
These users are placed in the DB after an additional script is executed - initDatabase.sql:
 - Admin User:

   -- UserName: admin@abv.bg
   
   -- Password: admin123456
   
- Doctor User:

   -- UserName: doctor@abv.bg
  
   -- Password: doctor123456
  
- Patient User:

   -- UserName: patient@abv.bg
  
   -- Password: patient123456


## :hammer: Build With
- PHP 8.4.12 - The standard capabilities of the language are used, without any additional libraries. The business logic of our application is modeled using PHP.
- MySQL - The database in which we store information about users, doctors, and booked appointments.
- HTML - It serves to implement the presentation layer of the application.
- CSS - It serves to create an attractive application interface.
- JS - It is used to insert dynamic elements into our pages.


##  :camera: Gallery

Unknown User:  Home View
![Image](https://github.com/user-attachments/assets/5909197b-5270-44d6-9a77-3142256d833c)

Patient:  Doctors View
![Image](https://github.com/user-attachments/assets/98c598e2-6ccf-4953-90b3-c255b7520ffb)

Patient:  Doctor Detail Popup
![Image](https://github.com/user-attachments/assets/8aa9db31-f004-41a1-b848-c3ba54613845)

Patient: View Recipe Popup
![Image](https://github.com/user-attachments/assets/81214cb4-662b-4cf2-9701-93a8a39092c2)

Patient: Profile View
![Image](https://github.com/user-attachments/assets/f6ba1c9d-6a4f-47bb-93c6-b66ed1253b3f)

Patient: Appointments View
![Image](https://github.com/user-attachments/assets/40405bf5-25ad-4157-b700-29bd6a6be866)

Doctor: Appointments View
![Image](https://github.com/user-attachments/assets/38f22e6b-a08e-43c5-89e8-08d36f1d3a84)

Doctor: Create Recipe Popup
![Image](https://github.com/user-attachments/assets/a44fdbc0-bfc7-40e6-8f27-cb3d000fca9a)

Doctor: Profile View
![Image](https://github.com/user-attachments/assets/da6463d0-2afe-45fc-bbd0-04a549751b53)

Admin: Admin Panel View
![Image](https://github.com/user-attachments/assets/53ded543-8104-4ff8-a601-42ed0a69e00f)

Admin: Add Doctor View
![Image](https://github.com/user-attachments/assets/e3256d60-94a5-43f1-aad5-45a7554473ab)


**This project was developed for the course on web technologies at the FMI.**
