const express = require('express');
const schoolRoutes = require('./src/routes/schoolRoutes');

const app = express();
app.use(express.json());

app.use('/api', schoolRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});