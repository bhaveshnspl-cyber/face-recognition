const mysql = require('mysql2');

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    port: 3306,
    password: 'root',
    database: 'attendance_tracker'
});

db.connect((err) => {
    if (err) {
        console.log('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');

    // Create Employees Table
    const createEmployeesTable = `
        CREATE TABLE IF NOT EXISTS attendance_tracker.employees (
            id INT AUTO_INCREMENT PRIMARY KEY,
            e_name VARCHAR(255) NOT NULL,
            e_phone VARCHAR(20) NOT NULL,
            image_url LONGTEXT NOT NULL
        );
    `;

    db.query(createEmployeesTable, (err, result) => {
        if (err) {
            console.error("Error creating employees table:", err);
            return;
        }
        console.log("Employees table ensured.");
    });

    // Create Attendance Table
    const createAttendanceTable = `
        CREATE TABLE IF NOT EXISTS attendance_tracker.attendance (
            id INT AUTO_INCREMENT PRIMARY KEY,
            e_id INT NOT NULL,
            date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (e_id) REFERENCES attendance_tracker.employees(id) ON DELETE CASCADE
        );
    `;

    db.query(createAttendanceTable, (err, result) => {
        if (err) {
            console.error("Error creating attendance table:", err);
            return;
        }
        console.log("Attendance table ensured.");
    });
});

// ALTER TABLE attendance_tracker.employees ADD COLUMN face_embedding JSON;

module.exports = db;
