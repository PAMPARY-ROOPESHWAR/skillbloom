const Content = require('../models/Content');

// Get all contents
const getContents = async (req, res) => {
  try {
    const contents = await Content.find().populate('course', 'title');
    res.json(contents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new content
const createContent = async (req, res) => {
  const { title, content, course } = req.body;
  if (!title || title.length < 3) {
    return res.status(400).json({ message: 'Title must be at least 3 characters long' });
  }
  if (!content || content.length < 10) {
    return res.status(400).json({ message: 'Content must be at least 10 characters long' });
  }
  if (!course) {
    return res.status(400).json({ message: 'Course is required' });
  }

  const newContent = new Content({
    title,
    content,
    course,
  });

  try {
    const createdContent = await newContent.save();
    res.status(201).json(createdContent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update content
const updateContent = async (req, res) => {
  const { title, content, course } = req.body;
  if (!title || title.length < 3) {
    return res.status(400).json({ message: 'Title must be at least 3 characters long' });
  }
  if (!content || content.length < 10) {
    return res.status(400).json({ message: 'Content must be at least 10 characters long' });
  }
  if (!course) {
    return res.status(400).json({ message: 'Course is required' });
  }

  try {
    const contentItem = await Content.findById(req.params.id);
    if (!contentItem) return res.status(404).json({ message: 'Content not found' });

    contentItem.title = title || contentItem.title;
    contentItem.content = content || contentItem.content;
    contentItem.course = course || contentItem.course;
    await contentItem.save();
    res.json(contentItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete content
const deleteContent = async (req, res) => {
  try {
    const contentItem = await Content.findById(req.params.id);
    if (!contentItem) return res.status(404).json({ message: 'Content not found' });

    await Content.findByIdAndDelete(req.params.id);
    res.json({ message: 'Content deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getContents, createContent, updateContent, deleteContent };
