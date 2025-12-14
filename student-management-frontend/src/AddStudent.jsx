import React, { useState, useEffect } from "react";
import StudentService from "./StudentService.jsx";

const AddStudent = ({ editingStudent, onCancelEdit, onStudentSaved }) => {

  const [student, setStudent] = useState({
    firstName: "",
    lastName: "",
    email: "",
    course: "",
    phoneNumber: ""
  });

  useEffect(() => {
    if (editingStudent) {
      setStudent({
        firstName: editingStudent.firstName || "",
        lastName: editingStudent.lastName || "",
        email: editingStudent.email || "",
        course: editingStudent.course || "",
        phoneNumber: editingStudent.phoneNumber || ""
      });
    } else {
      setStudent({
        firstName: "",
        lastName: "",
        email: "",
        course: "",
        phoneNumber: ""
      });
    }
  }, [editingStudent]);

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });
  };

  const saveStudent = (e) => {
    e.preventDefault();
    
    if (editingStudent && editingStudent.id) {
      // Update existing student
      StudentService.updateStudent(editingStudent.id, student)
        .then(() => {
          alert("Student updated successfully");
          onStudentSaved();
        })
        .catch(error => {
          console.error(error);
          alert("Error updating student");
        });
    } else {
      // Create new student
      StudentService.createStudent(student)
        .then(() => {
          alert("Student added successfully");
          onStudentSaved();
        })
        .catch(error => {
          console.error(error);
          alert("Error adding student");
        });
    }
  };

  return (
    <form>
      <h2>{editingStudent ? "Edit Student" : "Add Student"}</h2>
      <input 
        name="firstName" 
        placeholder="First Name" 
        value={student.firstName}
        onChange={handleChange} 
      />
      <input 
        name="lastName" 
        placeholder="Last Name" 
        value={student.lastName}
        onChange={handleChange} 
      />
      <input 
        name="email" 
        placeholder="Email" 
        value={student.email}
        onChange={handleChange} 
      />
      <input 
        name="course" 
        placeholder="Course" 
        value={student.course}
        onChange={handleChange} 
      />
      <input 
        name="phoneNumber" 
        placeholder="Phone Number" 
        value={student.phoneNumber}
        onChange={handleChange} 
      />
      <button onClick={saveStudent}>
        {editingStudent ? "Update" : "Save"}
      </button>
      {editingStudent && (
        <button type="button" onClick={onCancelEdit}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default AddStudent;
