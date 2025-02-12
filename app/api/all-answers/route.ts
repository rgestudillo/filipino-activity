import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"
import Papa from "papaparse"

export async function GET() {
  const filePath = path.join(process.cwd(), "public", "survey_data.csv")
  const fileContents = await fs.readFile(filePath, "utf8")

  const results = Papa.parse(fileContents, { header: true })
  const data = results.data

  return NextResponse.json(data)
}

