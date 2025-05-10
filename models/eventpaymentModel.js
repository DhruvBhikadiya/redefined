const db = require('../config/db');

const eventpayment = {
  create: async (data) => {
    const sql = 'INSERT INTO eventpayment (email, memberId, eventId, payment_intent_id, amount, currency, status, note, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())';
    try {
      const [results] = await db.execute(sql, [data.email, data.memberId, data.eventId, data.payment_intent_id, data.amount, data.currency, data.status, data.note]);

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
      const [results] = await db.execute(`SELECT * FROM eventpayment ORDER BY created_at DESC`);
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
    
        let query = 'SELECT * FROM eventpayment';
        let queryParams = [];
    
        if (searchtxt) {
          const columns = ['email','memberId','eventId','payment_intent_id','amount','currency','status','note',];
          const searchConditions = columns.map(col => `${col} LIKE ?`).join(' OR ');
          query += ` WHERE ${searchConditions}`;
          queryParams = columns.map(() => `%${searchtxt}%`);
        }
    
        query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
        queryParams.push(limit, offset);
    
        const [results] = await db.execute(query, queryParams);
    
        const [totalCountResults] = await db.execute('SELECT COUNT(*) AS totalCount FROM eventpayment');
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
    const sql = 'UPDATE eventpayment SET email = ?, memberId = ?, eventId = ?, payment_intent_id = ?, amount = ?, currency = ?, status = ?, note = ? WHERE id = ?';
    try {
      const [results] = await db.execute(sql, [data.email, data.memberId, data.eventId, data.payment_intent_id, data.amount, data.currency, data.status, data.note, id]);
      
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
      const [results] = await db.execute('DELETE FROM eventpayment WHERE id = ?', [id]);
      
      return results;
    } catch (err) {
      throw err;
    }
  },
};

module.exports = eventpayment;
