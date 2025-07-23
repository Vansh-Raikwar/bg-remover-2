import 'dotenv/config';
import express from 'express'
import cors from 'cors'
import userRouter from './routes/userRoutes.js';
import connectDB from './configs/mongodb.js';
import imageRouter from './routes/imageRoutes.js';

// App Config
const PORT = process.env.PORT || 4000
const app = express();

// Connect to database
connectDB();
// CORS configuration for Vercel deployment
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'https://your-frontend-domain.com'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'token']
}));
app.use(express.json())


// API routes
app.use('/api/user',userRouter)
app.use('/api/image',imageRouter)

app.get('/', (req,res) => res.send("API Working"))

app.listen(PORT, () => console.log('Server running on port ' + PORT));
