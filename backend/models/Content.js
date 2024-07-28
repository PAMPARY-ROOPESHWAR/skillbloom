const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    minlength: [3, 'Title must be at least 3 characters long'],
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    minlength: [10, 'Content must be at least 10 characters long'],
  },
  imageUrl: {
    type: String,
    required: false,
    validate: {
      validator: function(v) {
        return /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(v);
      },
      message: props => `${props.value} is not a valid image URL!`
    }
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: [true, 'Course is required'],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Content = mongoose.model('Content', ContentSchema);

module.exports = Content;
