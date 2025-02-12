"use client"

import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function AllAnswers() {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    fetch("/api/all-answers")
      .then((res) => res.json())
      .then((data) => setData(data))
  }, [])

  if (data.length === 0) return <div>Loading...</div>

  const headers = [
    "Timestamp",
    "Email Address",
    "Pangalan (Name)",
    "Edad (Age)",
    "Kasarian (Sex)",
    "Paaralan (School)",
    "Education Level",
    "Year Level",
    "Program",
    "Address",
    "1. Ano ang Wikang Pambansa ng Pilipinas?",
    "2. Ano ang wikang ginagamit sa mga tanggapan ng pamahalaan sa inyong lugar?",
    "3. Batay sa iyong mga nakuhang sabjek mula elementarya hanggang kolehiyo, ano ang ginagamit na wikang panturo?",
    "4. Kapag may kausap kang Pilipino na hindi mo katulad ang unang wika, anong wika ang ginagamit ninyo upang magkaintindihan?",
    "5. Sa iyong palagay, ano ang pinakamainam na gamitin na wika sa pamahalaan?",
    "6. Sa iyong palagay, ano ang pinakamainam na gamitin na wika sa paaralan?",
    "7. Sa iyong palagay, ano ang pinakamainam na gamitin na wika sa pakikipag-ugnayan sa kapwa Pilipino?",
  ]

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Survey Responses</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map((header) => (
                <TableHead key={header}>{header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                {headers.map((header) => (
                  <TableCell key={header}>{row[header]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

