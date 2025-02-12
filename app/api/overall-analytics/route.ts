import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"
import Papa from "papaparse"

export async function GET() {
  const filePath = path.join(process.cwd(), "public", "survey_data.csv")
  const fileContents = await fs.readFile(filePath, "utf8")

  const results = Papa.parse(fileContents, { header: true })
  const data = results.data

  const languagePreferences = processLanguagePreferences(data)
  const languageUsage = processLanguageUsage(data)
  const insights = generateInsights(data)

  return NextResponse.json({ languagePreferences, languageUsage, insights })
}

function processLanguagePreferences(data: any[]) {
  const preferences: { [key: string]: number } = {}
  data.forEach((row) => {
    const pref =
      row["7. Sa iyong palagay, ano ang pinakamainam na gamitin na wika sa pakikipag-ugnayan sa kapwa Pilipino?"]
    preferences[pref] = (preferences[pref] || 0) + 1
  })

  return {
    labels: Object.keys(preferences),
    datasets: [
      {
        label: "Language Preferences",
        data: Object.values(preferences),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
      },
    ],
  }
}

function processLanguageUsage(data: any[]) {
  const usage: { [key: string]: number } = {
    Government: 0,
    Education: 0,
    Communication: 0,
  }

  data.forEach((row) => {
    usage.Government +=
      row["2. Ano ang wikang ginagamit sa mga tanggapan ng pamahalaan sa inyong lugar?"] === "Filipino" ? 1 : 0
    usage.Education += row[
      "3.  Batay sa iyong mga nakuhang sabjek mula elementarya hanggang kolehiyo, ano ang ginagamit na wikang panturo?"
    ].includes("Filipino")
      ? 1
      : 0
    usage.Communication +=
      row[
        "4. Kapag may kausap kang Pilipino na hindi mo katulad ang unang wika, anong wika ang ginagamit ninyo upang magkaintindihan?"
      ] === "Filipino"
        ? 1
        : 0
  })

  return {
    labels: Object.keys(usage),
    datasets: [
      {
        label: "Filipino Language Usage",
        data: Object.values(usage),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  }
}

function generateInsights(data: any[]) {
  const insights = []
  const totalResponses = data.length

  const nationalLanguage = getMostCommonResponse(data, "1. Ano ang Wikang Pambansa ng Pilipinas?")
  insights.push(
    `${((nationalLanguage.count / totalResponses) * 100).toFixed(2)}% of respondents recognize ${nationalLanguage.value} as the National Language of the Philippines.`,
  )

  const governmentLanguage = getMostCommonResponse(
    data,
    "2. Ano ang wikang ginagamit sa mga tanggapan ng pamahalaan sa inyong lugar?",
  )
  insights.push(
    `${governmentLanguage.value} is the most commonly used language in government offices (${((governmentLanguage.count / totalResponses) * 100).toFixed(2)}% of responses).`,
  )

  const educationLanguage = getMostCommonResponse(
    data,
    "3.  Batay sa iyong mga nakuhang sabjek mula elementarya hanggang kolehiyo, ano ang ginagamit na wikang panturo?",
  )
  insights.push(
    `${educationLanguage.value} is the most common language of instruction from elementary to college (${((educationLanguage.count / totalResponses) * 100).toFixed(2)}% of responses).`,
  )

  return insights
}

function getMostCommonResponse(data: any[], key: string) {
  const counts: { [key: string]: number } = {}
  data.forEach((row) => {
    const value = row[key]
    counts[value] = (counts[value] || 0) + 1
  })
  const [value, count] = Object.entries(counts).reduce((a, b) => (a[1] > b[1] ? a : b))
  return { value, count }
}

