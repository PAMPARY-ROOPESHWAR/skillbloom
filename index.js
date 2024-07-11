const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const adminUserRoutes = require('./routes/adminUserRoutes');
const adminCourseRoutes = require('./routes/adminCourseRoutes');
const adminContentRoutes = require('./routes/adminContentRoutes');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://akshaygondaliya2001:akshay003@cluster0.se2uf93.mongodb.net/skillbloom', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/auth', authRoutes);
app.use('/api/admin/users', adminUserRoutes);
app.use('/api/admin/courses', adminCourseRoutes);
app.use('/api/admin/contents', adminContentRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to SkillBloom Backend');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
