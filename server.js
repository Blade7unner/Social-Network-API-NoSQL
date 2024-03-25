// Require necessary packages
const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs'); // Import the fs module for directory listing
const userRoutes = require('./routes/user-routes'); // Adjusted path
const thoughtRoutes = require('./routes/thought-routes'); // Adjusted path
const reactionRoutes = require('./routes/reaction-routes'); // Adjusted path

// Set up Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-api')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the application if unable to connect to MongoDB
  });

// Log the contents of the 'routes' directory
console.log(fs.readdirSync('./routes'));

// Define routes
app.use(userRoutes);
app.use(thoughtRoutes); // Include thoughtRoutes
app.use(reactionRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
