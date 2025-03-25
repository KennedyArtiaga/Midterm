import React from "react";

const StudentList = ({ students }) => {
    return (
        <div style={{ textAlign: "center", color: "red" }}>
            <h2>Student List</h2>
            <ul>
              {students.length === 0 ? (
               <p>No students added yet.</p>
             ) : (
                 students.map ((student, index) => (
                  <li key={index}>
                    {student.name} - {student.course}
                 </li>
                ))
            )}
            </ul>
        </div>
    );
};

export default StudentList;