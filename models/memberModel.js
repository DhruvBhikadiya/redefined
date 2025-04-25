const db = require('../config/db');

const member = {
    create: async (data) => {
        const sql = 'INSERT INTO member (fullName, password, email, phone, province, city, country, livingStatus, linkedin, professionalBio, headerIntro, yearsOfExperience, workStatus, experienceIndustry, previousExperience, employer, roleAtCompany, futureIndustries, futureRole, futureCompany, jobChallenges, lookingToConnect, interesstedTopic, joiningReason, supportReason, elseSupportReason, otherDetail, stripe_customer_id, stripe_subscription_id, subscription_status, last_payment_date, next_payment_due, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())';
        try {
            const [results] = await db.execute(sql, [data.fullName, data.password, data.email, data.phone, data.province, data.city, data.country, data.livingStatus, data.linkedin,data.professionalBio, data.headerIntro, data.yearsOfExperience,data.workStatus,JSON.stringify(data.experienceIndustry),data.previousExperience,data.employer,data.roleAtCompany,JSON.stringify(data.futureIndustries),data.futureRole,data.futureCompany,JSON.stringify(data.jobChallenges),JSON.stringify(data.lookingToConnect),JSON.stringify(data.interesstedTopic),data.joiningReason,data.supportReason,data.elseSupportReason,data.otherDetail,data.stripe_customer_id,data.stripe_subscription_id,data.subscription_status,data.last_payment_date,data.next_payment_due]);

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
            const [results] = await db.execute(`SELECT * FROM member ORDER BY created_at DESC`);

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
      
          let query = 'SELECT * FROM member';
          let queryParams = [];
      
          if (searchtxt) {
            const columns = ['fullName','password','email','phone','province','city','country','livingStatus','linkedin','professionalBio','headerIntro','yearsOfExperience','workStatus','experienceIndustry','previousExperience','employer','roleAtCompany','futureIndustries','futureRole','futureCompany','jobChallenges','lookingToConnect','interesstedTopic','joiningReason','supportReason','elseSupportReason','otherDetail',];
            const searchConditions = columns.map(col => `${col} LIKE ?`).join(' OR ');
            query += ` WHERE ${searchConditions}`;
            queryParams = columns.map(() => `%${searchtxt}%`);
          }
      
          query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
          queryParams.push(limit, offset);
      
          const [results] = await db.execute(query, queryParams);
      
          const [totalCountResults] = await db.execute('SELECT COUNT(*) AS totalCount FROM member');
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
        const sqlUpdate = 'UPDATE member SET fullName = ?, password = ?, email = ?, phone = ?, province = ?, city = ?, country = ?, livingStatus = ?, linkedin = ?, professionalBio = ?, headerIntro = ?, yearsOfExperience = ?, workStatus = ?, experienceIndustry = ?, previousExperience = ?, employer = ?, roleAtCompany = ?, futureIndustries = ?, futureRole = ?, futureCompany = ?, jobChallenges = ?, lookingToConnect = ?, interesstedTopic = ?, joiningReason = ?, supportReason = ?, elseSupportReason = ?, otherDetail = ?, updated_at = NOW() WHERE id = ?';
        try {
            const [results] = await db.execute(sqlUpdate, [data.fullName, data.password, data.email, data.phone, data.province, data.city, data.country, data.livingStatus, data.linkedin,data.professionalBio, data.headerIntro, data.yearsOfExperience,JSON.stringify(data.workStatus),data.experienceIndustry,data.previousExperience,data.employer,JSON.stringify(data.roleAtCompany),JSON.stringify(data.futureIndustries),data.futureRole,data.futureCompany,data.jobChallenges,data.lookingToConnect,data.interesstedTopic,data.joiningReason,data.supportReason,data.elseSupportReason,data.otherDetail, id]);
            

            let dataJSON = {
                status: 'success',
                data: results
            }
    
            return dataJSON;
        } catch (err) {
            throw err;
        }
    },
    delete: async (id) => {
        try {
            const [results] = await db.execute('DELETE FROM member WHERE id = ?', [id]);
            return results;
        } catch (err) {
            throw err;
        }
    },  
    
    findByEmail: async (email) => {
        const sql = 'SELECT id, email FROM member WHERE email = ?';
        try {

            const [results] = await db.execute(sql, [email]);

            console.log('-----',results);
            

            if (results.length > 0) {
                return {
                    status: 'success',
                    data: results[0]
                };
            } else {
                return false;
            }
        } catch (err) {
            throw err;
        }
    },

    updateSubscription: (email, data, callback) => {
        const sql = 'UPDATE member SET ? WHERE email = ?';
        db.query(sql, [data, email], callback);
    },    

    getByCustomerId: (customerId, callback) => {
        const sql = 'SELECT * FROM member WHERE stripe_customer_id = ?';
        db.query(sql, [customerId], callback);
    }    
};

module.exports = member;
