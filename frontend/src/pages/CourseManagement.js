import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CourseManagement = () => {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');
  const [formVisible, setFormVisible] = useState(false);
  const [editCourseId, setEditCourseId] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    fetch('/api/admin/courses')
      .then(res => res.json())
      .then(data => setCourses(data))
      .catch(err => setError('Failed to fetch courses'));
  }, []);

  const handleShowForm = (course = null) => {
    if (course) {
      setEditCourseId(course._id);
      setTitle(course.title);
      setDescription(course.description);
      setImageUrl(course.imageUrl);
    } else {
      setEditCourseId(null);
      setTitle('');
      setDescription('');
      setImageUrl('');
    }
    setFormVisible(true);
  };

  const handleHideForm = () => {
    setFormVisible(false);
    setError('');
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setError('');
    if (!title || title.length < 3) {
      setError('Title must be at least 3 characters long');
      return;
    }
    if (!description || description.length < 10) {
      setError('Description must be at least 10 characters long');
      return;
    }
    if (imageUrl && !/^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(imageUrl)) {
      setError('Image URL must be a valid URL and in the proper format');
      return;
    }
    const newCourse = { title, description, imageUrl };
    try {
      const response = await fetch('/api/admin/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCourse),
      });
      if (!response.ok) {
        throw new Error('Failed to create course');
      }
      const createdCourse = await response.json();
      setCourses([...courses, createdCourse]);
      setTitle('');
      setDescription('');
      setImageUrl('');
      setFormVisible(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');
    if (!title || title.length < 3) {
      setError('Title must be at least 3 characters long');
      return;
    }
    if (!description || description.length < 10) {
      setError('Description must be at least 10 characters long');
      return;
    }
    if (imageUrl && !/^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(imageUrl)) {
      setError('Image URL must be a valid URL and in the proper format');
      return;
    }
    const updatedCourse = { title, description, imageUrl };
    try {
      const response = await fetch(`/api/admin/courses/${editCourseId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCourse),
      });
      if (!response.ok) {
        throw new Error('Failed to update course');
      }
      const data = await response.json();
      setCourses(courses.map(course => (course._id === editCourseId ? data : course)));
      setEditCourseId(null);
      setTitle('');
      setDescription('');
      setImageUrl('');
      setFormVisible(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    setError('');
    if (!window.confirm('Are you sure you want to delete this course?')) {
      return;
    }
    try {
      const response = await fetch(`/api/admin/courses/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete course');
      }
      setCourses(courses.filter(course => course._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Course Management</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <button className="btn btn-primary mb-3" onClick={() => handleShowForm()}>Create New Course</button>
      {formVisible && (
        <form onSubmit={editCourseId ? handleUpdate : handleCreate} className="mb-4">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              className="form-control"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="imageUrl" className="form-label">Image URL</label>
            <input
              type="text"
              className="form-control"
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">{editCourseId ? 'Update' : 'Create'} Course</button>
          <button type="button" className="btn btn-secondary ml-2" onClick={handleHideForm}>Cancel</button>
        </form>
      )}
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <tr key={course._id}>
              <td>{course._id}</td>
              <td>{course.title}</td>
              <td>{course.description}</td>
              <td>{course.imageUrl && <img src={course.imageUrl} alt={course.title} style={{ width: '100px' }} />}</td>
              <td>
                <button className="btn btn-info btn-sm" onClick={() => navigate(`/course/${course._id}`)}>View</button>
                <button className="btn btn-warning btn-sm" onClick={() => handleShowForm(course)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(course._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseManagement;
