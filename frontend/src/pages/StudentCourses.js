import React from 'react';

const StudentCourses = () => {
  // This should ideally be fetched from the server
  const courses = [
    { id: 1, title: 'Course 1', description: 'Description of course 1' },
    { id: 2, title: 'Course 2', description: 'Description of course 2' },
  ];

  return (
    <div className="container mt-5">
      <h1>My Courses</h1>
      <div className="row">
        {courses.map(course => (
          <div key={course.id} className="col-md-4">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">{course.title}</h5>
                <p className="card-text">{course.description}</p>
                <a href={`/course/${course.id}`} className="btn btn-primary">View Course</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentCourses;
