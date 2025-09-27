import { connectDB } from "@/lib/dbConnect";
import MockInterview from "@/models/mockInterview";
import { NextResponse } from "next/server";


export async function POST(req) {
    try {
        await connectDB()

        const { jobRole, jobDes, experience, email, aiResponse, skills } = await req.json()
        // console.log('years: ', years)
        const interview = new MockInterview({
            jobRole,
            jobDes,
            experience,
            mockResp: aiResponse,
            email,
            skills,
        })

        console.log("Interview details: ", interview)
        const interviewDoc = await interview.save()
        console.log('Interview saved to database')
        console.log(interviewDoc)

        return NextResponse.json(
            {
                success: true,
                id: interviewDoc._id
            },
            {
                status: 201,
            }
        )
    } catch (error) {
        console.error('Error saving interview to database', error)
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


export async function GET(req) {
    try {
        await connectDB()

        const { searchParams } = new URL(req.url)
        const interviewId = searchParams.get('interviewId')
        const interviewDetails = await MockInterview.findById(interviewId)

        if(!interviewDetails) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'interview details not found'
                },
                {
                    status: 404,
                }
            )
        }

        return NextResponse.json(
            {
                success: true,
                interview: interviewDetails,
            },
            {
                status: 200,
            }
        )

    } catch (error) {
        console.error('Error getting interview details: ', error)
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

