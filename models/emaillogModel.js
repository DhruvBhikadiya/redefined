const db = require('../config/db');

const emaillog = {
  create: async (data, callback) => {
    const sql = 'INSERT INTO email_logs (recipient, subject, message , created_at) VALUES (?, ?, ?, NOW())';
    db.query(sql, [data.recipient, data.subject, data.message], callback);
  },

  getAll: async () => {
    try {
      const [results] = await db.execute(`SELECT * FROM email_logs ORDER BY created_at DESC`);
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
    
        let query = 'SELECT * FROM email_logs';
        let queryParams = [];
    
        if (searchtxt) {
          const columns = ['recipient','subject'];
          const searchConditions = columns.map(col => `${col} LIKE ?`).join(' OR ');
          query += ` WHERE ${searchConditions}`;
          queryParams = columns.map(() => `%${searchtxt}%`);
        }
    
        query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
        queryParams.push(limit, offset);
    
        const [results] = await db.execute(query, queryParams);
    
        const [totalCountResults] = await db.execute('SELECT COUNT(*) AS totalCount FROM email_logs');
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
    const sql = 'UPDATE email_logs SET recipient = ?, subject = ?, message = ?, updated_at = NOW() WHERE id = ?';
    try {
      const [results] = await db.execute(sql, [data.recipient, data.subject, data.message, id]);
      
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
      const [results] = await db.execute('DELETE FROM email_logs WHERE id = ?', [id]);
      
      return results;
    } catch (err) {
      throw err;
    }
  },
};

module.exports = emaillog;
