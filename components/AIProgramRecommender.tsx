'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Target, Sparkles, ChevronRight, ChevronLeft, CheckCircle2, Dumbbell, TrendingUp, Heart, Zap } from 'lucide-react'
import { recommendProgram } from '@/lib/aiUtils'

interface QuizAnswer {
    goal: string
    experience: string
    timeCommitment: string
    preference: string
    injuries: string
}

interface Recommendation {
    program: string
    matchPercentage: number
    reasons: string[]
    alternates: string[]
}

const questions = [
    {
        id: 'goal',
        title: "What's your primary fitness goal?",
        options: [
            { value: 'build-muscle', label: '💪 Build Muscle', desc: 'Increase muscle mass and strength' },
            { value: 'lose-weight', label: '🔥 Lose Weight', desc: 'Burn fat and get lean' },
            { value: 'improve-endurance', label: '🏃 Improve Endurance', desc: 'Better stamina and cardio' },
            { value: 'flexibility', label: '🧘 Flexibility', desc: 'Improve mobility and balance' },
            { value: 'general-fitness', label: '⚡ General Fitness', desc: 'Overall health and wellness' }
        ]
    },
    {
        id: 'experience',
        title: "What's your fitness experience level?",
        options: [
            { value: 'beginner', label: '🌱 Beginner', desc: 'New to fitness or less than 1 year' },
            { value: 'intermediate', label: '🌿 Intermediate', desc: '1-3 years of training' },
            { value: 'advanced', label: '🌳 Advanced', desc: '3+ years of consistent training' }
        ]
    },
    {
        id: 'timeCommitment',
        title: 'How much time can you dedicate per session?',
        options: [
            { value: 'short', label: '⚡ 30-45 mins', desc: 'Quick and efficient workouts' },
            { value: 'medium', label: '⏱️ 45-60 mins', desc: 'Balanced workout sessions' },
            { value: 'long', label: '💪 60-90 mins', desc: 'Comprehensive training' }
        ]
    },
    {
        id: 'preference',
        title: 'What type of exercise do you enjoy most?',
        options: [
            { value: 'strength', label: '🏋️ Strength Training', desc: 'Weights and resistance' },
            { value: 'cardio', label: '💨 Cardio', desc: 'Running, cycling, HIIT' },
            { value: 'mind-body', label: '🧘 Mind-Body', desc: 'Yoga, pilates, stretching' },
            { value: 'mixed', label: '🔄 Mixed', desc: 'Variety of exercises' }
        ]
    },
    {
        id: 'injuries',
        title: 'Do you have any injuries or limitations?',
        options: [
            { value: 'no', label: '✅ No', desc: 'Ready for any workout' },
            { value: 'yes', label: '⚠️ Yes', desc: 'Need low-impact options' }
        ]
    }
]

const programIcons: { [key: string]: React.ReactNode } = {
    'Muscle Gain': <Dumbbell className="w-8 h-8" />,
    'Weight Loss': <TrendingUp className="w-8 h-8" />,
    'Cardio Training': <Zap className="w-8 h-8" />,
    'Yoga & Flexibility': <Heart className="w-8 h-8" />
}

