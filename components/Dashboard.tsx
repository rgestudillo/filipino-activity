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
      title: "Ang mga Tagapagsalaysay",
      description: "Kilalanin ang iba't ibang tinig na humuhubog sa ating kuwento - mula sa mga mag-aaral hanggang sa mga propesyonal sa buong Pilipinas.",
      component: <DemographicAnalysis />,
    },
    {
      title: "Unang Kabanata: Wikang Pambansa",
      description: "Ano nga ba ang Wikang Pambansa ng Pilipinas?",
      component: <QuestionAnalysis questionNumber={1} data={data} />,
    },
    {
      title: "Ikalawang Kabanata: Wika sa Pamahalaan",
      description: "Ano ang wikang ginagamit sa mga tanggapan ng pamahalaan sa inyong lugar?",
      component: <QuestionAnalysis questionNumber={2} data={data} />,
    },
    {
      title: "Ikatlong Kabanata: Wika sa Edukasyon",
      description: "Batay sa iyong mga nakuhang sabjek mula elementarya hanggang kolehiyo, ano ang ginagamit na wikang panturo?",
      component: <QuestionAnalysis questionNumber={3} data={data} />,
    },
    {
      title: "Ikaapat na Kabanata: Tulay sa Komunikasyon",
      description: "Kapag may kausap kang Pilipino na hindi mo katulad ang unang wika, anong wika ang ginagamit ninyo upang magkaintindihan?",
      component: <QuestionAnalysis questionNumber={4} data={data} />,
    },
    {
      title: "Ikalimang Kabanata: Wika sa Pamahalaan",
      description: "Sa iyong palagay, ano ang pinakamainam na gamitin na wika sa pamahalaan?",
      component: <QuestionAnalysis questionNumber={5} data={data} />,
    },
    {
      title: "Ikaanim na Kabanata: Wika sa Paaralan",
      description: "Sa iyong palagay, ano ang pinakamainam na gamitin na wika sa paaralan?",
      component: <QuestionAnalysis questionNumber={6} data={data} />,
    },
    {
      title: "Ikapitong Kabanata: Wika ng Pakikipag-ugnayan",
      description: "Sa iyong palagay, ano ang pinakamainam na gamitin na wika sa pakikipag-ugnayan sa kapwa Pilipino?",
      component: <QuestionAnalysis questionNumber={7} data={data} />,
    },
    {
      title: "Pangkalahatang Pananaw",
      description: "Tingnan natin ang kabuuang resulta ng ating paglalakbay sa mundo ng wika.",
      component: <OverallAnalytics />,
    },
    {
      title: "Mga Indibidwal na Tinig",
      description: "Galugarin ang bawat sagot na bumubuo sa ating makukulay na tapiserya ng wika.",
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm dark:bg-slate-800/80">
        <CardContent className="p-8">
          <motion.div
            key={`step-${currentStep}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <motion.h2
                className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
                layoutId="title"
              >
                {steps[currentStep].title}
              </motion.h2>
              <motion.p
                className="text-lg text-gray-600 dark:text-gray-400"
                layoutId="description"
              >
                {steps[currentStep].description}
              </motion.p>
            </div>

            <div className="mt-8">
              {steps[currentStep].component}
            </div>

            <div className="flex justify-between items-center pt-8 mt-8 border-t border-gray-200 dark:border-gray-700">
              <Button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                variant="outline"
                className="hover:bg-blue-50 dark:hover:bg-slate-700"
              >
                ← Nakaraang Kabanata
              </Button>
              <div className="text-sm text-gray-500">
                {currentStep + 1} ng {steps.length}
              </div>
              <Button
                onClick={handleNext}
                disabled={currentStep === steps.length - 1}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90"
              >
                Susunod na Kabanata →
              </Button>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

