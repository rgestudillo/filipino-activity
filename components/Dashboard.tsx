"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import DemographicAnalysis from "./DemographicAnalysis"
import QuestionAnalysis from "./QuestionAnalysis"
import OverallAnalytics from "./OverallAnalytics"
import AllResponses from "./AllResponses"

export default function Dashboard() {
  const [currentStep, setCurrentStep] = useState(0)
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    fetch("/api/all-answers")
      .then((res) => res.json())
      .then((fetchedData) => setData(fetchedData))
  }, [])

  const steps = [
    {
      title: "Our Participants",
      description: "Let's meet the diverse group of Filipinos who shared their language experiences.",
      component: <DemographicAnalysis />,
    },
    {
      title: "The National Language",
      description: "What do Filipinos consider as their national language?",
      component: <QuestionAnalysis questionNumber={1} data={data} />,
    },
    {
      title: "Language in Government",
      description: "Explore the languages used in government offices across the Philippines.",
      component: <QuestionAnalysis questionNumber={2} data={data} />,
    },
    {
      title: "Language in Education",
      description: "Discover the languages used in Philippine classrooms from elementary to college.",
      component: <QuestionAnalysis questionNumber={3} data={data} />,
    },
    {
      title: "Bridging Language Barriers",
      description: "How do Filipinos communicate when they don't share the same first language?",
      component: <QuestionAnalysis questionNumber={4} data={data} />,
    },
    {
      title: "Ideal Government Language",
      description: "What language do Filipinos believe is best for government use?",
      component: <QuestionAnalysis questionNumber={5} data={data} />,
    },
    {
      title: "Ideal School Language",
      description: "What language do Filipinos prefer for education?",
      component: <QuestionAnalysis questionNumber={6} data={data} />,
    },
    {
      title: "Connecting with Fellow Filipinos",
      description: "Discover the preferred language for communication among Filipinos.",
      component: <QuestionAnalysis questionNumber={7} data={data} />,
    },
    {
      title: "The Big Picture",
      description: "Let's look at the overall trends and insights from our language journey.",
      component: <OverallAnalytics />,
    },
    {
      title: "Individual Voices",
      description: "Explore all the individual responses that make up our linguistic tapestry.",
      component: <AllResponses data={data} />,
    },
  ]

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-6">
          <motion.h2
            className="text-3xl font-bold mb-2 text-blue-800"
            key={currentStep}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {steps[currentStep].title}
          </motion.h2>
          <motion.p
            className="text-lg mb-6 text-gray-600"
            key={`desc-${currentStep}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {steps[currentStep].description}
          </motion.p>
          <motion.div
            key={`content-${currentStep}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {steps[currentStep].component}
          </motion.div>
          <div className="flex justify-between mt-8">
            <Button onClick={handlePrevious} disabled={currentStep === 0} variant="outline">
              Previous
            </Button>
            <Button onClick={handleNext} disabled={currentStep === steps.length - 1}>
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

