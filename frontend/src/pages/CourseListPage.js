import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';

const CourseListPage = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');
  const { token } = useContext(UserContext);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('/api/user/courses', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        const data = await response.json();
        setCourses(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCourses();
  }, [token]);

  const enrollInCourse = async (courseId) => {
    try {
      const response = await fetch('/api/user/courses/enroll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ courseId })
      });
      if (!response.ok) {
        throw new Error('Failed to enroll in course');
      }
      alert('Enrolled successfully');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="container mt-5">
      <h1>All Courses</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <ul className="list-group mb-4">
        {courses.map(course => (
          <li key={course._id} className="list-group-item">
            <h5>{course.title}</h5>
            <p>{course.description}</p>
            {course.imageUrl && <img src={course.imageUrl} alt={course.title} style={{ width: '100px' }} />}
            <button className="btn btn-primary mt-3" onClick={() => enrollInCourse(course._id)}>Enroll</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseListPage;
