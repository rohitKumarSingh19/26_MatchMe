const User = require('../models/User');
exports.searchUsers = async (req, res) => {
  const query = req.query.query;
  const regex = new RegExp(query, 'i');
  const users = await User.find({
    $or: [{ name: regex }, { location: regex }]
  }).select('-password');

  res.json(users);
};
