const Areas = require('../models/areaModel');

exports.createArea = async (req, res) => {
  try {
    const result = await Areas.create(req.body,req.userDetails);
    res.status(201).json({ message: 'Area created', id: result.insertId });
  } catch (err) {
    console.error('Error creating Area:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllAreas = async (req, res) => {
  try {
    const results = await Areas.getAll();
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching Areas:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllAreasByPage = async (req, res) => {
  try {
    const { limit = 10, Area = 1, searchtxt = '' } = req.query;
    
    const results = await Areas.getAllByPage(Number(limit), Number(Area), searchtxt);

    res.status(200).json({
      status: 'success',
      data: results.data,
      totalCount: results.totalCount,
      totalAreas: Math.ceil(results.totalCount / limit),
      currentArea: Area
    });
  } catch (err) {
    console.error('Error fetching Areas:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateArea = async (req, res) => {
  const id = req.params.id;
  try {
    await Areas.update(id, req.body,req.userDetails);
    res.status(200).json({ message: 'Area updated' });
  } catch (err) {
    console.error('Error updating Area:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteArea = async (req, res) => {
  const id = req.params.id;
  try {
    await Areas.delete(id,req.userDetails);
    res.status(200).json({ message: 'Area deleted' });
  } catch (err) {
    console.error('Error deleting Area:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
