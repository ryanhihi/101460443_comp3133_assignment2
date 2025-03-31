const express = require("express");
const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server-express");
const schema = require('./src/graphql/schema')
require('dotenv').config();


const SERVER_PORT = 5000;
const MONGO_URI = "mongodb+srv://willbluemoon99:EmCK6UKBZx7vVQJm@ryan.nz0hm.mongodb.net/comp3133_101460443_assignment1?retryWrites=true&w=majority&appName=Ryan";

// Initialize Express app
const app = express();

// Connect to MongoDB
const connectDB = async () => {
  try {
    console.log("Attempting to connect to MongoDB...");
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

// Initialize ApolloServer
const startApolloServer = async () => {
  const server = new ApolloServer({ schema });

  await server.start(); // Ensure the server starts
  server.applyMiddleware({ app }); // Integrate with Express

  app.listen(SERVER_PORT, async () => {
    await connectDB(); // Connect to MongoDB before starting the server
    console.log(`Server is running at http://localhost:${SERVER_PORT}${server.graphqlPath}`);
  });
};

// Start the ApolloServer
startApolloServer();
