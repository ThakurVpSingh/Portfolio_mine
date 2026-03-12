import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  companyName: { type: String, required: true },
  websiteLink: { type: String },
  duration: { type: String, required: true },
  service: { type: String, required: true },
  experience: { type: String, required: true },
  approved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Feedback', feedbackSchema);
