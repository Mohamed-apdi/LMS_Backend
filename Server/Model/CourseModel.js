import mongoose from 'mongoose';

const { Schema } = mongoose;

const courseSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: [{
    type: String,
    required: true
  }],
  price: {
    type: Number,
    required: true
  },
  categories: {
    type: [String],
    required: true
  },
  enrolledStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  videoUrl: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    default: []
  }
},{ timestamps: true });

const Course = mongoose.model('Course', courseSchema);
export default Course;
