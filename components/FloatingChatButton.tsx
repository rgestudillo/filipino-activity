"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Chatbot from "./Chatbot"

export default function FloatingChatButton() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-16 right-0 w-[400px] mb-4"
                    >
                        <Chatbot onClose={() => setIsOpen(false)} />
                    </motion.div>
                )}
            </AnimatePresence>

            <Button
                onClick={() => setIsOpen(!isOpen)}
                className="rounded-full w-12 h-12 shadow-lg bg-black text-white dark:bg-white dark:text-black
                hover:bg-gray-800 dark:hover:bg-gray-200"
            >
                {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
            </Button>
        </div>
    )
} 