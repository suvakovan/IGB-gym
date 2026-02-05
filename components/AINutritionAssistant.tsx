'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Apple, Sparkles, Flame, Droplets, RotateCcw, Utensils, Coffee, Sun, Moon } from 'lucide-react'
import { generateMealPlan } from '@/lib/aiUtils'

interface Meal {
    type: string
    meal: {
        name: string
        calories: number
        protein: number
        carbs: number
        fat: number
        ingredients?: string[]
    }
    quantity: string
}

export default function AINutritionAssistant() {
    const [goal, setGoal] = useState('')
    const [dietType, setDietType] = useState('')
    const [targetCalories, setTargetCalories] = useState('')
    const [mealPlan, setMealPlan] = useState<Meal[] | null>(null)
    const [isGenerating, setIsGenerating] = useState(false)

    const handleGenerate = async () => {
        if (!goal || !dietType || !targetCalories) return

        setIsGenerating(true)

        // Simulate AI processing
        await new Promise(resolve => setTimeout(resolve, 1200))

        const plan = await generateMealPlan(goal, dietType, parseInt(targetCalories))
        setMealPlan(plan)
        setIsGenerating(false)
    }

    const handleReset = () => {
        setGoal('')
        setDietType('')
        setTargetCalories('')
        setMealPlan(null)
    }

    const getMealIcon = (type: string) => {
        switch (type) {
            case 'Breakfast': return <Coffee className="w-5 h-5" />
            case 'Lunch': return <Sun className="w-5 h-5" />
            case 'Dinner': return <Moon className="w-5 h-5" />
            default: return <Apple className="w-5 h-5" />
        }
    }

    const totalMacros = mealPlan?.reduce((acc, m) => ({
        calories: acc.calories + (m.meal.calories * (m.quantity.includes('1.5') ? 1.5 : m.quantity.includes('2') ? 2 : m.quantity.includes('3/4') ? 0.75 : 1)),
        protein: acc.protein + m.meal.protein,
        carbs: acc.carbs + m.meal.carbs,
        fat: acc.fat + m.meal.fat
    }), { calories: 0, protein: 0, carbs: 0, fat: 0 })

    return (
        <section id="ai-nutrition" className="py-20 bg-background">
            <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <Badge className="mb-4 bg-gradient-to-r from-green-500/20 to-primary/20 text-primary border-primary/30" variant="outline">
                            <Apple className="w-3 h-3 mr-1" />
                            AI Nutrition
                        </Badge>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                            AI Nutrition <span className="text-primary">Assistant</span>
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            Get personalized meal suggestions based on your fitness goals
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Input Form */}
                        <Card className="border-border/50 bg-card">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Utensils className="w-5 h-5 text-primary" />
                                    Your Nutrition Goals
                                </CardTitle>
                                <CardDescription>Tell us your preferences and calorie target</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="nutrition-goal" className="flex items-center gap-2">
                                        <Flame className="w-4 h-4 text-primary" />
                                        Fitness Goal
                                    </Label>
                                    <Select value={goal} onValueChange={setGoal}>
                                        <SelectTrigger id="nutrition-goal">
                                            <SelectValue placeholder="Select your goal" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="muscle-gain">💪 Build Muscle</SelectItem>
                                            <SelectItem value="weight-loss">🔥 Lose Weight</SelectItem>
                                            <SelectItem value="maintenance">⚖️ Maintain Weight</SelectItem>
                                            <SelectItem value="performance">⚡ Boost Performance</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="diet-type" className="flex items-center gap-2">
                                        <Apple className="w-4 h-4 text-primary" />
                                        Diet Preference
                                    </Label>
                                    <Select value={dietType} onValueChange={setDietType}>
                                        <SelectTrigger id="diet-type">
                                            <SelectValue placeholder="Select diet type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="balanced">🍽️ Balanced</SelectItem>
                                            <SelectItem value="high-protein">🥩 High Protein</SelectItem>
                                            <SelectItem value="low-carb">🥗 Low Carb</SelectItem>
                                            <SelectItem value="vegetarian">🥬 Vegetarian</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="calories" className="flex items-center gap-2">
                                        <Flame className="w-4 h-4 text-primary" />
                                        Daily Calorie Target
                                    </Label>
                                    <Input
                                        id="calories"
                                        type="number"
                                        placeholder="e.g., 2000"
                                        value={targetCalories}
                                        onChange={(e) => setTargetCalories(e.target.value)}
                                        className="border-border/50"
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Recommended: 1800-2200 for weight loss, 2500-3000 for muscle gain
                                    </p>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <Button
                                        onClick={handleGenerate}
                                        disabled={!goal || !dietType || !targetCalories || isGenerating}
                                        className="flex-1 bg-primary hover:bg-primary/90"
                                    >
                                        {isGenerating ? (
                                            <>
                                                <span className="animate-spin mr-2">🍎</span>
                                                Creating Plan...
                                            </>
                                        ) : (
                                            <>
                                                <Sparkles className="w-4 h-4 mr-2" />
                                                Generate Meal Plan
                                            </>
                                        )}
                                    </Button>
                                    {mealPlan && (
                                        <Button variant="outline" onClick={handleReset} className="bg-transparent">
                                            <RotateCcw className="w-4 h-4" />
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Results */}
                        <Card className="border-border/50 bg-card">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Sparkles className="w-5 h-5 text-primary" />
                                    Your Meal Plan
                                </CardTitle>
                                <CardDescription>
                                    {mealPlan ? 'AI-generated daily meal suggestions' : 'Your personalized meal plan will appear here'}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {!mealPlan ? (
                                    <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                                        <div className="text-center">
                                            <Apple className="w-16 h-16 mx-auto mb-4 opacity-20" />
                                            <p>Your AI-generated meal plan will appear here</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {/* Macros Summary */}
                                        {totalMacros && (
                                            <div className="grid grid-cols-4 gap-2 p-4 bg-primary/10 rounded-lg border border-primary/20">
                                                <div className="text-center">
                                                    <p className="text-2xl font-bold text-primary">{Math.round(totalMacros.calories)}</p>
                                                    <p className="text-xs text-muted-foreground">Calories</p>
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-2xl font-bold text-blue-500">{totalMacros.protein}g</p>
                                                    <p className="text-xs text-muted-foreground">Protein</p>
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-2xl font-bold text-yellow-500">{totalMacros.carbs}g</p>
                                                    <p className="text-xs text-muted-foreground">Carbs</p>
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-2xl font-bold text-orange-500">{totalMacros.fat}g</p>
                                                    <p className="text-xs text-muted-foreground">Fat</p>
                                                </div>
                                            </div>
                                        )}

                                        {/* Meals */}
                                        <div className="space-y-3 max-h-[280px] overflow-y-auto pr-2">
                                            {mealPlan.map((item, i) => (
                                                <div
                                                    key={i}
                                                    className="p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors animate-in fade-in slide-in-from-right-2"
                                                    style={{ animationDelay: `${i * 100}ms` }}
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary flex-shrink-0">
                                                            {getMealIcon(item.type)}
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="flex items-center justify-between">
                                                                <p className="font-medium text-foreground">{item.type}</p>
                                                                <Badge variant="outline" className="text-xs">
                                                                    {item.meal.calories} cal
                                                                </Badge>
                                                            </div>
                                                            <p className="text-sm text-primary font-medium mt-1">{item.meal.name}</p>
                                                            <p className="text-xs text-muted-foreground mt-1">
                                                                {item.quantity} • P: {item.meal.protein}g • C: {item.meal.carbs}g • F: {item.meal.fat}g
                                                            </p>
                                                            {item.meal.ingredients && (
                                                                <p className="text-xs text-muted-foreground/70 mt-1">
                                                                    {item.meal.ingredients.slice(0, 3).join(', ')}...
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Tips */}
                                        <div className="pt-4 border-t border-border space-y-2">
                                            <div className="flex items-center gap-2 text-sm">
                                                <Droplets className="w-4 h-4 text-blue-400" />
                                                <span className="text-muted-foreground">Drink 2-3 liters of water daily</span>
                                            </div>
                                            <p className="text-xs text-muted-foreground text-center">
                                                🥗 Adjust portions based on your activity level
                                            </p>
                                        </div>
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
