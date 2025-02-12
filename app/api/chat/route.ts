import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"
import OpenAI from 'openai'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

export async function POST(req: Request) {
    try {
        const { messages } = await req.json()

        // Read the CSV file
        const filePath = path.join(process.cwd(), "public", "survey_data.csv")
        const csvData = await fs.readFile(filePath, "utf8")

        // Create a system message with context about the data
        const systemMessage = {
            role: "system",
            content: `You are a helpful AI assistant that analyzes survey data about language use in the Philippines. 
                     You have access to survey responses in CSV format. Here's the data:
                     
                     ${csvData}
                     
                     Please analyze this data to answer questions. Respond in Filipino language.
                     Be concise but informative. Focus on patterns and insights from the data.
                     When giving statistics, calculate them from the actual data.`
        }

        // Add system message to the conversation
        const conversation = [systemMessage, ...messages]

        const completion = await openai.chat.completions.create({
            model: "gpt-4-turbo-preview",
            messages: conversation,
            temperature: 0.7,
            max_tokens: 500,
        })

        return NextResponse.json({ response: completion.choices[0].message.content })
    } catch (error) {
        console.error('Error:', error)
        return NextResponse.json(
            { error: 'May naganap na error sa server.' },
            { status: 500 }
        )
    }
} 