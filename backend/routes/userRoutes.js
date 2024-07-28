const express = require('express');
const { getUserDashboard, getAllCourses, enrollInCourse, getUserProfile, updateUserProfile } = require('../controllers/userController');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/dashboard', auth, getUserDashboard);
router.get('/courses', auth, getAllCourses);
router.post('/courses/enroll', auth, enrollInCourse);
router.get('/profile', auth, getUserProfile);
router.put('/profile', auth, updateUserProfile);

module.exports = router;
