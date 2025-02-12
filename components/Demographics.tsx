"use client"

import { motion } from "framer-motion"
import DemographicAnalysis from "./DemographicAnalysis"
import { Card, CardContent } from "@/components/ui/card"

export default function Demographics() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm dark:bg-slate-800/80">
        <CardContent className="p-8">
          <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Ang mga Tagapagsalaysay
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Kilalanin ang iba't ibang tinig na humuhubog sa ating kuwento - mula sa mga mag-aaral hanggang sa mga propesyonal sa buong Pilipinas.
          </p>
          <DemographicAnalysis />
        </CardContent>
      </Card>
    </motion.div>
  )
}

