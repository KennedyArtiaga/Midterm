import React, { useState, useEffect } from "react";
import axios from "axios";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";

const App = () => {
    const [students, setStudents] = useState([]);

    // Fetch students on page load
    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:5000/api/students");
            setStudents(response.data);
        } catch (error) {
            console.error("Error fetching students:", error);
        }
    };

    // Add student and update list
    const addStudent = async (name, course) => {
        try {
            await axios.post("http://127.0.0.1:5000/api/students", { name, course });
            fetchStudents(); // Refresh student list immediately
        } catch (error) {
            console.error("Error adding student:", error);
        }
    };

    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "10px" }}>
        <h1 style={{ color: "blue", textAlign: "center", marginBottom: "10px" }}>
          Student Recording System
        </h1>
    
        <StudentForm addStudent={addStudent} />
    
        <div style={{ position: "fixed", top: "20px", left: "20px" }}>
          <img 
            src="/kycnaa.jpg" 
            alt="Student Image" 
            style={{ width: "180px", height: "auto", borderRadius: "15px", display: "block" }}
          />
        </div>
    
        <div style={{ maxWidth: "600px", textAlign: "center", marginTop: "10px" }}>
          <h2 style={{ color: "red", marginBottom: "5px" }}>Student List</h2>
          <ul style={{ listStyleType: "none", padding: "0", margin: "0", display: "inline-block", textAlign: "left" }}>
            {students.map((student, index) => (
              <li key={index} style={{ display: "flex", alignItems: "center", gap: "3px", fontSize: "14px" }}>
                <span style={{ color: "red", fontSize: "16px" }}>•</span>
                <span style={{ color: "red" }}>{student.name} - {student.course}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
};

export default App;
