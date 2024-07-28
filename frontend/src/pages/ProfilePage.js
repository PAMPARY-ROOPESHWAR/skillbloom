import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';

const ProfilePage = () => {
  const { token, logout } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/user/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }
        const data = await response.json();
        setUsername(data.username);
        setEmail(data.email);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProfile();
  }, [token]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ username, email })
      });
      if (!response.ok) {
        throw new Error('Failed to update profile');
      }
      const data = await response.json();
      setSuccess('Profile updated successfully');
      setUsername(data.username);
      setEmail(data.email);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Profile Page</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleUpdateProfile}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Profile</button>
      </form>
      <button className="btn btn-secondary mt-3" onClick={logout}>Logout</button>
    </div>
  );
};

export default ProfilePage;
