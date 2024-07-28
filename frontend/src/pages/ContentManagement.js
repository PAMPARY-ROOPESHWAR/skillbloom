import React, { useState, useEffect } from 'react';

const ContentManagement = () => {
  const [contents, setContents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');
  const [formVisible, setFormVisible] = useState(false);
  const [editContentId, setEditContentId] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [course, setCourse] = useState('');

  useEffect(() => {
    fetch('/api/admin/contents')
      .then(res => res.json())
      .then(data => setContents(data))
      .catch(err => setError('Failed to fetch contents'));

    fetch('/api/admin/courses')
      .then(res => res.json())
      .then(data => setCourses(data))
      .catch(err => setError('Failed to fetch courses'));
  }, []);

  const handleShowForm = (contentItem = null) => {
    if (contentItem) {
      setEditContentId(contentItem._id);
      setTitle(contentItem.title);
      setContent(contentItem.content);
      setImageUrl(contentItem.imageUrl);
      setCourse(contentItem.course._id);
    } else {
      setEditContentId(null);
      setTitle('');
      setContent('');
      setImageUrl('');
      setCourse('');
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
    if (!content || content.length < 10) {
      setError('Content must be at least 10 characters long');
      return;
    }
    if (imageUrl && !/^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(imageUrl)) {
      setError('Image URL must be a valid URL and in the proper format');
      return;
    }
    if (!course) {
      setError('Course is required');
      return;
    }
    const newContent = { title, content, imageUrl, course };
    try {
      const response = await fetch('/api/admin/contents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newContent),
      });
      if (!response.ok) {
        throw new Error('Failed to create content');
      }
      const createdContent = await response.json();
      setContents([...contents, createdContent]);
      setTitle('');
      setContent('');
      setImageUrl('');
      setCourse('');
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
    if (!content || content.length < 10) {
      setError('Content must be at least 10 characters long');
      return;
    }
    if (imageUrl && !/^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(imageUrl)) {
      setError('Image URL must be a valid URL and in the proper format');
      return;
    }
    if (!course) {
      setError('Course is required');
      return;
    }
    const updatedContent = { title, content, imageUrl, course };
    try {
      const response = await fetch(`/api/admin/contents/${editContentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedContent),
      });
      if (!response.ok) {
        throw new Error('Failed to update content');
      }
      const data = await response.json();
      setContents(contents.map(contentItem => (contentItem._id === editContentId ? data : contentItem)));
      setEditContentId(null);
      setTitle('');
      setContent('');
      setImageUrl('');
      setCourse('');
      setFormVisible(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    setError('');
    if (!window.confirm('Are you sure you want to delete this content?')) {
      return;
    }
    try {
      const response = await fetch(`/api/admin/contents/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete content');
      }
      setContents(contents.filter(contentItem => contentItem._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Content Management</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <button className="btn btn-primary mb-3" onClick={() => handleShowForm()}>Create New Content</button>
      {formVisible && (
        <form onSubmit={editContentId ? handleUpdate : handleCreate} className="mb-4">
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
            <label htmlFor="content" className="form-label">Content</label>
            <textarea
              className="form-control"
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
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
          <div className="mb-3">
            <label htmlFor="course" className="form-label">Course</label>
            <select
              className="form-control"
              id="course"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            >
              <option value="">Select Course</option>
              {courses.map(course => (
                <option key={course._id} value={course._id}>{course.title}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">{editContentId ? 'Update' : 'Create'} Content</button>
          <button type="button" className="btn btn-secondary ml-2" onClick={handleHideForm}>Cancel</button>
        </form>
      )}
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Content</th>
            <th>Image</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contents.map(contentItem => (
            <tr key={contentItem._id}>
              <td>{contentItem._id}</td>
              <td>{contentItem.title}</td>
              <td>{contentItem.content}</td>
              <td>{contentItem.imageUrl && <img src={contentItem.imageUrl} alt={contentItem.title} style={{ width: '100px' }} />}</td>
              <td>{contentItem.course.title}</td>
              <td>
                <button className="btn btn-warning btn-sm" onClick={() => handleShowForm(contentItem)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(contentItem._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContentManagement;
