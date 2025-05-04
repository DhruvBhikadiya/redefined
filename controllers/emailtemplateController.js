const Emailtemplates = require('../models/emailtemplateModel');

exports.createEmailtemplate = async (req, res) => {
  try {
    const result = await Emailtemplates.create(req.body);
    res.status(201).json({ message: 'Emailtemplate created', id: result.insertId });
  } catch (err) {
    console.error('Error creating Emailtemplate:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllEmailtemplates = async (req, res) => {
  try {
    const results = await Emailtemplates.getAll();
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching Emailtemplates:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllEmailtemplatesByPage = async (req, res) => {
  try {
    const { limit = 10, Emailtemplate = 1, searchtxt = '' } = req.query;
    
    const results = await Emailtemplates.getAllByPage(Number(limit), Number(Emailtemplate), searchtxt);

    res.status(200).json({
      status: 'success',
      data: results.data,
      totalCount: results.totalCount,
      totalEmailtemplates: Math.ceil(results.totalCount / limit),
      currentEmailtemplate: Emailtemplate
    });
  } catch (err) {
    console.error('Error fetching Emailtemplates:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateEmailtemplate = async (req, res) => {
  const id = req.params.id;
  try {
    await Emailtemplates.update(id, req.body,req.userDetails);
    res.status(200).json({ message: 'Emailtemplate updated' });
  } catch (err) {
    console.error('Error updating Emailtemplate:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteEmailtemplate = async (req, res) => {
  const id = req.params.id;
  try {
    await Emailtemplates.delete(id,req.userDetails);
    res.status(200).json({ message: 'Emailtemplate deleted' });
  } catch (err) {
    console.error('Error deleting Emailtemplate:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
