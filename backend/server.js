const CFG = require("./src/config/config");
const app = require("./src/config/app");
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const schema = require("./src/graphql/schema");




app.use(express.json());

const connectToMongo = require('./src/config/db');

connectToMongo();

// Basic route for testing
// app.get('/', (req, res) => {
//     res.send('The Backend is Running!');
// });

// // Start the server
// app.listen(CFG.PORT, () => {
//     console.log(`Server is running on http://localhost:${CFG.PORT}`);
// });

// Initialize ApolloServer
const startApolloServer = async () => {
    const server = new ApolloServer({ schema });
  
    await server.start(); // Ensure the server starts
    server.applyMiddleware({ app }); // Integrate with Express
  
    app.listen(CFG.SERVER_PORT, async () => {
      await connectToMongo(); // Connect to MongoDB before starting the server
      console.log(`Server is running at http://localhost:${CFG.SERVER_PORT}${server.graphqlPath}`);
    });
  };
  
  // Start the ApolloServer
  startApolloServer();