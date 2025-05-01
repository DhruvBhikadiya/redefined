const Eventtypes = require('../models/eventtypeModel');

exports.createEventtype = async (req, res) => {
  try {
    const result = await Eventtypes.create(req.body,req.userDetails);
    res.status(201).json({ message: 'Eventtype created', id: result.insertId });
  } catch (err) {
    console.error('Error creating Eventtype:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllEventtypes = async (req, res) => {
  try {
    const results = await Eventtypes.getAll();
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching Eventtypes:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllEventtypesByPage = async (req, res) => {
  try {
    const { limit = 10, Eventtype = 1, searchtxt = '' } = req.query;
    
    const results = await Eventtypes.getAllByPage(Number(limit), Number(Eventtype), searchtxt);

    res.status(200).json({
      status: 'success',
      data: results.data,
      totalCount: results.totalCount,
      totalEventtypes: Math.ceil(results.totalCount / limit),
      currentEventtype: Eventtype
    });
  } catch (err) {
    console.error('Error fetching Eventtypes:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateEventtype = async (req, res) => {
  const id = req.params.id;
  try {
    await Eventtypes.update(id, req.body,req.userDetails);
    res.status(200).json({ message: 'Eventtype updated' });
  } catch (err) {
    console.error('Error updating Eventtype:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteEventtype = async (req, res) => {
  const id = req.params.id;
  try {
    await Eventtypes.delete(id,req.userDetails);
    res.status(200).json({ message: 'Eventtype deleted' });
  } catch (err) {
    console.error('Error deleting Eventtype:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
