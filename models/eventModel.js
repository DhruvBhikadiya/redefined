const db = require('../config/db');
const moment = require('moment');

const event = {
  create: async (data) => {
    const sql = 'INSERT INTO event (name, about, date, shortAddress, st, et, host, oldPrice, price, mapUrl, location, country, state, city, maxMembers, type, image, imageId, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())';
    try {
      const [results] = await db.execute(sql, [data.name, data.about, data.date, data.shortAddress, data.st, data.et, data.host, data.oldPrice, data.price, data.mapUrl, data.location, data.country, data.state, data.city, data.maxMembers, data.type, data.image, data.imageId]);

      let dataJSON = {
        status: 'success',
        data: results
      }
      return dataJSON;
    } catch (err) {
      throw err;
    }
  },

  getAll: async () => {
    try {
      const [results] = await db.execute(`SELECT * FROM event ORDER BY created_at DESC`);
      let dataJSON = {
        status: 'success',
        data: results
      };

      return dataJSON;
    } catch (err) {
      throw err;
    }
  },

  getUpcoming: async () => {
    try {
      const today = moment().format('YYYY-MM-DD');
      const currentTime = moment().format('hh:mm A'); // e.g., 03:20 PM

      const [results] = await db.execute(`
        SELECT * FROM event 
        WHERE 
          (date > ? OR (date = ? AND STR_TO_DATE(st, '%h:%i %p') > STR_TO_DATE(?, '%h:%i %p')))
        ORDER BY date ASC
      `, [today, today, currentTime]);

      let dataJSON = {
        status: 'success',
        data: results
      };

      return dataJSON;
    } catch (err) {
      throw err;
    }
  },

  getPastEvents: async () => {
    try {
      const today = moment().format('YYYY-MM-DD');
      const currentTime = moment().format('hh:mm A');

      const [results] = await db.execute(`
        SELECT * FROM event 
        WHERE 
          (date < ? OR (date = ? AND STR_TO_DATE(st, '%h:%i %p') < STR_TO_DATE(?, '%h:%i %p')))
        ORDER BY date DESC
      `, [today, today, currentTime]);

      let dataJSON = {
        status: 'success',
        data: results
      };

      return dataJSON;
    } catch (err) {
      throw err;
    }
  },

  getEventDetail: async (id) => {
    try {
      const [results] = await db.execute(`SELECT * FROM event WHERE id = ?`, [id]);
      let dataJSON = {
        status: 'success',
        data: results
      };

      return dataJSON;
    } catch (err) {
      throw err;
    }
  },

  getAllByPage: async (limit, pageNo, searchtxt) => {
    try {
      const offset = (pageNo - 1) * limit;

      let query = 'SELECT * FROM event';
      let queryParams = [];

      if (searchtxt) {
        const columns = ['name', 'about', 'date', 'shortAddress', 'st', 'et', 'host', 'oldPrice', 'price', 'mapUrl', 'location', 'country', 'state', 'city', 'maxMembers', 'type'];
        const searchConditions = columns.map(col => `${col} LIKE ?`).join(' OR ');
        query += ` WHERE ${searchConditions}`;
        queryParams = columns.map(() => `%${searchtxt}%`);
      }

      query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
      queryParams.push(limit, offset);

      const [results] = await db.execute(query, queryParams);

      const [totalCountResults] = await db.execute('SELECT COUNT(*) AS totalCount FROM event');
      const totalCount = totalCountResults[0].totalCount;

      return {
        status: 'success',
        data: results,
        totalCount: totalCount
      };
    } catch (err) {
      throw err;
    }
  },

  getPastEventsByPage: async (limit, pageNo, searchtxt) => {
    try {
      const offset = (pageNo - 1) * limit;
      const today = moment().format('YYYY-MM-DD');
      const currentTime = moment().format('hh:mm A');

      let query = `
          SELECT * FROM event
          WHERE (date < ? OR (date = ? AND STR_TO_DATE(st, '%h:%i %p') < STR_TO_DATE(?, '%h:%i %p')))
        `;
      let queryParams = [today, today, currentTime];

      if (searchtxt) {
        const columns = ['name', 'about', 'date', 'shortAddress', 'st', 'et', 'host', 'oldPrice', 'price', 'mapUrl', 'location', 'country', 'state', 'city', 'maxMembers', 'type'];
        const searchConditions = columns.map(col => `${col} LIKE ?`).join(' OR ');
        query += ` AND (${searchConditions})`;
        queryParams.push(...columns.map(() => `%${searchtxt}%`));
      }

      query += ' ORDER BY date DESC LIMIT ? OFFSET ?';
      queryParams.push(limit, offset);

      const [results] = await db.execute(query, queryParams);

      // Count total past events (for pagination)
      let countQuery = `
          SELECT COUNT(*) AS totalCount FROM event
          WHERE (date < ? OR (date = ? AND STR_TO_DATE(st, '%h:%i %p') < STR_TO_DATE(?, '%h:%i %p')))
        `;
      let countParams = [today, today, currentTime];

      if (searchtxt) {
        const columns = ['name', 'about', 'date', 'shortAddress', 'st', 'et', 'host', 'oldPrice', 'price', 'mapUrl', 'location', 'country', 'state', 'city', 'maxMembers', 'type'];
        const searchConditions = columns.map(col => `${col} LIKE ?`).join(' OR ');
        countQuery += ` AND (${searchConditions})`;
        countParams.push(...columns.map(() => `%${searchtxt}%`));
      }

      const [totalCountResults] = await db.execute(countQuery, countParams);
      const totalCount = totalCountResults[0].totalCount;

      return {
        status: 'success',
        data: results,
        totalCount: totalCount
      };
    } catch (err) {
      throw err;
    }
  },

  getUpcomingEventsByPage: async (limit, pageNo, searchtxt) => {
    try {
      const offset = (pageNo - 1) * limit;
      const today = moment().format('YYYY-MM-DD');
      const currentTime = moment().format('hh:mm A');

      let query = `
          SELECT * FROM event
          WHERE (date > ? OR (date = ? AND STR_TO_DATE(st, '%h:%i %p') > STR_TO_DATE(?, '%h:%i %p')))
        `;
      let queryParams = [today, today, currentTime];

      if (searchtxt) {
        const columns = ['name', 'about', 'date', 'shortAddress', 'st', 'et', 'host', 'oldPrice', 'price', 'mapUrl', 'location', 'country', 'state', 'city', 'maxMembers', 'type'];
        const searchConditions = columns.map(col => `${col} LIKE ?`).join(' OR ');
        query += ` AND (${searchConditions})`;
        queryParams.push(...columns.map(() => `%${searchtxt}%`));
      }

      query += ' ORDER BY date ASC LIMIT ? OFFSET ?';
      queryParams.push(limit, offset);

      const [results] = await db.execute(query, queryParams);

      // Count total upcoming events
      let countQuery = `
          SELECT COUNT(*) AS totalCount FROM event
          WHERE (date > ? OR (date = ? AND STR_TO_DATE(st, '%h:%i %p') > STR_TO_DATE(?, '%h:%i %p')))
        `;
      let countParams = [today, today, currentTime];

      if (searchtxt) {
        const columns = ['name', 'about', 'date', 'shortAddress', 'st', 'et', 'host', 'oldPrice', 'price', 'mapUrl', 'location', 'country', 'state', 'city', 'maxMembers', 'type'];
        const searchConditions = columns.map(col => `${col} LIKE ?`).join(' OR ');
        countQuery += ` AND (${searchConditions})`;
        countParams.push(...columns.map(() => `%${searchtxt}%`));
      }

      const [totalCountResults] = await db.execute(countQuery, countParams);
      const totalCount = totalCountResults[0].totalCount;

      return {
        status: 'success',
        data: results,
        totalCount: totalCount
      };
    } catch (err) {
      throw err;
    }
  },

  update: async (id, data) => {
    const sql = 'UPDATE event SET name = ?, about = ?, date = ?, shortAddress = ?, st = ?, et = ?, host = ?, oldPrice = ?, price = ?, mapUrl = ?, location = ?, country = ?, state = ?, city = ?, maxMembers = ?, type = ?, image = ?, imageId = ?, updated_at = NOW() WHERE id = ?';
    try {
      const [results] = await db.execute(sql, [data.name, data.about, data.date, data.shortAddress, data.st, data.et, data.host, data.oldPrice, data.price, data.mapUrl, data.location, data.country, data.state, data.city, data.maxMembers, data.type, data.image, data.imageId, id]);

      let dataJson = {
        status: 'success',
        data: results
      }
      return dataJson;
    } catch (err) {
      throw err;
    }
  },

  delete: async (id) => {
    try {
      const [results] = await db.execute('DELETE FROM event WHERE id = ?', [id]);

      return results;
    } catch (err) {
      throw err;
    }
  },
};

module.exports = event;
