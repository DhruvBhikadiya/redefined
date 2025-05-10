const db = require('../config/db');
const { sendEmail } = require('../utils/sendEmail');
const emaillog = require('./emaillogModel');

const eventmember = {
  create: async (data) => {
    const sql = 'INSERT INTO eventmember (eventId, memberId, mentorId, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())';
    try {
      const [results] = await db.execute(sql, [data.eventId,data.memberId,data.mentorId]);
      
      let memberData;

      if(data.mentorId){
        [memberData] = await db.execute('SELECT * FROM member WHERE id = ?',[data.mentorId]);
      }else{
        [memberData] = await db.execute('SELECT * FROM member WHERE id = ?',[data.memberId]);
      }
      const [eventData] = await db.execute('SELECT * FROM event WHERE id = ?',[data.eventId]);

      const [templates] = await db.execute('SELECT * FROM emailtemplate');

        let selectedTemplate = templates.find(f => f.name == "Event Join");

        let sendingContent = selectedTemplate.content.replaceAll('[eventName]',eventData[0].name).replaceAll('[eventDate]',eventData[0].date).replaceAll('[eventHost]',eventData[0].host).replaceAll('[eventLocation]',eventData[0].location).replaceAll('[eventTime]',eventData[0].st+'-'+eventData[0].et);
  
        const emailData = {
          to: memberData[0].email,
          subject: selectedTemplate.subject,
          html: sendingContent
        };
  
        await sendEmail(emailData);
  
        let maillogReq = {
          recipient : emailData.to,
          message : emailData.html,
          subject : emailData.subject
        }
  
        emaillog.create(maillogReq, (err, result) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Email sent but failed to log' });
          }
          res.status(200).json({ message: 'Email sent & logged successfully!' });
        });
      
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
      const [results] = await db.execute(
        `SELECT 
           eventmember.*, 
           COALESCE(m1.fullName, '') AS memberName,
           COALESCE(m2.fullName, '') AS mentorName,
           event.name
         FROM eventmember
         LEFT JOIN member m1 ON eventmember.memberId = m1.id
         LEFT JOIN member m2 ON eventmember.mentorId = m2.id
         LEFT JOIN event ON eventmember.eventId = event.id
         WHERE eventmember.eventId = ?`,
        [id]
      );
  
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
