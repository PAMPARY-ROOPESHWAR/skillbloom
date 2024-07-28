const Course = require('../models/Course');
const User = require('../models/User');

const getUserDashboard = async (req, res) => {
  try {
    const userId = req.user.id; 
    const enrolledCourses = await Course.find({ enrolledUsers: { $in: [userId] } });
    res.json({ enrolledCourses });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const enrollInCourse = async (req, res) => {
  try {
    const userId = req.user.id; 
    const { courseId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (course.enrolledUsers.includes(userId)) {
      return res.status(400).json({ message: 'User already enrolled in this course' });
    }

    course.enrolledUsers.push(userId);
    await course.save();

    res.json({ message: 'Enrolled successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update user profile
const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { username } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.username = username || user.username;

    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getUserDashboard, getAllCourses, enrollInCourse, updateUserProfile, getUserProfile };
