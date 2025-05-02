const db = require('../config/db');

const eventmember = {
  create: async (data) => {
    const sql = 'INSERT INTO eventmember (eventId, memberId, mentorId, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())';
    try {
      const [results] = await db.execute(sql, [data.name]);
      
      
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
      const [results] = await db.execute(`SELECT * FROM eventmember ORDER BY created_at DESC`);
      let dataJSON = {
        status: 'success',
        data: results
      };
      
      return dataJSON;
    } catch (err) {
      throw err;
    }
  },


  getAllByEvent: async (id) => {
    try {
      const [results] = await db.execute(`SELECT * FROM eventmember WHERE eventId = ?`, [id]);
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
    
        let query = 'SELECT * FROM eventmember';
        let queryParams = [];
    
        if (searchtxt) {
          const columns = ['eventId'];
          const searchConditions = columns.map(col => `${col} LIKE ?`).join(' OR ');
          query += ` WHERE ${searchConditions}`;
          queryParams = columns.map(() => `%${searchtxt}%`);
        }
    
        query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
        queryParams.push(limit, offset);
    
        const [results] = await db.execute(query, queryParams);
    
        const [totalCountResults] = await db.execute('SELECT COUNT(*) AS totalCount FROM eventmember');
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
    const sql = 'UPDATE eventmember SET eventId = ?, memberId = ?, mentorId = ?, updated_at = NOW() WHERE id = ?';
    try {
      const [results] = await db.execute(sql, [data.eventId, data.memberId, data.mentorId, id]);
      
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
      const [results] = await db.execute('DELETE FROM eventmember WHERE id = ?', [id]);
      
      return results;
    } catch (err) {
      throw err;
    }
  },
};

module.exports = eventmember;
