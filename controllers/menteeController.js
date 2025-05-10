const Mentees = require('../models/menteeModel');

exports.createMentee = async (req, res) => {
  try {
    const result = await Mentees.create(req.body,req.userDetails);
    res.status(201).json({ message: 'Mentee created', id: result.insertId });
  } catch (err) {
    console.error('Error creating Mentee:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllMentees = async (req, res) => {
  try {
    const results = await Mentees.getAll();
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching Mentees:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllMenteesByPage = async (req, res) => {
  try {
    const { limit = 10, Mentee = 1, searchtxt = '' } = req.query;
    
    const results = await Mentees.getAllByPage(Number(limit), Number(Mentee), searchtxt);

    res.status(200).json({
      status: 'success',
      data: results.data,
      totalCount: results.totalCount,
      totalMentees: Math.ceil(results.totalCount / limit),
      currentMentee: Mentee
    });
  } catch (err) {
    console.error('Error fetching Mentees:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateMentee = async (req, res) => {
  const id = req.params.id;
  try {
    await Mentees.update(id, req.body,req.userDetails);
    res.status(200).json({ message: 'Mentee updated' });
  } catch (err) {
    console.error('Error updating Mentee:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteMentee = async (req, res) => {
  const id = req.params.id;
  try {
    await Mentees.delete(id,req.userDetails);
    res.status(200).json({ message: 'Mentee deleted' });
  } catch (err) {
    console.error('Error deleting Mentee:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
