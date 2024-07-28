import React, { useState, useEffect } from 'react';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [editUserId, setEditUserId] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    fetch('/api/admin/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => setError('Failed to fetch users'));
  }, []);

  const handleEdit = (user) => {
    setEditUserId(user._id);
    setUsername(user.username);
    setEmail(user.email);
    setRole(user.role);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');
    if (!username || !email) {
      setError('All fields are required');
      return;
    }
    const updatedUser = { username, email, role };
    try {
      const response = await fetch(`/api/admin/users/${editUserId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });
      if (!response.ok) {
        throw new Error('Failed to update user');
      }
      const data = await response.json();
      setUsers(users.map(user => (user._id === editUserId ? data : user)));
      setEditUserId(null);
      setUsername('');
      setEmail('');
      setRole('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mt-5">
      <h1>User Management</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {editUserId && (
        <form onSubmit={handleUpdate} className="mb-4">
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="role" className="form-label">Role</label>
            <select
              className="form-control"
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Update User</button>
        </form>
      )}
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>
                <button className="btn btn-warning btn-sm" onClick={() => handleEdit(user)}>Edit</button>
                <button className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
