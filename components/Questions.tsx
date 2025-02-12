"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import QuestionAnalysis from "./QuestionAnalysis"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Questions() {
    const [currentQuestion, setCurrentQuestion] = useState(1)
    const [data, setData] = useState<any[]>([])

    useEffect(() => {
        fetch("/api/all-answers")
            .then((res) => res.json())
            .then((fetchedData) => setData(fetchedData))
    }, [])

    const questions = [
        "Ano ang Wikang Pambansa ng Pilipinas?",
        "Ano ang wikang ginagamit sa mga tanggapan ng pamahalaan sa inyong lugar?",
        "Batay sa iyong mga nakuhang sabjek mula elementarya hanggang kolehiyo, ano ang ginagamit na wikang panturo?",
        "Kapag may kausap kang Pilipino na hindi mo katulad ang unang wika, anong wika ang ginagamit ninyo upang magkaintindihan?",
        "Sa iyong palagay, ano ang pinakamainam na gamitin na wika sa pamahalaan?",
        "Sa iyong palagay, ano ang pinakamainam na gamitin na wika sa paaralan?",
        "Sa iyong palagay, ano ang pinakamainam na gamitin na wika sa pakikipag-ugnayan sa kapwa Pilipino?",
    ]

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Card className="border-none shadow-lg bg-white dark:bg-black">
                <CardContent className="p-8">
                    <h2 className="text-3xl font-bold mb-6 text-black dark:text-white">
                        Tanong {currentQuestion}
                    </h2>
                    <p className="text-lg text-gray-800 dark:text-gray-200 mb-8">
                        {questions[currentQuestion - 1]}
                    </p>
                    <QuestionAnalysis questionNumber={currentQuestion} data={data} />
                    <div className="flex justify-between mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                        <Button
                            onClick={() => setCurrentQuestion(prev => Math.max(prev - 1, 1))}
                            disabled={currentQuestion === 1}
                            variant="outline"
                            className="border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200 
                              hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50"
                        >
                            ← Nakaraang Tanong
                        </Button>
                        <Button
                            onClick={() => setCurrentQuestion(prev => Math.min(prev + 1, 7))}
                            disabled={currentQuestion === 7}
                            className="bg-black text-white dark:bg-white dark:text-black 
                              hover:bg-gray-800 dark:hover:bg-gray-200 disabled:opacity-50"
                        >
                            Susunod na Tanong →
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
} 