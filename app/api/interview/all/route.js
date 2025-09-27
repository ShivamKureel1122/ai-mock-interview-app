import MockInterview from "@/models/mockInterview";
import { connectDB } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET(req) {
    try { 
        await connectDB()

        const { searchParams } = new URL(req.url)
        const email = searchParams.get('email')
        console.log('Email-Id: ', email)

        const interviewList = await MockInterview.find({ email })
        console.log('Interviews: ', interviewList)

        if(!interviewList) {
            console.log('No interview found')
            return NextResponse.json(
                {
                    message: 'No interview found'
                },
            )
        }

        return NextResponse.json(
            {
                success: true,
                interviewList: interviewList,
            },
            {
                status: 200
            }
        )

    } catch (error) {
        console.log('Error fetching interviews: ', error.message)

        return NextResponse.json(
            {
                success: false,
                message: 'Error fetching interviews',
            },
            {
                status: 500,
            }
        )
    }
}