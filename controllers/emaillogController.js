const Emaillogs = require('../models/emaillogModel');

exports.createEmaillog = async (req, res) => {
  try {
    const result = await Emaillogs.create(req.body);
    res.status(201).json({ message: 'Emaillog created', id: result.insertId });
  } catch (err) {
    console.error('Error creating Emaillog:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllEmaillogs = async (req, res) => {
  try {
    const results = await Emaillogs.getAll();
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching Emaillogs:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllEmaillogsByPage = async (req, res) => {
  try {
    const { limit = 10, Emaillog = 1, searchtxt = '' } = req.query;
    
    const results = await Emaillogs.getAllByPage(Number(limit), Number(Emaillog), searchtxt);

    res.status(200).json({
      status: 'success',
      data: results.data,
      totalCount: results.totalCount,
      totalEmaillogs: Math.ceil(results.totalCount / limit),
      currentEmaillog: Emaillog
    });
  } catch (err) {
    console.error('Error fetching Emaillogs:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateEmaillog = async (req, res) => {
  const id = req.params.id;
  try {
    await Emaillogs.update(id, req.body,req.userDetails);
    res.status(200).json({ message: 'Emaillog updated' });
  } catch (err) {
    console.error('Error updating Emaillog:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteEmaillog = async (req, res) => {
  const id = req.params.id;
  try {
    await Emaillogs.delete(id,req.userDetails);
    res.status(200).json({ message: 'Emaillog deleted' });
  } catch (err) {
    console.error('Error deleting Emaillog:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
