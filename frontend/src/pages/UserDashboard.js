import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [error, setError] = useState('');
  const { token } = useContext(UserContext);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('/api/user/dashboard', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data');
        }
        const data = await response.json();
        setEnrolledCourses(data.enrolledCourses);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchDashboardData();
  }, [token]);

  return (
    <div className="container mt-5">
      {error && <div className="alert alert-danger">{error}</div>}
      <h2>Enrolled Courses</h2>
      <ul className="list-group mb-4">
        {enrolledCourses.map(course => (
          <li key={course._id} className="list-group-item">
            <Link to={`/course/${course._id}`}>
              <h5>{course.title}</h5>
              <p>{course.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserDashboard;
