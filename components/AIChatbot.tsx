'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react'
import { generateChatResponse } from '@/lib/aiUtils'

interface Message {
    id: number
    text: string
    isBot: boolean
    timestamp: Date
}

export default function AIChatbot() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: "Hello! 💪 I'm Alpha Gym's AI assistant. How can I help you today? Ask me about our programs, pricing, trainers, or fitness tips!",
            isBot: true,
            timestamp: new Date()
        }
    ])
    const [input, setInput] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleSend = async () => {
        if (!input.trim()) return

        const userMessage: Message = {
            id: Date.now(),
            text: input,
            isBot: false,
            timestamp: new Date()
        }

        setMessages(prev => [...prev, userMessage])
        setInput('')
        setIsTyping(true)

        // Simulate AI thinking
        await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 700))

        const response = generateChatResponse(input)

        const botMessage: Message = {
            id: Date.now() + 1,
            text: response,
            isBot: true,
            timestamp: new Date()
        }

        setIsTyping(false)
        setMessages(prev => [...prev, botMessage])
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    const quickQuestions = [
        "What are your hours?",
        "Show me pricing",
        "Tell me about trainers",
        "Weight loss tips"
    ]

    return (
        <>
            {/* Floating Chat Button */}
            <button
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all duration-300 group ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
            >
                <MessageCircle className="w-7 h-7 text-primary-foreground" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                    <Sparkles className="w-3 h-3 text-white" />
                </span>
                <span className="absolute -top-12 right-0 bg-card text-foreground px-3 py-2 rounded-lg text-sm font-medium shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-border">
                    AI Assistant 💬
                </span>
            </button>

            {/* Chat Window */}
            <div
                className={`fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] transition-all duration-300 ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'
                    }`}
            >
                <Card className="shadow-2xl border-primary/20 bg-card overflow-hidden">
                    {/* Header */}
                    <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                    <Bot className="w-6 h-6" />
                                </div>
                                <div>
                                    <CardTitle className="text-lg font-bold">Alpha AI</CardTitle>
                                    <p className="text-xs text-primary-foreground/80 flex items-center gap-1">
                                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                        Online • Ready to help
                                    </p>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsOpen(false)}
                                className="text-primary-foreground hover:bg-white/20 rounded-full"
                            >
                                <X className="w-5 h-5" />
                            </Button>
                        </div>
                    </CardHeader>

                    {/* Messages */}
                    <CardContent className="p-0">
                        <div className="h-[350px] overflow-y-auto p-4 space-y-4 bg-background/50">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} animate-in slide-in-from-bottom-2`}
                                >
                                    <div className={`flex gap-2 max-w-[85%] ${message.isBot ? 'flex-row' : 'flex-row-reverse'}`}>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.isBot ? 'bg-primary/10' : 'bg-secondary'
                                            }`}>
                                            {message.isBot ? (
                                                <Bot className="w-4 h-4 text-primary" />
                                            ) : (
                                                <User className="w-4 h-4 text-secondary-foreground" />
                                            )}
                                        </div>
                                        <div
                                            className={`px-4 py-3 rounded-2xl text-sm ${message.isBot
                                                    ? 'bg-muted text-foreground rounded-tl-none'
                                                    : 'bg-primary text-primary-foreground rounded-tr-none'
                                                }`}
                                        >
                                            <p className="whitespace-pre-line leading-relaxed">{message.text}</p>
                                            <p className={`text-xs mt-1 ${message.isBot ? 'text-muted-foreground' : 'text-primary-foreground/70'}`}>
                                                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Typing Indicator */}
                            {isTyping && (
                                <div className="flex justify-start animate-in slide-in-from-bottom-2">
                                    <div className="flex gap-2 items-center">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                            <Bot className="w-4 h-4 text-primary" />
                                        </div>
                                        <div className="bg-muted px-4 py-3 rounded-2xl rounded-tl-none">
                                            <div className="flex gap-1">
                                                <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                                <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                                <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Questions */}
                        {messages.length <= 2 && (
                            <div className="px-4 py-2 border-t border-border bg-muted/30">
                                <p className="text-xs text-muted-foreground mb-2">Quick questions:</p>
                                <div className="flex flex-wrap gap-2">
                                    {quickQuestions.map((q) => (
                                        <button
                                            key={q}
                                            onClick={() => {
                                                setInput(q)
                                                setTimeout(() => handleSend(), 100)
                                            }}
                                            className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full hover:bg-primary/20 transition-colors"
                                        >
                                            {q}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Input */}
                        <div className="p-4 border-t border-border bg-card">
                            <div className="flex gap-2">
                                <Input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Ask me anything..."
                                    className="flex-1 border-border/50 focus:border-primary"
                                    disabled={isTyping}
                                />
                                <Button
                                    onClick={handleSend}
                                    disabled={!input.trim() || isTyping}
                                    className="bg-primary hover:bg-primary/90 px-4"
                                >
                                    <Send className="w-4 h-4" />
                                </Button>
                            </div>
                            <p className="text-xs text-muted-foreground text-center mt-2">
                                Powered by Alpha AI ✨
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}
