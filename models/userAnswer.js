import mongoose from "mongoose";

const userAnswerSchema = new mongoose.Schema(
    {
        interviewId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'MockInterview',
            required: true,
        },
        question: {
            type: String,
            required: true,
        },
        userAns: {
            type: String,
            required: true,
        },
        correctAns: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
        },
        feedback: {
            type: String,
            required: true,
        }
    }, 
    {
        timestamps: true,
    }
)

const UserAnswer = mongoose.models.UserAnswer || mongoose.model("UserAnswer", userAnswerSchema)

export default UserAnswer