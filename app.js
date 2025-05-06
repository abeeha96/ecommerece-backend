const express = require('express'); // Importing Express
const app = express(); // Creating an Express app

const bodyParser = require('body-parser'); // To parse incoming request data
const mongoose = require('mongoose'); // For MongoDB connection
const cors = require('cors'); // To enable CORS for frontend-backend communication
require('dotenv/config'); // Loading environment variables from .env file

// Middleware
app.use(cors());
app.options('*', cors()); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse incoming JSON data

// Routes
const categoryRoutes = require('./routes/categories');
app.use('/api/categories', categoryRoutes);

// MongoDB connection
const CONNECTION_STRING = process.env.CONNECTION_STRING || "mongodb+srv://abeeharehman10:abeeha125581@cluster0.ltzih.mongodb.net/eshop";

// Connect to MongoDB
mongoose.connect(CONNECTION_STRING)
  .then(() => {
    console.log("✅ Database connected successfully!");

    // Server start
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server is running at http://localhost:${5000}`);
    });
  })
  .catch((error) => {
    console.error('❌ Database connection error:', error);
    process.exit(1); // Exit if database connection fails
  });

// Optional: This part is related to the 'p-limit' module, but it's not clear if it's necessary
let pLimit;
(async () => {
  const module = await import('p-limit');
  pLimit = module.default;
})();
