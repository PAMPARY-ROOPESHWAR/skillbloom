import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Navbar = () => {
  const { user, logout } = useContext(UserContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">SkillBloom</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            {!user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">Signup</Link>
                </li>
              </>
            )}
            {user && user.role === 'student' && (
              <>
               <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/courses">Courses</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">Profile</Link>
                </li>
              </>
            )}
            {user && user.role === 'admin' && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/users">User</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/courses">Course</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/content">Content</Link>
                </li>
              </>
            )}
            {user && (
              <>
                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={logout}>Logout</button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
