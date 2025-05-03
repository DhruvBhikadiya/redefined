const db = require('../config/db');

const mentorapplication = {
    create: async (data) => {
        const sql = 'INSERT INTO mentorapplication (fullName, province, city, country, livingStatus, linkedin, phone, email, password, roleAtCompany, employer, yearsOfExperience, experienceIndustry, professionalBio, headerIntro, whyJoin, areas, mentees, menteesLimit, mentoringTimePerMonth, participateBehaviour, shareWithMentees, successMeasure, impactfulWay, about, isApproved, isRejected, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())';
        try {
            const [results] = await db.execute(sql, [data.fullName, data.province, data.city, data.country, data.livingStatus, data.linkedin, data.phone, data.email, data.password,data.roleAtCompany, data.employer, data.yearsOfExperience,JSON.stringify(data.experienceIndustry),data.professionalBio,data.headerIntro,data.whyJoin,JSON.stringify(data.areas),JSON.stringify(data.mentees),data.menteesLimit,data.mentoringTimePerMonth,data.participateBehaviour,data.shareWithMentees,data.successMeasure,data.impactfulWay,data.about,false,false]);

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
            const [results] = await db.execute(`SELECT * FROM mentorapplication ORDER BY created_at DESC`);

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
      
          let query = 'SELECT * FROM mentorapplication';
          let queryParams = [];
      
          if (searchtxt) {
            const columns = ['fullName','province','city','country','livingStatus','linkedin','phone','email','password','roleAtCompany','employer','yearsOfExperience','professionalBio','headerIntro','whyJoin','menteesLimit','mentoringTimePerMonth','participateBehaviour','shareWithMentees','successMeasure','impactfulWay','about'];
            const searchConditions = columns.map(col => `${col} LIKE ?`).join(' OR ');
            query += ` WHERE ${searchConditions}`;
            queryParams = columns.map(() => `%${searchtxt}%`);
          }
      
          query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
          queryParams.push(limit, offset);
      
          const [results] = await db.execute(query, queryParams);
      
          const [totalCountResults] = await db.execute('SELECT COUNT(*) AS totalCount FROM mentorapplication');
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
        const sqlUpdate = 'UPDATE mentorapplication SET fullName = ?, province = ?, city = ?, country = ?, livingStatus = ?, linkedin = ?, phone = ?, email = ?, password = ?, roleAtCompany = ?, employer = ?, yearsOfExperience = ?, experienceIndustry = ?, professionalBio = ?, headerIntro = ?, whyJoin = ?, areas = ?, mentees = ?, menteesLimit = ?, mentoringTimePerMonth = ?, participateBehaviour = ?, shareWithMentees = ?, successMeasure = ?, impactfulWay = ?, about = ?, isApproved = ?, isRejected = ?, updated_at = NOW() WHERE id = ?';
        try {
            const [results] = await db.execute(sqlUpdate, [data.fullName, data.province, data.city, data.country, data.livingStatus, data.linkedin, data.phone, data.email, data.password,data.roleAtCompany, data.employer, data.yearsOfExperience,JSON.stringify(data.experienceIndustry),data.professionalBio,data.headerIntro,data.whyJoin,JSON.stringify(data.areas),JSON.stringify(data.mentees),data.menteesLimit,data.mentoringTimePerMonth,data.participateBehaviour,data.shareWithMentees,data.successMeasure,data.impactfulWay,data.about,data.isApproved,data.isRejected, id]);
            

            let dataJSON = {
                status: 'success',
                data: results
            }
    
            return dataJSON;
        } catch (err) {
            throw err;
        }
    },
    approve: async (id, data) => {
        const sqlUpdate = 'UPDATE mentorapplication SET isApproved = ?, updated_at = NOW() WHERE id = ?';
        try {
            const [results] = await db.execute(sqlUpdate, [data.isApproved, id]);

            const applicationDatasql = 'SELECT * FROM mentorapplication WHERE id = ?';
            const [applicationData] = await db.execute(applicationDatasql, [id]);

            const sql = 'INSERT INTO member (fullName, province, city, country, livingStatus, linkedin, phone, email, password, men_roleAtCompany, men_employer, men_yearsOfExperience, men_experienceIndustry, men_professionalBio, men_headerIntro, men_whyJoin, men_areas, men_mentees, men_menteesLimit, men_mentoringTimePerMonth, men_participateBehaviour, men_shareWithMentees, men_successMeasure, men_impactfulWay, men_about, isMentor, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())';

            const [mentorResults] = await db.execute(sql, [applicationData[0].fullName, applicationData[0].province, applicationData[0].city, applicationData[0].country, applicationData[0].livingStatus, applicationData[0].linkedin, applicationData[0].phone, applicationData[0].email, applicationData[0].password,applicationData[0].roleAtCompany, applicationData[0].employer, applicationData[0].yearsOfExperience,applicationData[0].experienceIndustry,applicationData[0].professionalBio,applicationData[0].headerIntro,applicationData[0].whyJoin,applicationData[0].areas,applicationData[0].mentees,applicationData[0].menteesLimit,applicationData[0].mentoringTimePerMonth,applicationData[0].participateBehaviour,applicationData[0].shareWithMentees,applicationData[0].successMeasure,applicationData[0].impactfulWay,applicationData[0].about,true]);
            

            let dataJSON = {
                status: 'success',
                data: results
            }
    
            return dataJSON;
        } catch (err) {
            throw err;
        }
    },
    reject: async (id, data) => {
        const sqlUpdate = 'UPDATE mentorapplication SET isRejected = ?, updated_at = NOW() WHERE id = ?';
        try {
            const [results] = await db.execute(sqlUpdate, [data.isRejected, id]);
            

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
            const [results] = await db.execute('DELETE FROM mentorapplication WHERE id = ?', [id]);
            return results;
        } catch (err) {
            throw err;
        }
    },  
    
    findByEmail: async (email) => {
        const sql = 'SELECT id, email FROM mentorapplication WHERE email = ?';
        try {

            const [results] = await db.execute(sql, [email]);

            if (results.length > 0) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            throw err;
        }
    },
};

module.exports = mentorapplication;
