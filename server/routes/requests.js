const router = require('express').Router();
const Request = require('../models/Request');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

// Get all requests
router.get('/', async (req, res) => {
  try {
    const { category, urgency } = req.query;
    let filter = {};
    if (category) filter.category = category;
    if (urgency) filter.urgency = urgency;
    const requests = await Request.find(filter)
      .populate('author', 'name trustScore')
      .sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create request
router.post('/', authMiddleware, async (req, res) => {
  try {
    const request = await Request.create({ ...req.body, author: req.user.id });
    res.json(request);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get single request
router.get('/:id', async (req, res) => {
  try {
    const request = await Request.findById(req.params.id)
      .populate('author', 'name trustScore badges')
      .populate('helpers', 'name trustScore');
    res.json(request);
  } catch (err) {
    res.status(404).json({ message: 'Not found' });
  }
});

// Offer to help
router.post('/:id/help', authMiddleware, async (req, res) => {
  try {
    const request = await Request.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { helpers: req.user.id }, status: 'in_progress' },
      { new: true }
    );
    // Increase trust score
    await User.findByIdAndUpdate(req.user.id, { $inc: { trustScore: 5, helpedCount: 1 } });
    res.json(request);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Mark as solved
router.patch('/:id/solve', authMiddleware, async (req, res) => {
  try {
    const request = await Request.findByIdAndUpdate(
      req.params.id,
      { status: 'solved' },
      { new: true }
    );
    res.json(request);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Leaderboard
router.get('/meta/leaderboard', async (req, res) => {
  try {
    const users = await User.find().sort({ trustScore: -1 }).limit(10)
      .select('name trustScore helpedCount badges');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;