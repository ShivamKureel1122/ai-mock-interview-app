import MockInterview from "@/models/mockInterview"
import { NextResponse } from "next/server"
import { connectDB } from "@/lib/dbConnect"

export async function POST(req, res) {
    try {
        await connectDB()

        const { interviewId } = await req.json()
        const interviewData = await MockInterview.findById(interviewId)

        if(!interviewData) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Interview not found',
                },
                {
                    status: 404,
                }
            )
        }

        interviewData.isCompleted = true
        await interviewData.save()

        return NextResponse.json(
            {
                success: true,
                message: 'Interview marked as completed'
            }, 
            {
                status: 200,
            }
        )

    } catch (error) {
        console.log('Error marking interview as completed: ', error.message)
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