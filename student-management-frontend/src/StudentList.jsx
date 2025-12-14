import React, { useEffect, useState } from "react";
import StudentService from "./StudentService.jsx";

const StudentList = ({ onEdit, refreshKey }) => {

  const [students, setStudents] = useState([]);

  useEffect(() => {
    getStudents();
  }, [refreshKey]);

  const getStudents = () => {
    StudentService.getAllStudents()
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const deleteStudent = (id) => {
    StudentService.deleteStudent(id).then(() => {
      getStudents();
    });
  };

  const handleEdit = (student) => {
    if (onEdit) {
      onEdit(student);
    }
  };

  return (
    <div style={{ paddingBottom: '40px' }}>
      <h2 style={{ fontSize: '24px' }}>STUDENT LIST</h2>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {
            students.map(student => (
              <tr key={student.id}>
                <td data-label="First Name">{student.firstName}</td>
                <td data-label="Last Name">{student.lastName}</td>
                <td data-label="Email">{student.email}</td>
                <td data-label="Course">{student.course}</td>
                <td data-label="Phone Number">{student.phoneNumber}</td>
                <td>
                  <button data-label="Edit" onClick={() => handleEdit(student)} style={{ marginRight: '10px', backgroundColor : "green" }}>
                    Edit
                  </button>
                  <button data-label="Delete" onClick={() => deleteStudent(student.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
