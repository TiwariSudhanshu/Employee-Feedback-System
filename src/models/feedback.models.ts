import mongoose from 'mongoose';



const feedbackSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true,
  },
    feedbackText: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },}, {
  timestamps: true,
    });

const Feedback = mongoose.model('Feedback', feedbackSchema);
export default Feedback;