import mongoose from "mongoose";

const connectDB = async () => {
    try {
        // Check if MONGODB_URI is set
        if (!process.env.MONGODB_URI) {
            console.error('MONGODB_URI environment variable is not set');
            process.exit(1);
        }

        // Connection event listeners
        mongoose.connection.on('connected', () => {
            console.log("Database Connected Successfully");
        });

        mongoose.connection.on('error', (err) => {
            console.error('Database connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('Database disconnected');
        });

        // Connect with better options
        await mongoose.connect(`${process.env.MONGODB_URI}/bg-removal`, {
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
            socketTimeoutMS: 45000,
            useNewUrlParser: true, 
            useUnifiedTopology: true  // Close sockets after 45s of inactivity
        });

        console.log('MongoDB connection established');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error.message);
        process.exit(1);
    }
}

export default connectDB;