export default function AIProgramRecommender() {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [answers, setAnswers] = useState<QuizAnswer>({
        goal: '',
        experience: '',
        timeCommitment: '',
        preference: '',
        injuries: ''
    })
    const [recommendation, setRecommendation] = useState<Recommendation | null>(null)
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [quizStarted, setQuizStarted] = useState(false)

    const handleAnswer = async (value: string) => {
        const questionId = questions[currentQuestion].id as keyof QuizAnswer
        const newAnswers = { ...answers, [questionId]: value }
        setAnswers(newAnswers)

        if (currentQuestion < questions.length - 1) {
            setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300)
        } else {
            // All questions answered - generate recommendation
            setIsAnalyzing(true)
            await new Promise(resolve => setTimeout(resolve, 1500))
            const result = recommendProgram(newAnswers)
            setRecommendation(result)
            setIsAnalyzing(false)
        }
    }

    const handleBack = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1)
        }
    }

    const handleRestart = () => {
        setCurrentQuestion(0)
        setAnswers({
            goal: '',
            experience: '',
            timeCommitment: '',
            preference: '',
            injuries: ''
        })
        setRecommendation(null)
        setQuizStarted(false)
    }

    const progress = ((currentQuestion + 1) / questions.length) * 100

    return (
        <section id="ai-recommender" className="py-20 bg-card">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <Badge className="mb-4 bg-gradient-to-r from-purple-500/20 to-primary/20 text-primary border-primary/30" variant="outline">
                            <Target className="w-3 h-3 mr-1" />
                            AI Recommendation
                        </Badge>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                            Find Your Perfect <span className="text-primary">Program</span>
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            Answer a few questions and let AI match you with the ideal fitness program
                        </p>
                    </div>

                    <Card className="border-border/50 bg-background overflow-hidden">
                        {!quizStarted && !recommendation ? (
                            /* Start Screen */
                            <CardContent className="p-8 text-center">
                                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Sparkles className="w-10 h-10 text-primary" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">Ready to find your perfect program?</h3>
                                <p className="text-muted-foreground mb-8">
                                    Take this quick 5-question quiz and our AI will recommend the best program for your goals.
                                </p>
                                <Button onClick={() => setQuizStarted(true)} className="bg-primary hover:bg-primary/90 px-8">
                                    Start Quiz
                                    <ChevronRight className="w-4 h-4 ml-2" />
                                </Button>
                            </CardContent>
                        ) : isAnalyzing ? (
                            /* Analyzing Screen */
                            <CardContent className="p-8 text-center">
                                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                                    <Sparkles className="w-10 h-10 text-primary animate-spin" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">Analyzing Your Profile...</h3>
                                <p className="text-muted-foreground">Our AI is finding the perfect program for you</p>
                                <div className="mt-6 max-w-xs mx-auto">
                                    <Progress value={75} className="h-2" />
                                </div>
                            </CardContent>
                        ) : recommendation ? (
                            /* Results Screen */
                            <div className="animate-in fade-in slide-in-from-bottom-4">
                                <div className="bg-gradient-to-r from-primary to-primary/80 p-8 text-primary-foreground text-center">
                                    <CheckCircle2 className="w-12 h-12 mx-auto mb-4" />
                                    <h3 className="text-2xl font-bold mb-2">Your Perfect Match!</h3>
                                    <p className="text-primary-foreground/80">Based on your answers, we recommend:</p>
                                </div>
                                <CardContent className="p-8">
                                    <div className="text-center mb-8">
                                        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                                            {programIcons[recommendation.program]}
                                        </div>
                                        <h2 className="text-3xl font-bold text-foreground mb-2">{recommendation.program}</h2>
                                        <div className="flex items-center justify-center gap-2">
                                            <Progress value={recommendation.matchPercentage} className="w-32 h-3" />
                                            <span className="text-primary font-bold">{recommendation.matchPercentage}% Match</span>
                                        </div>
                                    </div>

                                    <div className="space-y-4 mb-8">
                                        <h4 className="font-semibold text-foreground">Why this program?</h4>
                                        <ul className="space-y-2">
                                            {recommendation.reasons.map((reason, i) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                                    <span className="text-muted-foreground">{reason}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {recommendation.alternates.length > 0 && (
                                        <div className="border-t border-border pt-6 mb-6">
                                            <h4 className="font-semibold text-foreground mb-3">Alternative Options:</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {recommendation.alternates.map((alt, i) => (
                                                    <Badge key={i} variant="outline" className="px-3 py-1">
                                                        {alt}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex gap-3">
                                        <Button
                                            onClick={() => {
                                                const element = document.getElementById('programs')
                                                element?.scrollIntoView({ behavior: 'smooth' })
                                            }}
                                            className="flex-1 bg-primary hover:bg-primary/90"
                                        >
                                            View Program Details
                                            <ChevronRight className="w-4 h-4 ml-2" />
                                        </Button>
                                        <Button variant="outline" onClick={handleRestart} className="bg-transparent">
                                            Retake Quiz
                                        </Button>
                                    </div>
                                </CardContent>
                            </div>
                        ) : (
                            /* Quiz Questions */
                            <div>
                                <CardHeader className="border-b border-border">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm text-muted-foreground">
                                            Question {currentQuestion + 1} of {questions.length}
                                        </span>
                                        <Badge variant="outline">{Math.round(progress)}%</Badge>
                                    </div>
                                    <Progress value={progress} className="h-2" />
                                </CardHeader>
                                <CardContent className="p-8">
                                    <div className="animate-in fade-in slide-in-from-right-4">
                                        <h3 className="text-xl font-bold mb-6 text-foreground">
                                            {questions[currentQuestion].title}
                                        </h3>
                                        <div className="space-y-3">
                                            {questions[currentQuestion].options.map((option) => (
                                                <button
                                                    key={option.value}
                                                    onClick={() => handleAnswer(option.value)}
                                                    className={`w-full p-4 rounded-lg border-2 text-left transition-all hover:border-primary hover:bg-primary/5 ${answers[questions[currentQuestion].id as keyof QuizAnswer] === option.value
                                                            ? 'border-primary bg-primary/10'
                                                            : 'border-border'
                                                        }`}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <p className="font-medium text-foreground">{option.label}</p>
                                                            <p className="text-sm text-muted-foreground">{option.desc}</p>
                                                        </div>
                                                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {currentQuestion > 0 && (
                                        <Button
                                            variant="ghost"
                                            onClick={handleBack}
                                            className="mt-6"
                                        >
                                            <ChevronLeft className="w-4 h-4 mr-2" />
                                            Back
                                        </Button>
                                    )}
                                </CardContent>
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </section>
    )
}
