// import express, { json } from "express";
// import authRoutes from "./routes/authRoutes.js";
// import scanRoutes from "./routes/scanRoutes.js";
// import webHookRoute from "./routes/webhookRoutes.js"
// import { Server as socketIO } from 'socket.io';
// import { createServer } from 'http';
// import cors from 'cors';
// import dotenv from "dotenv";
// dotenv.config();

// const app = express();
// app.use(json());
// app.use(cors());

// const port = 5000;
// const server = createServer(app);
// const io = new socketIO(server,{
//   cors: {
//     origin: '*', // Allow requests from all origins
//     methods: ["GET", "POST","PUT"], // Specify the allowed HTTP methods
//     credentials: true, // Allow credentials (e.g., cookies, authorization headers) to be sent with the requests
//   },
// });


// app.get("/test", (req, res) => {
//   res.json("Hello World!");
// });

// app.use("/api/v1", authRoutes);
// app.use("/api/v1/scan", scanRoutes);
// app.use("/copyleaks" ,webHookRoute(io))

// server.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });



import express, { json } from 'express';
import authRoutes from './routes/authRoutes.js';
import scanRoutes from './routes/scanRoutes.js';
import webHookRoutes from './routes/webhookRoutes.js';
import exportRoutes from './routes/exportRoutes.js';
// import completionWebhookRoute from './routes/completionWebhookRoutes.js';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server as socketIO } from 'socket.io';

import ngrok from 'ngrok'; // Import the ngrok package
dotenv.config();

const port = 5000;
// app.get("/test", (req, res) => {
//   res.json("Hello World!");
// });


const startServer = async () => {
  const app = express();
  app.use(json());
  app.use(cors());
  const httpServer = createServer(app);
  httpServer.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  const options = { 
    cors: {
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST","PUT"]
    }
  };
  const io = new socketIO(httpServer, options);

  app.use('/copyleaks', webHookRoutes(io));
  app.use("/api/v1", authRoutes);
  app.use("/api/v1/scan", scanRoutes);
  app.use("/api/v1/export" , exportRoutes)

};

startServer();


