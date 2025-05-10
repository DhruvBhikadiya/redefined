const Events = require('../models/eventModel');
const db = require('../config/db');

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
    const results = await Events.getPastEvents();
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
    const { limit = 10, page = 1, searchtxt = '' } = req.query;
    
    const results = await Events.getAllByPage(Number(limit), Number(page), searchtxt);

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
exports.getPastEventsByPage = async (req, res) => {
  try {
    const { limit = 10, Event = 1, searchtxt = '' } = req.query;
    
    const results = await Events.getPastEventsByPage(Number(limit), Number(Event), searchtxt);

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
exports.getUpcomingEventsByPage = async (req, res) => {
  try {
    const { limit = 10, Event = 1, searchtxt = '' } = req.query;
    
    const results = await Events.getUpcomingEventsByPage(Number(limit), Number(Event), searchtxt);

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


exports.getEventFiltersList = async (req, res) => {
  try {
      const [citiesResult] = await db.query("SELECT DISTINCT city FROM event");
      const [typesResult] = await db.query("SELECT DISTINCT type FROM event");

      const cities = citiesResult.map(row => row.city);
      const types = typesResult.map(row => row.type);

      res.json({ cities, types });
  } catch (err) {
      console.error("Error fetching filter list:", err);
      res.status(500).send("Server error");
  }
};

exports.filterEvents = async (req, res) => {
  try {
      const { types = [], cities = [], searchText = '' } = req.body;

      const today = moment().format('YYYY-MM-DD');
      const currentTime = moment().format('hh:mm A');

      let query = `SELECT * FROM event WHERE (date > ? OR (date = ? AND STR_TO_DATE(st, '%h:%i %p') > STR_TO_DATE(?, '%h:%i %p')))`;
      const params = [today, today, currentTime];

      if (types.length > 0) {
          query += ` AND type IN (?)`;
          params.push(types);
      }

      if (cities.length > 0) {
          query += ` AND city IN (?)`;
          params.push(cities);
      }

      if (searchText.trim() !== '') {
          query += ` AND name LIKE ?`;
          params.push(`%${searchText}%`);
      }

      const [events] = await db.query(query, params);

      res.json(events);
  } catch (err) {
      console.error("Error filtering events:", err);
      res.status(500).send("Server error");
  }
};
