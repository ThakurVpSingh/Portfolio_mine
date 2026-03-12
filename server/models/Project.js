import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  tech: [{ type: String }],
  link: { type: String },
  github: { type: String },
  description: { type: String, required: true },
  caseStudy: { type: String },
  category: { type: String, default: 'Development' },
  duration: { type: String },
  images: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Project', projectSchema);
