import { connectDB } from "@/lib/dbConnect";
import UserAnswer from "@/models/userAnswer";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectDB()

        const { 
            interviewId,
            question,
            userAns, 
            correctAns,
            rating, 
            feedback 
        } = await req.json()

        const userAnswer = UserAnswer({ 
            interviewId,
            question,
            userAns, 
            correctAns,
            rating, 
            feedback 
        })

        const doc = await userAnswer.save()

        return NextResponse.json(
            {
                success: true,
                id: doc._id,
            },
            {
                status: 201
            }
        )
    } catch (error) {
        console.log('Error saving user answer: ', error)
    }
}

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url)
        const interviewId = searchParams.get('interviewId')
        const feedback = await UserAnswer.find({ interviewId })

        if(!feedback) {
            console.log('Interview feedback not found')

            return NextResponse.json(
                {
                    success: false,
                    message: 'Interview feedback not found'
                },
                {
                    status: 404
                }
            )
        }

        return NextResponse.json(
            {
                success: true,
                feedback: feedback,
            },
            {
                status: 200
            }
        )

    } catch (error) {
        console.log('Error fetching feedback details: ', error)

        return NextResponse.json(
            {
                success: false,
                message: error.message,
            },
            {
                status: 500,
            }
        )
    }
}