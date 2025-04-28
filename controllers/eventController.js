const Events = require('../models/eventModel');

exports.createEvent = async (req, res) => {
  try {
    const result = await Events.create(req.body);
    res.status(201).json({ message: 'Event created', id: result.insertId });
  } catch (err) {
    console.error('Error creating Event:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const results = await Events.getAll();
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching Events:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getUpcomingEvents = async (req, res) => {
  try {
    const results = await Events.getUpcoming();
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching Events:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getPastEvents = async (req, res) => {
  try {
    const results = await Events.getPast();
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching Events:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getEventDetail = async (req, res) => {
  const id = req.params.id;
  try {
    const results = await Events.getEventDetail(id);
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching Events:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllEventsByPage = async (req, res) => {
  try {
    const { limit = 10, Event = 1, searchtxt = '' } = req.query;
    
    const results = await Events.getAllByPage(Number(limit), Number(Event), searchtxt);

    res.status(200).json({
      status: 'success',
      data: results.data,
      totalCount: results.totalCount,
      totalEvents: Math.ceil(results.totalCount / limit),
      currentEvent: Event
    });
  } catch (err) {
    console.error('Error fetching Events:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateEvent = async (req, res) => {
  const id = req.params.id;
  try {
    await Events.update(id, req.body);
    res.status(200).json({ message: 'Event updated' });
  } catch (err) {
    console.error('Error updating Event:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteEvent = async (req, res) => {
  const id = req.params.id;
  try {
    await Events.delete(id);
    res.status(200).json({ message: 'Event deleted' });
  } catch (err) {
    console.error('Error deleting Event:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
