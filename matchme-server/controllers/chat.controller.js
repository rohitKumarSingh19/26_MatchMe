const Message = require('../models/Message');
// GET all messages
exports.getChatHistory = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load messages' });
  }
};
// Get last 20 messages, newest first
exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find()
      .sort({ timestamp: -1 }) // newest first
      .limit(20)
      .lean();
    res.json(messages.reverse()); // reverse to show oldest → newest
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch messages' });
  }
};

// Save a new message (via REST fallback)
exports.saveMessage = async (req, res) => {
  try {
    const { user, text } = req.body;
    const message = await Message.create({ user, text });
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ message: 'Failed to save message' });
  }
};
