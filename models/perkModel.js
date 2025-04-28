const db = require('../config/db');

const perk = {
  create: async (data) => {
    const sql = 'INSERT INTO perk (title, description, created_at, updated_at) VALUES (?, ?, NOW(), NOW())';
    try {
      const [results] = await db.execute(sql, [data.title, data.description]);
      
      
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
      const [results] = await db.execute(`SELECT * FROM perk ORDER BY created_at DESC`);
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
    
        let query = 'SELECT * FROM perk';
        let queryParams = [];
    
        if (searchtxt) {
          const columns = ['title','description',];
          const searchConditions = columns.map(col => `${col} LIKE ?`).join(' OR ');
          query += ` WHERE ${searchConditions}`;
          queryParams = columns.map(() => `%${searchtxt}%`);
        }
    
        query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
        queryParams.push(limit, offset);
    
        const [results] = await db.execute(query, queryParams);
    
        const [totalCountResults] = await db.execute('SELECT COUNT(*) AS totalCount FROM perk');
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
    const sql = 'UPDATE perk SET title = ?, description = ?, updated_at = NOW() WHERE id = ?';
    try {
      const [results] = await db.execute(sql, [data.title, data.description, id]);
      
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
      const [results] = await db.execute('DELETE FROM perk WHERE id = ?', [id]);
      
      return results;
    } catch (err) {
      throw err;
    }
  },
};

module.exports = perk;
