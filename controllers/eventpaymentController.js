const Eventpayments = require('../models/eventpaymentModel');

exports.createEventpayment = async (req, res) => {
  try {
    const result = await Eventpayments.create(req.body);
    res.status(201).json({ message: 'Eventpayment created', id: result.insertId });
  } catch (err) {
    console.error('Error creating Eventpayment:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllEventpayments = async (req, res) => {
  try {
    const results = await Eventpayments.getAll();
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching Eventpayments:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllEventpaymentsByPage = async (req, res) => {
  try {
    const { limit = 10, page = 1, searchtxt = '' } = req.query;
    
    const results = await Eventpayments.getAllByPage(Number(limit), Number(page), searchtxt);

    res.status(200).json({
      status: 'success',
      data: results.data,
      totalCount: results.totalCount,
      totalEventpayments: Math.ceil(results.totalCount / limit),
      currentEventpayment: Eventpayment
    });
  } catch (err) {
    console.error('Error fetching Eventpayments:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateEventpayment = async (req, res) => {
  const id = req.params.id;
  try {
    await Eventpayments.update(id, req.body,req.userDetails);
    res.status(200).json({ message: 'Eventpayment updated' });
  } catch (err) {
    console.error('Error updating Eventpayment:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteEventpayment = async (req, res) => {
  const id = req.params.id;
  try {
    await Eventpayments.delete(id,req.userDetails);
    res.status(200).json({ message: 'Eventpayment deleted' });
  } catch (err) {
    console.error('Error deleting Eventpayment:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
