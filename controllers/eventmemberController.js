const Eventmembers = require('../models/eventmemberModel');

exports.createEventmember = async (req, res) => {
  try {
    const result = await Eventmembers.create(req.body,req.userDetails);
    res.status(201).json({ message: 'Eventmember created', id: result.insertId });
  } catch (err) {
    console.error('Error creating Eventmember:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllEventmembers = async (req, res) => {
  try {
    const results = await Eventmembers.getAll();
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching Eventmembers:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllEventmembersByEvent = async (req, res) => {
  const id = req.params.id;
  try {
    const results = await Eventmembers.getAllByEvent(id);
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching Eventmembers:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllEventmembersByPage = async (req, res) => {
  try {
    const { limit = 10, Eventmember = 1, searchtxt = '' } = req.query;
    
    const results = await Eventmembers.getAllByPage(Number(limit), Number(Eventmember), searchtxt);

    res.status(200).json({
      status: 'success',
      data: results.data,
      totalCount: results.totalCount,
      totalEventmembers: Math.ceil(results.totalCount / limit),
      currentEventmember: Eventmember
    });
  } catch (err) {
    console.error('Error fetching Eventmembers:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateEventmember = async (req, res) => {
  const id = req.params.id;
  try {
    await Eventmembers.update(id, req.body,req.userDetails);
    res.status(200).json({ message: 'Eventmember updated' });
  } catch (err) {
    console.error('Error updating Eventmember:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteEventmember = async (req, res) => {
  const id = req.params.id;
  try {
    await Eventmembers.delete(id,req.userDetails);
    res.status(200).json({ message: 'Eventmember deleted' });
  } catch (err) {
    console.error('Error deleting Eventmember:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
