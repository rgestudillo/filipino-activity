import Papa from "papaparse"

export async function fetchAndParseCSV(url: string) {
  const response = await fetch(url)
  const csvText = await response.text()

  return new Promise<any[]>((resolve, reject) => {
    Papa.parse(csvText, {
      header: true,
      complete: (results) => {
        resolve(results.data as any[])
      },
      error: (error) => {
        reject(error)
      },
    })
  })
}

