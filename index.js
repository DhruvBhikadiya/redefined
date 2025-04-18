require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const fileuploadRoutes = require("./routes/fileuploadRoutes");

const usersRoutes = require('./routes/usersRoutes');
const rolesRoutes = require('./routes/rolesRoutes');
const permissionsRoutes = require('./routes/permissionsRoutes');
const pagesRoutes = require('./routes/pagesRoutes');
const pagescategoryRoutes = require('./routes/pagescategoryRoutes');
const siteconfigRoutes = require('./routes/siteconfigRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const industryRoutes = require('./routes/industryRoutes');
const areaRoutes = require('./routes/areaRoutes');
const menteeRoutes = require('./routes/menteeRoutes');
const mentorapplicationRoutes = require('./routes/mentorapplicationRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS options
const corsOptions = {
  origin: '*', // If you want any URL then use '*'
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};

// Use CORS middleware with options
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '50mb' }));

app.use("/api/file", fileuploadRoutes);

app.use('/api/users', usersRoutes);
app.use('/api/roles', rolesRoutes);
app.use('/api/permissions', permissionsRoutes);
app.use('/api/pages', pagesRoutes);
app.use('/api/pagescategory', pagescategoryRoutes);
app.use('/api/siteconfig', siteconfigRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/industry', industryRoutes);
app.use('/api/area', areaRoutes);
app.use('/api/mentee', menteeRoutes);
app.use('/api/mentorapplication', mentorapplicationRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});