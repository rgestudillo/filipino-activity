"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface QuestionAnalysisProps {
  questionNumber: number
  data: any[]
}

export default function QuestionAnalysis({ questionNumber, data }: QuestionAnalysisProps) {
  const [chartData, setChartData] = useState<any>(null)

  useEffect(() => {
    if (data.length > 0) {
      const questionKey = Object.keys(data[0])[questionNumber + 10]

      const answerCounts: { [key: string]: number } = {}
      data.forEach((row) => {
        const answer = row[questionKey]
        if (answer) {
          // Split the answer by comma and trim whitespace
          const answers = answer.split(',').map((a: string) => a.trim())
          // Count each individual answer
          answers.forEach((a: string) => {
            answerCounts[a] = (answerCounts[a] || 0) + 1
          })
        }
      })

      const sortedData = Object.entries(answerCounts)
        .sort((a, b) => b[1] - a[1])
        .map(([name, value]) => ({ name, value }))
      setChartData(sortedData)
    }
  }, [questionNumber, data])

  if (!chartData) return <div>Loading...</div>

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card>
        <CardHeader>
          <CardTitle>{getQuestionText(questionNumber)}</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function getQuestionText(questionNumber: number): string {
  const questions = [
    "Ano ang Wikang Pambansa ng Pilipinas?",
    "Ano ang wikang ginagamit sa mga tanggapan ng pamahalaan sa inyong lugar?",
    "Batay sa iyong mga nakuhang sabjek mula elementarya hanggang kolehiyo, ano ang ginagamit na wikang panturo?",
    "Kapag may kausap kang Pilipino na hindi mo katulad ang unang wika, anong wika ang ginagamit ninyo upang magkaintindihan?",
    "Sa iyong palagay, ano ang pinakamainam na gamitin na wika sa pamahalaan?",
    "Sa iyong palagay, ano ang pinakamainam na gamitin na wika sa paaralan?",
    "Sa iyong palagay, ano ang pinakamainam na gamitin na wika sa pakikipag-ugnayan sa kapwa Pilipino?",
  ]
  return questions[questionNumber - 1]
}

