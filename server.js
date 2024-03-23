// Require necessary packages
const express = require('express');
const mongoose = require('mongoose');

// Set up Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-api', {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Log MongoDB connection status
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

// Define routes
app.use(require('./routes'));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
