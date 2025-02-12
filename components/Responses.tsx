"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

const headers = [
    "Timestamp",
    "Email Address",
    "Sumasang-ayon ka bang lumahok sa sarbey na ito?",
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
    "7. Sa iyong palagay, ano ang pinakamainam na gamitin na wika sa pakikipag-ugnayan sa kapwa Pilipino?"
]

function parseCSVLine(text: string): string[] {
    const result = []
    let current = ''
    let inQuotes = false

    for (let i = 0; i < text.length; i++) {
        const char = text[i]

        if (char === '"') {
            inQuotes = !inQuotes
            continue
        }

        if (char === ',' && !inQuotes) {
            result.push(current.trim())
            current = ''
            continue
        }

        current += char
    }

    if (current) {
        result.push(current.trim())
    }

    return result
}

export default function Responses() {
    const [searchTerm, setSearchTerm] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10

    // Fetch data from CSV
    const [data, setData] = useState<any[]>([])

    useEffect(() => {
        fetch('/survey_data.csv')
            .then(response => response.text())
            .then(csvText => {
                // Split by newlines and remove empty lines
                const lines = csvText.split('\n').filter(line => line.trim())

                // Skip header row and parse each line
                const parsedData = lines.slice(1).map(line => {
                    const values = parseCSVLine(line)
                    return headers.reduce((obj, header, index) => {
                        // Clean up the value and handle quotes
                        let value = values[index] || ''
                        value = value.replace(/^"|"$/g, '').trim()
                        obj[header] = value
                        return obj
                    }, {} as any)
                })
                setData(parsedData)
            })
            .catch(error => {
                console.error('Error loading CSV:', error)
            })
    }, [])

    const filteredData = data.filter(row =>
        Object.values(row).some(value =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
    )

    const pageCount = Math.ceil(filteredData.length / itemsPerPage)
    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Card className="border-none shadow-lg bg-white dark:bg-black">
                <CardContent className="p-8">
                    <h2 className="text-3xl font-bold mb-6 text-black dark:text-white">
                        Mga Indibidwal na Tugon
                    </h2>
                    <div className="space-y-4">
                        <Input
                            type="text"
                            placeholder="Maghanap..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="max-w-sm border-gray-200 dark:border-gray-800 
                                     bg-white dark:bg-black text-black dark:text-white"
                        />
                        <div className="overflow-x-auto border border-gray-200 dark:border-gray-800 rounded-lg">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-gray-50 dark:bg-gray-900">
                                        {headers.map((header) => (
                                            <TableHead
                                                key={header}
                                                className="text-black dark:text-white font-semibold"
                                            >
                                                {header}
                                            </TableHead>
                                        ))}
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {paginatedData.map((row, index) => (
                                        <TableRow
                                            key={index}
                                            className="border-t border-gray-200 dark:border-gray-800"
                                        >
                                            {headers.map((header) => (
                                                <TableCell
                                                    key={header}
                                                    className="text-gray-800 dark:text-gray-200"
                                                >
                                                    {row[header]}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        <div className="flex justify-between items-center text-gray-800 dark:text-gray-200">
                            <div>
                                Ipinapakita {(currentPage - 1) * itemsPerPage + 1} hanggang{" "}
                                {Math.min(currentPage * itemsPerPage, filteredData.length)} ng{" "}
                                {filteredData.length} na mga tugon
                            </div>
                            <div className="space-x-2">
                                <Button
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="bg-black text-white dark:bg-white dark:text-black 
                                             hover:bg-gray-800 dark:hover:bg-gray-200"
                                >
                                    Nakaraan
                                </Button>
                                <Button
                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pageCount))}
                                    disabled={currentPage === pageCount}
                                    className="bg-black text-white dark:bg-white dark:text-black 
                                             hover:bg-gray-800 dark:hover:bg-gray-200"
                                >
                                    Susunod
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
} 