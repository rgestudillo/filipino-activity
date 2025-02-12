"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface ChatbotProps {
    onClose?: () => void
}

export default function Chatbot({ onClose }: ChatbotProps) {
    const [prompt, setPrompt] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!prompt.trim()) return

        setIsLoading(true)
        const newMessages = [...messages, { role: 'user' as const, content: prompt }]
        setMessages(newMessages)
        setPrompt("")

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ messages: newMessages }),
            })

            const data = await response.json()
            setMessages([...newMessages, { role: 'assistant', content: data.response }])
        } catch (error) {
            console.error('Error:', error)
            setMessages([...newMessages, { role: 'assistant', content: 'Paumanhin, may naganap na error.' }])
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 w-[400px] z-50"
        >
            <Card className="border border-gray-200 dark:border-gray-800 shadow-xl bg-white dark:bg-black h-[600px] flex flex-col">
                <CardContent className="p-4 flex flex-col h-full">
                    <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200 dark:border-gray-800">
                        <h3 className="font-semibold text-black dark:text-white">AI Chat</h3>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onClose}
                            className="hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"
                        >
                            ✕
                        </Button>
                    </div>

                    <div className="flex-1 overflow-y-auto mb-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
                        {messages.length === 0 ? (
                            <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
                                Magtanong tungkol sa datos ng survey.
                            </div>
                        ) : (
                            messages.map((message, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`p-3 rounded-lg ${message.role === 'user'
                                        ? 'bg-black dark:bg-white text-white dark:text-black ml-8'
                                        : 'bg-gray-100 dark:bg-gray-900 text-black dark:text-white mr-8'
                                        }`}
                                >
                                    {message.content}
                                </motion.div>
                            ))
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="flex gap-2 pt-2 border-t border-gray-200 dark:border-gray-800">
                        <Input
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Magtanong tungkol sa survey..."
                            className="flex-1 bg-white dark:bg-black text-black dark:text-white 
                                     border-gray-200 dark:border-gray-800 focus:ring-gray-400 
                                     dark:focus:ring-gray-600"
                            disabled={isLoading}
                        />
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="bg-black text-white dark:bg-white dark:text-black 
                                     hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                        >
                            {isLoading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                "Ipadala"
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </motion.div>
    )
} 