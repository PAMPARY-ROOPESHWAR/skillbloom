import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const StudentDashboard = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="container mt-5">
      <h1>Student Dashboard</h1>
      <p>Welcome, {user.username}!</p>
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Enrolled Courses</h5>
              <p className="card-text">You are currently enrolled in 3 courses.</p>
              <a href="#" className="btn btn-primary">View Courses</a>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Progress</h5>
              <p className="card-text">You have completed 50% of your courses.</p>
              <a href="#" className="btn btn-primary">View Progress</a>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Notifications</h5>
              <p className="card-text">You have 2 new notifications.</p>
              <a href="#" className="btn btn-primary">View Notifications</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
