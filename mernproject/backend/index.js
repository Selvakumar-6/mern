// server.js
const express = require('express');
const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());

// Default route
app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});