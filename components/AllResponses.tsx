"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface AllResponsesProps {
  data: any[]
}

export default function AllResponses({ data }: AllResponsesProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

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

  const filteredData = data.filter((row) =>
    Object.values(row).some((value) =>
      typeof value === 'string' ? value.toLowerCase().includes(searchTerm.toLowerCase()) : String(value).toLowerCase().includes(searchTerm.toLowerCase())
    ),
  )

  const pageCount = Math.ceil(filteredData.length / itemsPerPage)
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <Input
        type="text"
        placeholder="Search responses..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-sm"
      />
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
            {paginatedData.map((row, index) => (
              <TableRow key={index}>
                {headers.map((header) => (
                  <TableCell key={header}>{row[header]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-between items-center">
        <div>
          Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)}{" "}
          of {filteredData.length} entries
        </div>
        <div className="space-x-2">
          <Button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
            Previous
          </Button>
          <Button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pageCount))}
            disabled={currentPage === pageCount}
          >
            Next
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

