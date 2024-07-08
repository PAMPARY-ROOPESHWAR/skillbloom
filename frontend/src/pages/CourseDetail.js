import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const CourseDetail = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(`/api/admin/courses/${courseId}/contents`);
        if (!response.ok) {
          throw new Error('Failed to fetch course details');
        }
        const data = await response.json();
        setCourse(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h1>{course.title}</h1>
      <p>{course.description}</p>
      <h2>Contents</h2>
      <ul className="list-group">
        {course.contents.map(content => (
          <li key={content._id} className="list-group-item">
            <h5>{content.title}</h5>
            <p>{content.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseDetail;
