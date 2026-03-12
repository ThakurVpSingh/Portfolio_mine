import express from 'express';
import Project from '../models/Project.js';
import Experience from '../models/Experience.js';
import Education from '../models/Education.js';
import Feedback from '../models/Feedback.js';

const router = express.Router();

// ---- Projects API ----
router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/projects/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/projects', async (req, res) => {
  try {
    const newProject = new Project(req.body);
    const saved = await newProject.save();
    res.status(201).json(saved);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

router.put('/projects/:id', async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

router.delete('/projects/:id', async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// ---- Experience API ----
router.get('/experience', async (req, res) => {
  try {
    const exps = await Experience.find().sort({ createdAt: -1 });
    res.json(exps);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/experience/:id', async (req, res) => {
  try {
    const exp = await Experience.findById(req.params.id);
    if (!exp) return res.status(404).json({ message: 'Experience not found' });
    res.json(exp);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/experience', async (req, res) => {
  try {
    const newExp = new Experience(req.body);
    const saved = await newExp.save();
    res.status(201).json(saved);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

router.put('/experience/:id', async (req, res) => {
  try {
    const updated = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

router.delete('/experience/:id', async (req, res) => {
  try {
    await Experience.findByIdAndDelete(req.params.id);
    res.json({ message: 'Experience deleted' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// ---- Education API ----
router.get('/education', async (req, res) => {
  try {
    const edus = await Education.find().sort({ createdAt: -1 });
    res.json(edus);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/education/:id', async (req, res) => {
  try {
    const edu = await Education.findById(req.params.id);
    if (!edu) return res.status(404).json({ message: 'Education not found' });
    res.json(edu);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/education', async (req, res) => {
  try {
    const newEdu = new Education(req.body);
    const saved = await newEdu.save();
    res.status(201).json(saved);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

router.put('/education/:id', async (req, res) => {
  try {
    const updated = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

router.delete('/education/:id', async (req, res) => {
  try {
    await Education.findByIdAndDelete(req.params.id);
    res.json({ message: 'Education deleted' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// ---- Feedback API ----
router.get('/feedback', async (req, res) => {
  try {
    const feeds = await Feedback.find().sort({ createdAt: -1 });
    res.json(feeds);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/feedback/:id', async (req, res) => {
  try {
    const feed = await Feedback.findById(req.params.id);
    if (!feed) return res.status(404).json({ message: 'Feedback not found' });
    res.json(feed);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/feedback', async (req, res) => {
  try {
    const newFeed = new Feedback(req.body);
    const saved = await newFeed.save();
    res.status(201).json(saved);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

router.put('/feedback/:id', async (req, res) => {
  try {
    const updated = await Feedback.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

router.delete('/feedback/:id', async (req, res) => {
  try {
    await Feedback.findByIdAndDelete(req.params.id);
    res.json({ message: 'Feedback deleted' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

import Setting from '../models/Setting.js';

// ---- Settings API ----
router.get('/settings/:key', async (req, res) => {
  try {
    const setting = await Setting.findOne({ key: req.params.key });
    res.json(setting ? setting.value : null);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/settings', async (req, res) => {
  try {
    const { key, value } = req.body;
    const updated = await Setting.findOneAndUpdate(
      { key },
      { value },
      { upsert: true, new: true }
    );
    res.json(updated);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

export default router;
