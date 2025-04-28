const db = require('../config/db');

const area = {
  create: async (data) => {
    const sql = 'INSERT INTO area (name, created_at, updated_at) VALUES (?, NOW(), NOW())';
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
      const [results] = await db.execute(`SELECT id, name FROM area ORDER BY created_at DESC`);
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
    
        let query = 'SELECT * FROM area';
        let queryParams = [];
    
        if (searchtxt) {
          const columns = ['name'];
          const searchConditions = columns.map(col => `${col} LIKE ?`).join(' OR ');
          query += ` WHERE ${searchConditions}`;
          queryParams = columns.map(() => `%${searchtxt}%`);
        }
    
        query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
        queryParams.push(limit, offset);
    
        const [results] = await db.execute(query, queryParams);
    
        const [totalCountResults] = await db.execute('SELECT COUNT(*) AS totalCount FROM area');
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
    const sql = 'UPDATE area SET name = ?, updated_at = NOW() WHERE id = ?';
    try {
      const [results] = await db.execute(sql, [data.name, id]);
      
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
      const [results] = await db.execute('DELETE FROM area WHERE id = ?', [id]);
      
      return results;
    } catch (err) {
      throw err;
    }
  },
};

module.exports = area;
