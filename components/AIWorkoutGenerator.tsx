'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Dumbbell, Sparkles, Clock, Flame, Target, ChevronRight, RotateCcw } from 'lucide-react'
import { generateWorkoutPlan } from '@/lib/aiUtils'

interface Exercise {
    name: string
    sets?: number
    reps?: string
    duration?: string
    intensity?: string
    equipment?: string
}

interface WorkoutDay {
    day: string
    focus: string
    exercises: Exercise[]
}

export default function AIWorkoutGenerator() {
    const [goal, setGoal] = useState('')
    const [level, setLevel] = useState('')
    const [daysPerWeek, setDaysPerWeek] = useState('')
    const [equipment, setEquipment] = useState('')
    const [workoutPlan, setWorkoutPlan] = useState<WorkoutDay[] | null>(null)
    const [isGenerating, setIsGenerating] = useState(false)
    const [selectedDay, setSelectedDay] = useState<number>(0)

    const handleGenerate = async () => {
        if (!goal || !level || !daysPerWeek || !equipment) return

        setIsGenerating(true)

        // Simulate AI processing
        await new Promise(resolve => setTimeout(resolve, 1500))

        const plan = await generateWorkoutPlan(goal, level, parseInt(daysPerWeek), equipment)
        setWorkoutPlan(plan)
        setSelectedDay(0)
        setIsGenerating(false)
    }

    const handleReset = () => {
        setGoal('')
        setLevel('')
        setDaysPerWeek('')
        setEquipment('')
        setWorkoutPlan(null)
    }

    return (
        <section id="ai-workout" className="py-20 bg-card">
            <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <Badge className="mb-4 bg-gradient-to-r from-primary/20 to-purple-500/20 text-primary border-primary/30" variant="outline">
                            <Sparkles className="w-3 h-3 mr-1" />
                            AI-Powered
                        </Badge>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                            AI Workout <span className="text-primary">Generator</span>
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            Get a personalized workout plan created just for you in seconds
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Input Form */}
                        <Card className="border-border/50 bg-background">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Dumbbell className="w-5 h-5 text-primary" />
                                    Your Preferences
                                </CardTitle>
                                <CardDescription>Tell us about your fitness goals and we'll create a perfect plan</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="goal" className="flex items-center gap-2">
                                        <Target className="w-4 h-4 text-primary" />
                                        What's your goal?
                                    </Label>
                                    <Select value={goal} onValueChange={setGoal}>
                                        <SelectTrigger id="goal">
                                            <SelectValue placeholder="Select your goal" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="muscle-gain">💪 Build Muscle</SelectItem>
                                            <SelectItem value="weight-loss">🔥 Lose Weight</SelectItem>
                                            <SelectItem value="endurance">🏃 Improve Endurance</SelectItem>
                                            <SelectItem value="strength">🏋️ Increase Strength</SelectItem>
                                            <SelectItem value="general">⚡ General Fitness</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="level" className="flex items-center gap-2">
                                        <Flame className="w-4 h-4 text-primary" />
                                        Experience Level
                                    </Label>
                                    <Select value={level} onValueChange={setLevel}>
                                        <SelectTrigger id="level">
                                            <SelectValue placeholder="Select your level" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="beginner">🌱 Beginner (0-1 year)</SelectItem>
                                            <SelectItem value="intermediate">🌿 Intermediate (1-3 years)</SelectItem>
                                            <SelectItem value="advanced">🌳 Advanced (3+ years)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="days" className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-primary" />
                                        Days per Week
                                    </Label>
                                    <Select value={daysPerWeek} onValueChange={setDaysPerWeek}>
                                        <SelectTrigger id="days">
                                            <SelectValue placeholder="How many days?" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="2">2 days</SelectItem>
                                            <SelectItem value="3">3 days</SelectItem>
                                            <SelectItem value="4">4 days</SelectItem>
                                            <SelectItem value="5">5 days</SelectItem>
                                            <SelectItem value="6">6 days</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="equipment" className="flex items-center gap-2">
                                        <Dumbbell className="w-4 h-4 text-primary" />
                                        Available Equipment
                                    </Label>
                                    <Select value={equipment} onValueChange={setEquipment}>
                                        <SelectTrigger id="equipment">
                                            <SelectValue placeholder="Select equipment access" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="full">🏋️ Full Gym Access</SelectItem>
                                            <SelectItem value="basic">🏠 Basic (Dumbbells, Barbells)</SelectItem>
                                            <SelectItem value="none">🤸 Bodyweight Only</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <Button
                                        onClick={handleGenerate}
                                        disabled={!goal || !level || !daysPerWeek || !equipment || isGenerating}
                                        className="flex-1 bg-primary hover:bg-primary/90"
                                    >
                                        {isGenerating ? (
                                            <>
                                                <span className="animate-spin mr-2">⚡</span>
                                                Generating...
                                            </>
                                        ) : (
                                            <>
                                                <Sparkles className="w-4 h-4 mr-2" />
                                                Generate Plan
                                            </>
                                        )}
                                    </Button>
                                    {workoutPlan && (
                                        <Button variant="outline" onClick={handleReset} className="bg-transparent">
                                            <RotateCcw className="w-4 h-4" />
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Results */}
                        <Card className="border-border/50 bg-background">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Sparkles className="w-5 h-5 text-primary" />
                                    Your Personalized Plan
                                </CardTitle>
                                <CardDescription>
                                    {workoutPlan ? `${workoutPlan.length}-day workout split generated just for you` : 'Fill in your preferences to generate a plan'}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {!workoutPlan ? (
                                    <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                                        <div className="text-center">
                                            <Dumbbell className="w-16 h-16 mx-auto mb-4 opacity-20" />
                                            <p>Your AI-generated workout plan will appear here</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {/* Day Tabs */}
                                        <div className="flex gap-2 overflow-x-auto pb-2">
                                            {workoutPlan.map((day, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => setSelectedDay(index)}
                                                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${selectedDay === index
                                                        ? 'bg-primary text-primary-foreground'
                                                        : 'bg-muted hover:bg-muted/80 text-muted-foreground'
                                                        }`}
                                                >
                                                    {day.day}
                                                </button>
                                            ))}
                                        </div>

                                        {/* Selected Day Details */}
                                        {workoutPlan[selectedDay] && (
                                            <div className="space-y-4 animate-in fade-in slide-in-from-right-2">
                                                <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                                                    <h3 className="font-bold text-lg text-primary mb-1">
                                                        {workoutPlan[selectedDay].day}
                                                    </h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        Focus: {workoutPlan[selectedDay].focus}
                                                    </p>
                                                </div>

                                                <div className="space-y-3 max-h-[250px] overflow-y-auto pr-2">
                                                    {workoutPlan[selectedDay].exercises.map((exercise, i) => (
                                                        <div
                                                            key={i}
                                                            className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                                                        >
                                                            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-sm font-bold text-primary">
                                                                {i + 1}
                                                            </div>
                                                            <div className="flex-1">
                                                                <p className="font-medium text-foreground">{exercise.name}</p>
                                                                <p className="text-xs text-muted-foreground">
                                                                    {exercise.sets && exercise.reps
                                                                        ? `${exercise.sets} sets × ${exercise.reps}`
                                                                        : exercise.duration || ''}
                                                                    {exercise.equipment && ` • ${exercise.equipment}`}
                                                                </p>
                                                            </div>
                                                            <ChevronRight className="w-4 h-4 text-muted-foreground" />
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="pt-4 border-t border-border">
                                                    <p className="text-xs text-muted-foreground text-center">
                                                        💡 Remember to warm up before and stretch after your workout!
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    )
}
