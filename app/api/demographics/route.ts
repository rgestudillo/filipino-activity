import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"
import Papa from "papaparse"

export async function GET() {
  const filePath = path.join(process.cwd(), "public", "survey_data.csv")
  const fileContents = await fs.readFile(filePath, "utf8")

  const results = Papa.parse(fileContents, {
    header: true,
    transform: (value) => value.trim() // Trim all values during parsing
  })
  const data = results.data

  const ageData = processAgeData(data)
  const genderData = processGenderData(data)
  const educationData = processEducationData(data)
  const schoolData = processSchoolData(data)

  return NextResponse.json({ ageData, genderData, educationData, schoolData })
}

function processAgeData(data: any[]) {
  const ageCounts: { [key: string]: number } = {}
  data.forEach((row) => {
    const age = row["Edad (Age)"]?.trim() || "Not Specified"
    ageCounts[age] = (ageCounts[age] || 0) + 1
  })
  return {
    labels: Object.keys(ageCounts),
    datasets: [
      {
        label: "Age Distribution",
        data: Object.values(ageCounts),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  }
}

function processGenderData(data: any[]) {
  const genderCounts: { [key: string]: number } = {}
  data.forEach((row) => {
    const gender = row["Kasarian (Sex)"]?.trim() || "Not Specified"
    genderCounts[gender] = (genderCounts[gender] || 0) + 1
  })
  return {
    labels: Object.keys(genderCounts),
    datasets: [
      {
        label: "Gender Distribution",
        data: Object.values(genderCounts),
        backgroundColor: ["rgba(255, 99, 132, 0.6)", "rgba(54, 162, 235, 0.6)"],
      },
    ],
  }
}

function processEducationData(data: any[]) {
  const educationCounts: { [key: string]: number } = {}
  data.forEach((row) => {
    const education = row["Education Level"]?.trim() || "Not Specified"
    educationCounts[education] = (educationCounts[education] || 0) + 1
  })
  return {
    labels: Object.keys(educationCounts),
    datasets: [
      {
        label: "Education Level Distribution",
        data: Object.values(educationCounts),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  }
}

function processSchoolData(data: any[]) {
  const schoolCounts: { [key: string]: number } = {}
  data.forEach((row) => {
    const school = row["Paaralan (School)"]?.trim() || "Not Specified"
    schoolCounts[school] = (schoolCounts[school] || 0) + 1
  })
  const sortedSchools = Object.entries(schoolCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
  return {
    labels: sortedSchools.map(([school]) => school),
    datasets: [
      {
        label: "Top Schools",
        data: sortedSchools.map(([, count]) => count),
        backgroundColor: "rgba(255, 159, 64, 0.6)",
      },
    ],
  }
}

