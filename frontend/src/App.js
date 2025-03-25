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
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px" }}>
          
          {/* Title - Centered */}
          <h1 style={{ color: "blue", textAlign: "center", marginBottom: "20px" }}>
            Student Recording System
          </h1>
      
          {/* Input Form */}
          <StudentForm addStudent={addStudent} />
      
          {/* Success Message */}
          <p style={{ color: "green", marginTop: "10px" }}>Student added successfully!</p>
      
          {/* Layout Container - Image on Left Centered, Student List Centered */}
          <div style={{ 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center", 
            marginTop: "20px", 
            width: "100%", 
            position: "relative"
          }}>
            
            {/* Left Side: Fixed Image at Left Center */}
            <div style={{ 
              position: "absolute", 
              left: "10%", 
              top: "50%", 
              transform: "translateY(-50%)" 
            }}>
              <img 
                src="/kycnaa.jpg" 
                alt="Student Image" 
                style={{ width: "180px", height: "auto", borderRadius: "15px", display: "block" }}
              />
            </div>
      
            {/* Right Side: Student List (Centered) */}
            <div style={{ flex: 1, maxWidth: "600px", textAlign: "center" }}>
              <h2 style={{ color: "red" }}>Student List</h2>
              
              <ul style={{ listStyleType: "none", padding: "0", margin: "0", display: "inline-block", textAlign: "left" }}>
                {students.map((student, index) => (
                  <li key={index} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "18px" }}>
                    <span style={{ color: "red", fontSize: "20px" }}>•</span>
                    <span style={{ color: "red" }}>{student.name} - {student.course}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      );                        
};

export default App;
