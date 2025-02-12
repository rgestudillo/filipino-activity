import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"
import Papa from "papaparse"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const question = searchParams.get("question")

  const filePath = path.join(process.cwd(), "public", "survey_data.csv")
  const fileContents = await fs.readFile(filePath, "utf8")

  const results = Papa.parse(fileContents, { header: true })
  const data = results.data

  const questionData = processQuestionData(data, question)

  return NextResponse.json(questionData)
}

function processQuestionData(data: any[], question: string | null) {
  if (!question) return null

  const answerCounts: { [key: string]: number } = {}
  data.forEach((row) => {
    const answer = row[question]
    answerCounts[answer] = (answerCounts[answer] || 0) + 1
  })

  const sortedAnswers = Object.entries(answerCounts).sort((a, b) => b[1] - a[1])

  return {
    labels: sortedAnswers.map(([answer]) => answer),
    datasets: [
      {
        label: "Responses",
        data: sortedAnswers.map(([, count]) => count),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
      },
    ],
    insights: generateInsights(sortedAnswers),
  }
}

function generateInsights(sortedAnswers: [string, number][]) {
  const total = sortedAnswers.reduce((sum, [, count]) => sum + count, 0)
  return sortedAnswers.map(([answer, count]) => {
    const percentage = ((count / total) * 100).toFixed(2)
    return `${answer}: ${percentage}% (${count} responses)`
  })
}

