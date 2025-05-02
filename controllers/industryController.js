const Industrys = require('../models/industryModel');

exports.createIndustry = async (req, res) => {
  try {
    const result = await Industrys.create(req.body,req.userDetails);
    res.status(201).json({ message: 'Industry created', id: result.insertId });
  } catch (err) {
    console.error('Error creating Industry:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllIndustrys = async (req, res) => {
  try {
    const results = await Industrys.getAll();
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching Industrys:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllIndustrysByPage = async (req, res) => {
  try {
    const { limit = 10, Industry = 1, searchtxt = '' } = req.query;
    
    const results = await Industrys.getAllByPage(Number(limit), Number(Industry), searchtxt);

    res.status(200).json({
      status: 'success',
      data: results.data,
      totalCount: results.totalCount,
      totalIndustrys: Math.ceil(results.totalCount / limit),
      currentIndustry: Industry
    });
  } catch (err) {
    console.error('Error fetching Industrys:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateIndustry = async (req, res) => {
  const id = req.params.id;
  try {
    await Industrys.update(id, req.body,req.userDetails);
    res.status(200).json({ message: 'Industry updated' });
  } catch (err) {
    console.error('Error updating Industry:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteIndustry = async (req, res) => {
  const id = req.params.id;
  try {
    await Industrys.delete(id,req.userDetails);
    res.status(200).json({ message: 'Industry deleted' });
  } catch (err) {
    console.error('Error deleting Industry:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
