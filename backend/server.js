import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

import userRoutes from './routes/userRoutes.js';
import entityRoutes from './routes/entityRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const URL = process.env.URL;

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get('/ping', (req, res) => {
  res.json({
    message: "Pong",
    status: "success",
  });
});

let flag = false;

const connectDB = async () => {
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to DB!");
    flag = true;
  } catch (error) {
    console.error(`Error connecting to DB: ${error.message}`);
    process.exit(1);
  }
};
connectDB();

app.get('/', (req, res) => {
  res.json({
    message: "Hello, Welcome to ASAP Project!",
    DB_status: flag,
  });
});

app.use('/api/users', userRoutes);
app.use('/api/entities', entityRoutes);

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
