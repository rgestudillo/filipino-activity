"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

export default function Insights() {
    const insights = [
        "For elementary students, they answered TAGALOG as the language to use when conversing with other Filipinos who have different first language",
        "For junior high school, ENGLISH is their answer",
        "For senior high school and college, it VARIES",
        "There is one respondent who answered TAGALOG to questions 2 - 6, and PILIPINO to question 1 who is from Metro Manila.Probably, because it is their primary language.",
        "Majority of elementary students uses BISAYA to converse except when speaking to people who does not speak BISAYA.One of the possible influences could be the implementation of MTB is the Elementary curriculum."
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
                        Pangkalahatang Pananaw
                    </h2>
                    <p className="text-lg text-gray-800 dark:text-gray-200 mb-8">
                        Tingnan natin ang kabuuang resulta ng ating paglalakbay sa mundo ng wika.
                    </p>
                    <ul className="space-y-4 text-gray-800 dark:text-gray-200">
                        {insights.map((insight, index) => (
                            <li key={index} className="flex items-start">
                                <span className="mr-2">•</span>
                                <span>{insight}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </motion.div>
    )
} 