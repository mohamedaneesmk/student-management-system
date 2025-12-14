import React, { useEffect, useState } from 'react';

const empty = { firstName: '', lastName: '', email: '', department: '' };

export default function StudentForm({ onCreate, onUpdate, editing, cancelEdit }) {
  const [form, setForm] = useState(empty);

  useEffect(() => {
    if (editing) {
      setForm({
        firstName: editing.firstName || '',
        lastName: editing.lastName || '',
        email: editing.email || '',
        department: editing.department || ''
      });
    } else {
      setForm(empty);
    }
  }, [editing]);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submit = (e) => {
    e.preventDefault();
    if (editing) {
      onUpdate(editing.id, form);
    } else {
      onCreate(form);
      setForm(empty);
    }
  };

  return (
    <div className="form-card">
      <h2>{editing ? 'Edit Student' : 'Add Student'}</h2>
      <form onSubmit={submit}>
        <label>First Name
          <input name="firstName" value={form.firstName} onChange={handleChange} required />
        </label>

        <label>Last Name
          <input name="lastName" value={form.lastName} onChange={handleChange} required />
        </label>

        <label>Email
          <input name="email" type="email" value={form.email} onChange={handleChange} required />
        </label>

        <label>Department
          <input name="department" value={form.department} onChange={handleChange} />
        </label>

        <div className="form-actions">
          <button type="submit">{editing ? 'Update' : 'Create'}</button>
          {editing && <button type="button" onClick={cancelEdit}>Cancel</button>}
        </div>
      </form>
    </div>
  );
}
