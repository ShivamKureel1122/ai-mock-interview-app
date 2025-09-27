import mongoose from 'mongoose'

const mockInterviewSchema = new mongoose.Schema(
    {
        jobRole: {
            type: String,
            required: true,
        },
        jobDes: {
            type: String,
            required: true,
        },
        experience: {
            type: Number,
            required: true,
        },
        mockResp: {
            type: String,
            required: true,
        },
        skills: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
        },
        isCompleted: {
            type: Boolean,
            default: false
        }
    }, 
    {
        timestamps: true,
    }
)

const MockInterview = mongoose.models.MockInterview || mongoose.model("MockInterview", mockInterviewSchema)

export default MockInterview