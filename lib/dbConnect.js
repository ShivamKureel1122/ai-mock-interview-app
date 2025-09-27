import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI)
        console.log('MongoDB connected...')
    } catch (error) {
        console.log(`Error connecting to MongoDB: ${error.message}`)
        process.exit(1)
    }
}