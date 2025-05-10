const db = require('../config/db');
const { sendEmail } = require('../utils/sendEmail');
const emaillog = require('./emaillogModel');

const memberapplication = {
    create: async (data) => {
        const sql = 'INSERT INTO memberapplication (fullName, password, email, phone, province, city, country, livingStatus, linkedin, professionalBio, headerIntro, yearsOfExperience, workStatus, experienceIndustry, previousExperience, employer, roleAtCompany, futureGoal, futureCareer, futureIndustries, futureRole, futureCompany, futureWhy, jobChallenges, lookingToConnect, interesstedTopic, joiningReason, supportReason, elseSupportReason, otherDetail, stripe_customer_id, stripe_subscription_id, subscription_status, last_payment_date, next_payment_due, eventCredit, isApproved, isRejected, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())';
        try {
            const [results] = await db.execute(sql, [
                data.fullName ?? null,
                data.password ?? null,
                data.email ?? null,
                data.phone ?? null,
                data.province ?? null,
                data.city ?? null,
                data.country ?? null,
                data.livingStatus ?? null,
                data.linkedin ?? null,
                data.professionalBio ?? null,
                data.headerIntro ?? null,
                data.yearsOfExperience ?? null,
                data.workStatus ?? null,
                JSON.stringify(data.experienceIndustry ?? []),
                data.previousExperience ?? null,
                data.employer ?? null,
                data.roleAtCompany ?? null,
                data.futureGoal ?? null,
                data.futureCareer ?? null,
                JSON.stringify(data.futureIndustries ?? []),
                data.futureRole ?? null,
                data.futureCompany ?? null,
                data.futureWhy ?? null,
                JSON.stringify(data.jobChallenges ?? []),
                JSON.stringify(data.lookingToConnect ?? []),
                JSON.stringify(data.interesstedTopic ?? []),
                data.joiningReason ?? null,
                data.supportReason ?? null,
                data.elseSupportReason ?? null,
                data.otherDetail ?? null,
                data.stripe_customer_id ?? null,
                data.stripe_subscription_id ?? null,
                data.subscription_status ?? null,
                data.last_payment_date ?? null,
                data.next_payment_due ?? null,
                1,
                false,
                false
            ]);

            let dataJSON = {
                status: 'success',
                data: results
            }

            const [templates] = await db.execute('SELECT * FROM emailtemplate');

            let selectedTemplate = templates.find(f => f.name == "Member Apply");

            let sendingContent = selectedTemplate.content;
      
            const emailData = {
              to: data.email,
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

            return dataJSON;
        } catch (err) {
            throw err;
        }
    },

    getAll: async () => {
        try {
            const [results] = await db.execute(`SELECT * FROM memberapplication ORDER BY created_at DESC`);

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
      
          let query = 'SELECT * FROM memberapplication';
          let queryParams = [];
      
          if (searchtxt) {
            const columns = ['fullName', 'password', 'email', 'phone', 'province', 'city', 'country', 'livingStatus', 'linkedin', 'professionalBio', 'headerIntro', 'yearsOfExperience', 'workStatus', 'experienceIndustry', 'previousExperience', 'employer', 'roleAtCompany', 'futureGoal', 'futureCareer', 'futureIndustries', 'futureRole', 'futureCompany', 'futureWhy', 'jobChallenges', 'lookingToConnect', 'interesstedTopic', 'joiningReason', 'supportReason', 'elseSupportReason', 'otherDetail'];
            const searchConditions = columns.map(col => `${col} LIKE ?`).join(' OR ');
            query += ` WHERE ${searchConditions}`;
            queryParams = columns.map(() => `%${searchtxt}%`);
          }
      
          query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
          queryParams.push(limit, offset);
      
          const [results] = await db.execute(query, queryParams);
      
          const [totalCountResults] = await db.execute('SELECT COUNT(*) AS totalCount FROM memberapplication');
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
    approve: async (id, data) => {
        const sqlUpdate = 'UPDATE memberapplication SET isApproved = ?, updated_at = NOW() WHERE id = ?';
        try {
            const [results] = await db.execute(sqlUpdate, [data.isApproved, id]);

            const applicationDatasql = 'SELECT * FROM memberapplication WHERE id = ?';
            const [applicationData] = await db.execute(applicationDatasql, [id]);

            const sql = 'INSERT INTO member (fullName, password, email, phone, province, city, country, livingStatus, linkedin, professionalBio, headerIntro, yearsOfExperience, workStatus, experienceIndustry, previousExperience, employer, roleAtCompany, futureGoal, futureCareer, futureIndustries, futureRole, futureCompany, futureWhy, jobChallenges, lookingToConnect, interesstedTopic, joiningReason, supportReason, elseSupportReason, otherDetail, stripe_customer_id, stripe_subscription_id, subscription_status, last_payment_date, next_payment_due, eventCredit, isMentor, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())';

            const [mentorResults] = await db.execute(sql, [applicationData[0].fullName, applicationData[0].password, applicationData[0].email, applicationData[0].phone, applicationData[0].province, applicationData[0].city, applicationData[0].country, applicationData[0].livingStatus, applicationData[0].linkedin, applicationData[0].professionalBio, applicationData[0].headerIntro, applicationData[0].yearsOfExperience, applicationData[0].workStatus, applicationData[0].experienceIndustry, applicationData[0].previousExperience, applicationData[0].employer, applicationData[0].roleAtCompany, applicationData[0].futureGoal, applicationData[0].futureCareer, applicationData[0].futureIndustries, applicationData[0].futureRole, applicationData[0].futureCompany, applicationData[0].futureWhy, applicationData[0].jobChallenges, applicationData[0].lookingToConnect, applicationData[0].interesstedTopic, applicationData[0].joiningReason, applicationData[0].supportReason, applicationData[0].elseSupportReason, applicationData[0].otherDetail, applicationData[0].stripe_customer_id, applicationData[0].stripe_subscription_id, applicationData[0].subscription_status, applicationData[0].last_payment_date, applicationData[0].next_payment_due, applicationData[0].eventCredit, false]);
            

            let dataJSON = {
                status: 'success',
                data: results
            }
            
            const [templates] = await db.execute('SELECT * FROM emailtemplate');

            let selectedTemplate = templates.find(f => f.name == "Member Approve");

            let sendingContent = selectedTemplate.content;
      
            const emailData = {
              to: applicationData[0].email,
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
    
            return dataJSON;
        } catch (err) {
            throw err;
        }
    },
    reject: async (id, data) => {
        const sqlUpdate = 'UPDATE memberapplication SET isRejected = ?, updated_at = NOW() WHERE id = ?';
        try {
            const [results] = await db.execute(sqlUpdate, [data.isRejected, id]);
            
            const applicationDatasql = 'SELECT * FROM memberapplication WHERE id = ?';
            const [applicationData] = await db.execute(applicationDatasql, [id]);

            let dataJSON = {
                status: 'success',
                data: results
            }

            const [templates] = await db.execute('SELECT * FROM emailtemplate');

            let selectedTemplate = templates.find(f => f.name == "Member Reject");

            let sendingContent = selectedTemplate.content;
      
            const emailData = {
              to: applicationData[0].email,
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
    
            return dataJSON;
        } catch (err) {
            throw err;
        }
    },

    delete: async (id) => {
        try {
            const [results] = await db.execute('DELETE FROM memberapplication WHERE id = ?', [id]);
            return results;
        } catch (err) {
            throw err;
        }
    },
    
    findByEmail: async (email) => {
        const sql = 'SELECT id, email FROM memberapplication WHERE email = ?';
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
    findByPhone: async (phone) => {
        const sql = 'SELECT id, phone FROM memberapplication WHERE phone = ?';
        try {

            const [results] = await db.execute(sql, [phone]);

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

module.exports = memberapplication;