"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

export default function Insights() {
    const insights = [
        "80% ng mga kalahok ay gumagamit ng Filipino bilang pangunahing wika sa paaralan",
        "Halos lahat ng mga respondente ay nagsabing Filipino ang Wikang Pambansa",
        "Sa mga tanggapan ng pamahalaan, 65% ay gumagamit ng Filipino, 25% English, at 10% kombinasyon",
        "90% ng mga guro ay nagtuturo gamit ang Filipino at English",
        "Kapag nakikipag-usap sa ibang rehiyon, 75% ay gumagamit ng Filipino",
        "Para sa pakikipag-ugnayan sa kapwa Pilipino, 85% ay mas pinipiling gumamit ng Filipino",
        "70% ng mga mag-aaral ay mas komportableng matuto sa Filipino",
        "Sa mga propesyonal na setting, 60% ay gumagamit ng kombinasyon ng Filipino at English",
        "95% ay sumasang-ayon na mahalagang mapanatili ang mga katutubong wika",
        "80% ay naniniwala na dapat palakasin ang pagtuturo ng Filipino sa paaralan"
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