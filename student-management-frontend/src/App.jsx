import React, { useState } from "react";
import AddStudent from "./AddStudent.jsx";
import StudentList from "./StudentList.jsx";

function App() {
  const [editingStudent, setEditingStudent] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleEdit = (student) => {
    setEditingStudent(student);
  };

  const handleCancelEdit = () => {
    setEditingStudent(null);
  };

  const handleStudentSaved = () => {
    setEditingStudent(null);
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold', color: '#333', marginTop: '20px' }}>STUDENT MANAGEMENT SYSTEM</h1>
      <AddStudent 
        editingStudent={editingStudent}
        onCancelEdit={handleCancelEdit}
        onStudentSaved={handleStudentSaved}
      />
      <StudentList 
        onEdit={handleEdit}
        refreshKey={refreshKey}
      />
    </div>
  );
}

export default App;
