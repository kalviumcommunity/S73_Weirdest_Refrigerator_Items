import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors'; // Import cors package
import userRoutes from './routes/routes.js';
import entityRoutes from './routes/entityRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const URL = process.env.URL;

app.use(express.json());
app.use(cors()); // Enable CORS for all requests

app.use(
    cors({
      origin: "http://localhost:5173", // Allow frontend access
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed methods
      allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    })
  );
  

// Ping Route
app.get('/ping', (req, res) => {
    res.json({
        message: "Pong",
        status: "success",
    });
});

let flag = false;

// Connect to MongoDB
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

// Welcome Route
app.get('/', (req, res) => {
    res.json({
        message: "Hello, Welcome to ASAP Project!",
        DB_status: flag
    });
});

// Routes
app.use('/api/user', userRoutes);
app.use('/api/entities', entityRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});
