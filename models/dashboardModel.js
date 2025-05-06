const db = require('../config/db');

const Dashboard = {
  superadminDashboard: async () => {
    try {
      const [pages] = await db.execute(`SELECT COUNT(*) AS row_count FROM users`);
      const [pagescategory] = await db.execute(`SELECT COUNT(*) AS row_count FROM users`);
      const [roles] = await db.execute(`SELECT COUNT(*) AS row_count FROM users`);
      const [users] = await db.execute(`SELECT COUNT(*) AS row_count FROM users`);
      const [industry] = await db.execute(`SELECT COUNT(*) AS row_count FROM industry`);
      const [area] = await db.execute(`SELECT COUNT(*) AS row_count FROM area`);
      const [mentee] = await db.execute(`SELECT COUNT(*) AS row_count FROM mentee`);

      let dashboardJson = [
        {
          totalUsers: users[0].row_count,
          totalPages: pages[0].row_count,
          totalPageCategories: pagescategory[0].row_count,
          totalRoles: roles[0].row_count,
          totalIndustry: industry[0].row_count,
          totalArea: area[0].row_count,
          totalMentee: mentee[0].row_count,
        }
      ]

      let dataJSON = {
        status: 'success',
        data: dashboardJson
      };
      return dataJSON;
    } catch (err) {
      throw err;
    }
  },
};

module.exports = Dashboard;