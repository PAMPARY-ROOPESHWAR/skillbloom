import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="container mt-5">
      <h1>Admin Dashboard</h1>
      <div className="row">
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">User Management</h5>
              <p className="card-text">Manage users, edit user details, and delete users.</p>
              <Link to="/admin/users" className="btn btn-primary">Go to User Management</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Course Management</h5>
              <p className="card-text">Create, edit, and delete courses.</p>
              <Link to="/admin/courses" className="btn btn-primary">Go to Course Management</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Content Management</h5>
              <p className="card-text">Upload and manage course materials linked to courses.</p>
              <Link to="/admin/content" className="btn btn-primary">Go to Content Management</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
