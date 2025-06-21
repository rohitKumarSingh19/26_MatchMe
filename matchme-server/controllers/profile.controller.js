exports.getProfile = async (req, res) => {
  res.json(req.user);
};
exports.updateProfile = async (req, res) => {
  try {
    const updated = await req.user.set(req.body).save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Update failed' });
  }
};
