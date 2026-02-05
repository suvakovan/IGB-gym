'use client'

import React from "react"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Dumbbell, Target, Heart, Zap, Users, TrendingUp, Calculator, Mail, Phone, MapPin, Menu, X, ChevronRight, Star, Plus, Edit2, Trash2, Timer, Play, Pause, RotateCcw, Sparkles, Bot, CheckCircle2, Clock } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import AIChatbot from '@/components/AIChatbot'
import AIWorkoutGenerator from '@/components/AIWorkoutGenerator'
import AINutritionAssistant from '@/components/AINutritionAssistant'
import AIProgramRecommender from '@/components/AIProgramRecommender'
import { getBMIRecommendations, categorizeInquiry } from '@/lib/aiUtils'

export default function AlphaGymPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [bmi, setBmi] = useState<number | null>(null)
  const [bmiCategory, setBmiCategory] = useState('')
  const [bmiRecommendations, setBmiRecommendations] = useState<any>(null)

  // Contact Form AI States
  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactMessage, setContactMessage] = useState('')
  const [contactResponse, setContactResponse] = useState<any>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // CRUD States
  const [editingProgram, setEditingProgram] = useState<any>(null)
  const [editingTrainer, setEditingTrainer] = useState<any>(null)
  const [editingPlan, setEditingPlan] = useState<any>(null)
  const [editingTestimonial, setEditingTestimonial] = useState<any>(null)
  const [dialogOpen, setDialogOpen] = useState<string | null>(null)

  // Timer States
  const [timerMinutes, setTimerMinutes] = useState(5)
  const [timerSeconds, setTimerSeconds] = useState(0)
  const [timeLeft, setTimeLeft] = useState(300) // in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [timerMode, setTimerMode] = useState<'countdown' | 'stopwatch'>('countdown')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const calculateBMI = () => {
    const h = parseFloat(height) / 100 // convert cm to m
    const w = parseFloat(weight)
    if (h > 0 && w > 0) {
      const bmiValue = w / (h * h)
      const roundedBmi = parseFloat(bmiValue.toFixed(1))
      setBmi(roundedBmi)

      let category = ''
      if (bmiValue < 18.5) category = 'Underweight'
      else if (bmiValue < 25) category = 'Normal weight'
      else if (bmiValue < 30) category = 'Overweight'
      else category = 'Obese'

      setBmiCategory(category)
      // Generate AI recommendations
      const recommendations = getBMIRecommendations(roundedBmi, category)
      setBmiRecommendations(recommendations)
    }
  }

  const handleContactSubmit = async () => {
    if (!contactName || !contactEmail || !contactMessage) return

    setIsSubmitting(true)
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 800))

    const response = categorizeInquiry(contactMessage)
    setContactResponse(response)
    setIsSubmitting(false)
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Programs', id: 'programs' },
    { label: 'AI Tools', id: 'ai-workout' },
    { label: 'Trainers', id: 'trainers' },
    { label: 'Pricing', id: 'pricing' },
    { label: 'Contact', id: 'contact' },
  ]

  const [programs, setPrograms] = useState([
    {
      id: 1,
      icon: 'Dumbbell',
      title: 'Muscle Gain',
      description: 'Build lean muscle mass with our strength training programs designed for maximum hypertrophy.',
    },
    {
      id: 2,
      icon: 'TrendingUp',
      title: 'Weight Loss',
      description: 'Burn fat and transform your body with our high-intensity cardio and metabolic conditioning.',
    },
    {
      id: 3,
      icon: 'Heart',
      title: 'Cardio Training',
      description: 'Improve cardiovascular endurance and stamina through structured aerobic exercise programs.',
    },
    {
      id: 4,
      icon: 'Target',
      title: 'Yoga & Flexibility',
      description: 'Enhance mobility, balance, and mental wellness with our yoga and stretching classes.',
    },
  ])

  const [trainers, setTrainers] = useState([
    { id: 1, name: 'Marcus Steel', specialization: 'Strength & Conditioning', experience: '10+ Years', rating: 4.9 },
    { id: 2, name: 'Sarah Phoenix', specialization: 'CrossFit & HIIT', experience: '8+ Years', rating: 4.8 },
    { id: 3, name: 'David Iron', specialization: 'Bodybuilding Coach', experience: '12+ Years', rating: 5.0 },
    { id: 4, name: 'Emma Flex', specialization: 'Yoga & Pilates', experience: '7+ Years', rating: 4.9 },
  ])

  const [plans, setPlans] = useState([
    {
      id: 1,
      name: 'Basic',
      price: '$29',
      period: '/month',
      features: ['Gym Access', 'Locker Room', 'Free WiFi', 'Basic Equipment'],
      popular: false,
    },
    {
      id: 2,
      name: 'Standard',
      price: '$59',
      period: '/month',
      features: ['All Basic Features', 'Group Classes', 'Nutrition Guide', 'Shower Facilities', 'Free Parking'],
      popular: true,
    },
    {
      id: 3,
      name: 'Premium',
      price: '$99',
      period: '/month',
      features: ['All Standard Features', 'Personal Training', 'Meal Planning', 'Sauna & Steam Room', '24/7 Access', 'Guest Passes'],
      popular: false,
    },
  ])

  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      name: 'John Martinez',
      text: 'Alpha Gym transformed my life! Lost 30 pounds in 4 months and gained incredible strength.',
      rating: 5,
    },
    {
      id: 2,
      name: 'Lisa Chen',
      text: 'The trainers are phenomenal and the community is so supportive. Best gym experience ever!',
      rating: 5,
    },
    {
      id: 3,
      name: 'Mike Anderson',
      text: 'State-of-the-art equipment and amazing facilities. Worth every penny of the membership.',
      rating: 5,
    },
  ])

  const iconMap: any = {
    Dumbbell,
    TrendingUp,
    Heart,
    Target,
    Zap,
    Users,
  }

  // CRUD Handlers
  const handleDeleteProgram = (id: number) => {
    setPrograms(programs.filter(p => p.id !== id))
  }

  const handleAddProgram = (program: any) => {
    setPrograms([...programs, { ...program, id: Date.now() }])
    setDialogOpen(null)
  }

  const handleEditProgram = (program: any) => {
    setPrograms(programs.map(p => p.id === program.id ? program : p))
    setDialogOpen(null)
  }

  const handleDeleteTrainer = (id: number) => {
    setTrainers(trainers.filter(t => t.id !== id))
  }

  const handleAddTrainer = (trainer: any) => {
    setTrainers([...trainers, { ...trainer, id: Date.now() }])
    setDialogOpen(null)
  }

  const handleEditTrainer = (trainer: any) => {
    setTrainers(trainers.map(t => t.id === trainer.id ? trainer : t))
    setDialogOpen(null)
  }

  const handleDeletePlan = (id: number) => {
    setPlans(plans.filter(p => p.id !== id))
  }

  const handleAddPlan = (plan: any) => {
    setPlans([...plans, { ...plan, id: Date.now() }])
    setDialogOpen(null)
  }

  const handleEditPlan = (plan: any) => {
    setPlans(plans.map(p => p.id === plan.id ? plan : p))
    setDialogOpen(null)
  }

  const handleDeleteTestimonial = (id: number) => {
    setTestimonials(testimonials.filter(t => t.id !== id))
  }

  const handleAddTestimonial = (testimonial: any) => {
    setTestimonials([...testimonials, { ...testimonial, id: Date.now() }])
    setDialogOpen(null)
  }

  const handleEditTestimonial = (testimonial: any) => {
    setTestimonials(testimonials.map(t => t.id === testimonial.id ? testimonial : t))
    setDialogOpen(null)
  }

  // Timer Functions
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isTimerRunning) {
      interval = setInterval(() => {
        if (timerMode === 'countdown') {
          setTimeLeft((prevTime) => {
            if (prevTime <= 1) {
              setIsTimerRunning(false)
              // Play sound notification
              if (typeof window !== 'undefined') {
                const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+Dy')
                audio.play().catch(() => { })
              }
              return 0
            }
            return prevTime - 1
          })
        } else {
          setTimeLeft((prevTime) => prevTime + 1)
        }
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isTimerRunning, timerMode])

  const startTimer = () => {
    if (timerMode === 'countdown' && timeLeft === 0) {
      setTimeLeft(timerMinutes * 60 + timerSeconds)
    }
    setIsTimerRunning(true)
  }

  const pauseTimer = () => {
    setIsTimerRunning(false)
  }

  const resetTimer = () => {
    setIsTimerRunning(false)
    if (timerMode === 'countdown') {
      setTimeLeft(timerMinutes * 60 + timerSeconds)
    } else {
      setTimeLeft(0)
    }
  }

  const setTimerDuration = () => {
    setTimeLeft(timerMinutes * 60 + timerSeconds)
    setIsTimerRunning(false)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen bg-background dark">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-lg' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Dumbbell className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold text-foreground">Alpha Gym</span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-foreground/80 hover:text-primary transition-colors font-medium"
                >
                  {item.label}
                </button>
              ))}
              <Button size="sm" className="bg-primary hover:bg-primary/90">Join Now</Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-foreground"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Nav */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 flex flex-col gap-3 animate-in slide-in-from-top">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-foreground/80 hover:text-primary transition-colors font-medium text-left py-2"
                >
                  {item.label}
                </button>
              ))}
              <Button size="sm" className="bg-primary hover:bg-primary/90 w-full">Join Now</Button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/20" />
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, currentColor 2px, currentColor 4px)',
          }} />
        </div>

        <div className="container mx-auto px-4 z-10 text-center">
          <Badge className="mb-6 bg-primary/20 text-primary border-primary/30 hover:bg-primary/30" variant="outline">
            🔥 Transform Your Body Today
          </Badge>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-balance text-foreground">
            Build Your{' '}
            <span className="text-primary animate-pulse">Stronger</span> Self
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
            {"Push your limits at Alpha Gym. Elite training, expert coaches, and a community that drives results."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 group">
              Start Your Journey
              <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 border-primary/50 hover:bg-primary/10 bg-transparent">
              View Programs
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            {[
              { value: '500+', label: 'Active Members' },
              { value: '15+', label: 'Expert Trainers' },
              { value: '50+', label: 'Classes Weekly' },
              { value: '10K+', label: 'Success Stories' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-secondary/20 text-secondary-foreground border-secondary/30" variant="outline">
              About Us
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Where Champions Are <span className="text-primary">Built</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {"Alpha Gym is more than just a fitness center—it's a transformation hub where dedication meets world-class facilities. Our mission is to empower individuals to achieve their peak physical and mental performance through expert guidance, cutting-edge equipment, and a supportive community."}
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              {[
                { icon: Target, title: 'Goal-Focused', desc: 'Personalized training plans aligned with your objectives' },
                { icon: Users, title: 'Community', desc: 'Join a supportive network of fitness enthusiasts' },
                { icon: Zap, title: 'Results-Driven', desc: 'Proven methods that deliver real transformations' },
              ].map((item) => (
                <Card key={item.title} className="border-border/50 hover:border-primary/50 transition-colors bg-background">
                  <CardContent className="pt-6 text-center">
                    <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <item.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-bold text-xl mb-2 text-foreground">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30" variant="outline">
              Workout Programs
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Train Like a <span className="text-primary">Champion</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Choose from our expertly designed programs tailored to your fitness goals
            </p>
            <Dialog open={dialogOpen === 'add-program'} onOpenChange={(open) => setDialogOpen(open ? 'add-program' : null)}>
              <DialogTrigger asChild>
                <Button className="mt-4 bg-primary hover:bg-primary/90">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Program
                </Button>
              </DialogTrigger>
              <ProgramDialog
                program={null}
                onSave={handleAddProgram}
                onClose={() => setDialogOpen(null)}
              />
            </Dialog>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((program) => {
              const IconComponent = iconMap[program.icon] || Dumbbell
              return (
                <Card key={program.id} className="border-border/50 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all group bg-card relative">
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <Dialog open={dialogOpen === `edit-program-${program.id}`} onOpenChange={(open) => setDialogOpen(open ? `edit-program-${program.id}` : null)}>
                      <DialogTrigger asChild>
                        <Button size="icon" variant="outline" className="h-8 w-8 bg-card hover:bg-primary hover:text-primary-foreground bg-transparent">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <ProgramDialog
                        program={program}
                        onSave={handleEditProgram}
                        onClose={() => setDialogOpen(null)}
                      />
                    </Dialog>
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-8 w-8 bg-card hover:bg-destructive hover:text-destructive-foreground bg-transparent"
                      onClick={() => handleDeleteProgram(program.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <CardHeader>
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{program.title}</CardTitle>
                    <CardDescription className="text-muted-foreground leading-relaxed">
                      {program.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors bg-transparent">
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* AI Workout Generator */}
      <AIWorkoutGenerator />

      {/* AI Nutrition Assistant */}
      <AINutritionAssistant />

      {/* AI Program Recommender */}
      <AIProgramRecommender />

      {/* Trainers Section */}
      <section id="trainers" className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-secondary/20 text-secondary-foreground border-secondary/30" variant="outline">
              Expert Trainers
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Meet Your <span className="text-primary">Coaches</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              World-class trainers dedicated to your success
            </p>
            <Dialog open={dialogOpen === 'add-trainer'} onOpenChange={(open) => setDialogOpen(open ? 'add-trainer' : null)}>
              <DialogTrigger asChild>
                <Button className="mt-4 bg-primary hover:bg-primary/90">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Trainer
                </Button>
              </DialogTrigger>
              <TrainerDialog
                trainer={null}
                onSave={handleAddTrainer}
                onClose={() => setDialogOpen(null)}
              />
            </Dialog>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trainers.map((trainer) => (
              <Card key={trainer.id} className="border-border/50 hover:border-primary/50 hover:shadow-lg transition-all bg-background group relative">
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <Dialog open={dialogOpen === `edit-trainer-${trainer.id}`} onOpenChange={(open) => setDialogOpen(open ? `edit-trainer-${trainer.id}` : null)}>
                    <DialogTrigger asChild>
                      <Button size="icon" variant="outline" className="h-8 w-8 bg-card hover:bg-primary hover:text-primary-foreground bg-transparent">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <TrainerDialog
                      trainer={trainer}
                      onSave={handleEditTrainer}
                      onClose={() => setDialogOpen(null)}
                    />
                  </Dialog>
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-8 w-8 bg-card hover:bg-destructive hover:text-destructive-foreground bg-transparent"
                    onClick={() => handleDeleteTrainer(trainer.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <CardHeader className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-12 h-12 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{trainer.name}</CardTitle>
                  <CardDescription className="text-primary font-semibold">{trainer.specialization}</CardDescription>
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <span className="text-sm font-semibold">{trainer.rating}</span>
                  </div>
                </CardHeader>
                <CardContent className="text-center">
                  <Badge variant="outline" className="border-primary/30 text-primary">
                    {trainer.experience}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30" variant="outline">
              Membership Plans
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Choose Your <span className="text-primary">Path</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Flexible plans designed to fit your lifestyle and goals
            </p>
            <Dialog open={dialogOpen === 'add-plan'} onOpenChange={(open) => setDialogOpen(open ? 'add-plan' : null)}>
              <DialogTrigger asChild>
                <Button className="mt-4 bg-primary hover:bg-primary/90">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Plan
                </Button>
              </DialogTrigger>
              <PlanDialog
                plan={null}
                onSave={handleAddPlan}
                onClose={() => setDialogOpen(null)}
              />
            </Dialog>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <Card key={plan.id} className={`border-border/50 hover:border-primary/50 transition-all relative group ${plan.popular ? 'border-primary shadow-lg shadow-primary/20 scale-105' : ''} bg-card`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground border-primary">Most Popular</Badge>
                  </div>
                )}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <Dialog open={dialogOpen === `edit-plan-${plan.id}`} onOpenChange={(open) => setDialogOpen(open ? `edit-plan-${plan.id}` : null)}>
                    <DialogTrigger asChild>
                      <Button size="icon" variant="outline" className="h-8 w-8 bg-card hover:bg-primary hover:text-primary-foreground bg-transparent">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <PlanDialog
                      plan={plan}
                      onSave={handleEditPlan}
                      onClose={() => setDialogOpen(null)}
                    />
                  </Dialog>
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-8 w-8 bg-card hover:bg-destructive hover:text-destructive-foreground bg-transparent"
                    onClick={() => handleDeletePlan(plan.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-5xl font-bold text-primary">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <ChevronRight className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90' : ''}`} variant={plan.popular ? 'default' : 'outline'}>
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Progress Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-secondary/20 text-secondary-foreground border-secondary/30" variant="outline">
                Track Progress
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                Measure Your <span className="text-primary">Success</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Real results from our members
              </p>
            </div>

            <Card className="border-border/50 bg-background">
              <CardHeader>
                <CardTitle>Member Success Metrics</CardTitle>
                <CardDescription>Average progress in 3 months</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-foreground">Weight Loss Achievement</span>
                    <span className="text-primary font-bold">78%</span>
                  </div>
                  <Progress value={78} className="h-3" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-foreground">Strength Gain</span>
                    <span className="text-primary font-bold">85%</span>
                  </div>
                  <Progress value={85} className="h-3" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-foreground">Endurance Improvement</span>
                    <span className="text-primary font-bold">92%</span>
                  </div>
                  <Progress value={92} className="h-3" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-foreground">Member Satisfaction</span>
                    <span className="text-primary font-bold">96%</span>
                  </div>
                  <Progress value={96} className="h-3" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Workout Timer Section */}
      <section id="timer" className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-primary/20 text-primary border-primary/30" variant="outline">
                Workout Timer
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                Track Your <span className="text-primary">Workout Time</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Professional timer for intervals, rest periods, and workout sessions
              </p>
            </div>

            <Card className="border-border/50 bg-background">
              <CardContent className="p-8">
                {/* Timer Mode Toggle */}
                <div className="flex justify-center gap-4 mb-8">
                  <Button
                    variant={timerMode === 'countdown' ? 'default' : 'outline'}
                    onClick={() => {
                      setTimerMode('countdown')
                      setTimeLeft(timerMinutes * 60 + timerSeconds)
                      setIsTimerRunning(false)
                    }}
                    className={timerMode === 'countdown' ? 'bg-primary hover:bg-primary/90' : 'bg-transparent'}
                  >
                    <Timer className="w-4 h-4 mr-2" />
                    Countdown
                  </Button>
                  <Button
                    variant={timerMode === 'stopwatch' ? 'default' : 'outline'}
                    onClick={() => {
                      setTimerMode('stopwatch')
                      setTimeLeft(0)
                      setIsTimerRunning(false)
                    }}
                    className={timerMode === 'stopwatch' ? 'bg-primary hover:bg-primary/90' : 'bg-transparent'}
                  >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Stopwatch
                  </Button>
                </div>

                {/* Timer Display */}
                <div className="text-center mb-8">
                  <div className="text-8xl md:text-9xl font-bold text-primary mb-4 font-mono tracking-tight">
                    {formatTime(timeLeft)}
                  </div>
                  {timerMode === 'countdown' && !isTimerRunning && timeLeft === 0 && (
                    <p className="text-destructive text-lg font-semibold">Time's Up!</p>
                  )}
                </div>

                {/* Timer Controls */}
                <div className="flex justify-center gap-4 mb-8">
                  {!isTimerRunning ? (
                    <Button
                      size="lg"
                      onClick={startTimer}
                      className="bg-primary hover:bg-primary/90 px-8"
                    >
                      <Play className="w-5 h-5 mr-2" />
                      Start
                    </Button>
                  ) : (
                    <Button
                      size="lg"
                      onClick={pauseTimer}
                      variant="outline"
                      className="bg-transparent px-8"
                    >
                      <Pause className="w-5 h-5 mr-2" />
                      Pause
                    </Button>
                  )}
                  <Button
                    size="lg"
                    onClick={resetTimer}
                    variant="outline"
                    className="bg-transparent px-8"
                  >
                    <RotateCcw className="w-5 h-5 mr-2" />
                    Reset
                  </Button>
                </div>

                {/* Timer Settings (Countdown Only) */}
                {timerMode === 'countdown' && !isTimerRunning && (
                  <div className="border-t border-border pt-8">
                    <h3 className="text-lg font-semibold mb-4 text-center">Set Duration</h3>
                    <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                      <div className="space-y-2">
                        <Label htmlFor="timer-minutes">Minutes</Label>
                        <Input
                          id="timer-minutes"
                          type="number"
                          min="0"
                          max="59"
                          value={timerMinutes}
                          onChange={(e) => setTimerMinutes(parseInt(e.target.value) || 0)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="timer-seconds">Seconds</Label>
                        <Input
                          id="timer-seconds"
                          type="number"
                          min="0"
                          max="59"
                          value={timerSeconds}
                          onChange={(e) => setTimerSeconds(parseInt(e.target.value) || 0)}
                        />
                      </div>
                    </div>
                    <div className="flex justify-center mt-4">
                      <Button onClick={setTimerDuration} className="bg-primary hover:bg-primary/90">
                        Set Timer
                      </Button>
                    </div>
                  </div>
                )}

                {/* Quick Preset Buttons */}
                {timerMode === 'countdown' && !isTimerRunning && (
                  <div className="mt-6">
                    <p className="text-sm text-muted-foreground text-center mb-3">Quick Presets:</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {[
                        { label: '30s', seconds: 30 },
                        { label: '1 min', seconds: 60 },
                        { label: '3 min', seconds: 180 },
                        { label: '5 min', seconds: 300 },
                        { label: '10 min', seconds: 600 },
                        { label: '15 min', seconds: 900 },
                      ].map((preset) => (
                        <Button
                          key={preset.label}
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setTimeLeft(preset.seconds)
                            setTimerMinutes(Math.floor(preset.seconds / 60))
                            setTimerSeconds(preset.seconds % 60)
                          }}
                          className="bg-transparent"
                        >
                          {preset.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* BMI Calculator Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-primary/20 text-primary border-primary/30" variant="outline">
                <Calculator className="w-3 h-3 mr-1" />
                BMI Calculator
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                Check Your <span className="text-primary">BMI</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Calculate your Body Mass Index and understand your health status
              </p>
            </div>

            <Card className="border-border/50 bg-card">
              <CardHeader>
                <CardTitle>Calculate Your BMI</CardTitle>
                <CardDescription>Enter your height and weight below</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="height">Height (cm)</Label>
                    <Input
                      id="height"
                      type="number"
                      placeholder="175"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="border-border/50 focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      placeholder="70"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="border-border/50 focus:border-primary"
                    />
                  </div>
                </div>
                <Button onClick={calculateBMI} className="w-full bg-primary hover:bg-primary/90">
                  Calculate BMI
                </Button>

                {bmi !== null && (
                  <div className="mt-6 space-y-4 animate-in fade-in slide-in-from-bottom">
                    <div className="p-6 bg-primary/10 rounded-lg border border-primary/30">
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground mb-2">Your BMI</div>
                        <div className="text-5xl font-bold text-primary mb-2">{bmi}</div>
                        <Badge className="bg-primary text-primary-foreground">{bmiCategory}</Badge>
                      </div>
                    </div>

                    {/* AI Recommendations */}
                    {bmiRecommendations && (
                      <div className="p-6 bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-lg border border-primary/20">
                        <div className="flex items-center gap-2 mb-4">
                          <Sparkles className="w-5 h-5 text-primary" />
                          <h4 className="font-bold text-foreground">AI Recommendations</h4>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">{bmiRecommendations.summary}</p>
                        <ul className="space-y-2 mb-4">
                          {bmiRecommendations.tips.slice(0, 4).map((tip: string, i: number) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-muted-foreground">{tip}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="border-primary/30">
                            <Target className="w-3 h-3 mr-1" />
                            {bmiRecommendations.recommendedProgram}
                          </Badge>
                          <Badge variant="outline" className="border-orange-500/30 text-orange-500">
                            {bmiRecommendations.calorieAdvice.split(' ').slice(0, 6).join(' ')}...
                          </Badge>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-secondary/20 text-secondary-foreground border-secondary/30" variant="outline">
              Testimonials
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Success <span className="text-primary">Stories</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {"Hear from our members who've transformed their lives"}
            </p>
            <Dialog open={dialogOpen === 'add-testimonial'} onOpenChange={(open) => setDialogOpen(open ? 'add-testimonial' : null)}>
              <DialogTrigger asChild>
                <Button className="mt-4 bg-primary hover:bg-primary/90">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Testimonial
                </Button>
              </DialogTrigger>
              <TestimonialDialog
                testimonial={null}
                onSave={handleAddTestimonial}
                onClose={() => setDialogOpen(null)}
              />
            </Dialog>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="border-border/50 bg-background group relative">
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <Dialog open={dialogOpen === `edit-testimonial-${testimonial.id}`} onOpenChange={(open) => setDialogOpen(open ? `edit-testimonial-${testimonial.id}` : null)}>
                    <DialogTrigger asChild>
                      <Button size="icon" variant="outline" className="h-8 w-8 bg-card hover:bg-primary hover:text-primary-foreground bg-transparent">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <TestimonialDialog
                      testimonial={testimonial}
                      onSave={handleEditTestimonial}
                      onClose={() => setDialogOpen(null)}
                    />
                  </Dialog>
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-8 w-8 bg-card hover:bg-destructive hover:text-destructive-foreground bg-transparent"
                    onClick={() => handleDeleteTestimonial(testimonial.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <CardHeader>
                  <div className="flex gap-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <CardDescription className="text-foreground/80 leading-relaxed italic">
                    {`"${testimonial.text}"`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="font-semibold text-primary">{testimonial.name}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-primary/20 text-primary border-primary/30" variant="outline">
                Get In Touch
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                Start Your <span className="text-primary">Journey</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                {"Ready to transform? Contact us today and let's get started"}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-border/50 bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="w-5 h-5 text-primary" />
                    Send us a message
                  </CardTitle>
                  <CardDescription>{"AI-powered instant response • We'll follow up within 24 hours"}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">Full Name</Label>
                    <Input
                      id="contact-name"
                      placeholder="John Doe"
                      className="border-border/50 focus:border-primary"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Email</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder="john@example.com"
                      className="border-border/50 focus:border-primary"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-message">Message</Label>
                    <Textarea
                      id="contact-message"
                      placeholder="Tell us about your fitness goals..."
                      className="border-border/50 focus:border-primary min-h-[120px]"
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                    />
                  </div>
                  <Button
                    onClick={handleContactSubmit}
                    disabled={!contactName || !contactEmail || !contactMessage || isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin mr-2">⚡</span>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>

                  {/* AI Response */}
                  {contactResponse && (
                    <div className="mt-4 p-4 bg-gradient-to-br from-green-500/10 to-primary/10 rounded-lg border border-green-500/30 animate-in fade-in slide-in-from-bottom">
                      <div className="flex items-center gap-2 mb-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                        <span className="font-semibold text-foreground">Message Received!</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge className="bg-primary/20 text-primary border-primary/30">
                          {contactResponse.category}
                        </Badge>
                        <Badge variant="outline" className={contactResponse.priority === 'Urgent' ? 'border-red-500/50 text-red-500' : contactResponse.priority === 'High' ? 'border-orange-500/50 text-orange-500' : ''}>
                          {contactResponse.priority} Priority
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{contactResponse.autoResponse}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>Estimated response: {contactResponse.estimatedResponseTime}</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card className="border-border/50 bg-card">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1 text-foreground">Phone</h3>
                        <p className="text-muted-foreground">+1 (555) 123-4567</p>
                        <p className="text-sm text-muted-foreground">Mon-Fri 6am-10pm</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/50 bg-card">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1 text-foreground">Email</h3>
                        <p className="text-muted-foreground">info@alphagym.com</p>
                        <p className="text-sm text-muted-foreground">24/7 support</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/50 bg-card">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1 text-foreground">Location</h3>
                        <p className="text-muted-foreground">123 Fitness Street</p>
                        <p className="text-muted-foreground">New York, NY 10001</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <Dumbbell className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">Alpha Gym</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Building stronger, healthier, and more confident individuals every day.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-foreground">Quick Links</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><button onClick={() => scrollToSection('about')} className="hover:text-primary transition-colors">About Us</button></li>
                <li><button onClick={() => scrollToSection('programs')} className="hover:text-primary transition-colors">Programs</button></li>
                <li><button onClick={() => scrollToSection('trainers')} className="hover:text-primary transition-colors">Trainers</button></li>
                <li><button onClick={() => scrollToSection('pricing')} className="hover:text-primary transition-colors">Pricing</button></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-foreground">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                <li><button onClick={() => scrollToSection('contact')} className="hover:text-primary transition-colors">Contact</button></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-foreground">Hours</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Monday - Friday: 5am - 11pm</li>
                <li>Saturday - Sunday: 7am - 9pm</li>
                <li className="text-primary font-semibold">24/7 for Premium Members</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>&copy; 2025 Alpha Gym. All rights reserved. Built for champions.</p>
          </div>
        </div>
      </footer>

      {/* Floating AI Chatbot */}
      <AIChatbot />
    </div>
  )
}

// Dialog Components
function ProgramDialog({ program, onSave, onClose }: { program: any, onSave: (p: any) => void, onClose: () => void }) {
  const [formData, setFormData] = useState(program || { title: '', description: '', icon: 'Dumbbell' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <DialogContent className="bg-card">
      <DialogHeader>
        <DialogTitle>{program ? 'Edit Program' : 'Add New Program'}</DialogTitle>
        <DialogDescription>
          {program ? 'Update the program details below.' : 'Fill in the details for the new program.'}
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="program-title">Program Title</Label>
          <Input
            id="program-title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g., Muscle Gain"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="program-description">Description</Label>
          <Textarea
            id="program-description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Describe the program..."
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="program-icon">Icon</Label>
          <Select value={formData.icon} onValueChange={(value) => setFormData({ ...formData, icon: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select an icon" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Dumbbell">Dumbbell</SelectItem>
              <SelectItem value="TrendingUp">Trending Up</SelectItem>
              <SelectItem value="Heart">Heart</SelectItem>
              <SelectItem value="Target">Target</SelectItem>
              <SelectItem value="Zap">Zap</SelectItem>
              <SelectItem value="Users">Users</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose} className="bg-transparent">
            Cancel
          </Button>
          <Button type="submit" className="bg-primary hover:bg-primary/90">
            {program ? 'Save Changes' : 'Add Program'}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}

function TrainerDialog({ trainer, onSave, onClose }: { trainer: any, onSave: (t: any) => void, onClose: () => void }) {
  const [formData, setFormData] = useState(trainer || { name: '', specialization: '', experience: '', rating: 5 })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <DialogContent className="bg-card">
      <DialogHeader>
        <DialogTitle>{trainer ? 'Edit Trainer' : 'Add New Trainer'}</DialogTitle>
        <DialogDescription>
          {trainer ? 'Update the trainer details below.' : 'Fill in the details for the new trainer.'}
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="trainer-name">Name</Label>
          <Input
            id="trainer-name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g., Marcus Steel"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="trainer-specialization">Specialization</Label>
          <Input
            id="trainer-specialization"
            value={formData.specialization}
            onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
            placeholder="e.g., Strength & Conditioning"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="trainer-experience">Experience</Label>
          <Input
            id="trainer-experience"
            value={formData.experience}
            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
            placeholder="e.g., 10+ Years"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="trainer-rating">Rating</Label>
          <Select value={formData.rating.toString()} onValueChange={(value) => setFormData({ ...formData, rating: parseFloat(value) })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="4.5">4.5</SelectItem>
              <SelectItem value="4.6">4.6</SelectItem>
              <SelectItem value="4.7">4.7</SelectItem>
              <SelectItem value="4.8">4.8</SelectItem>
              <SelectItem value="4.9">4.9</SelectItem>
              <SelectItem value="5.0">5.0</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose} className="bg-transparent">
            Cancel
          </Button>
          <Button type="submit" className="bg-primary hover:bg-primary/90">
            {trainer ? 'Save Changes' : 'Add Trainer'}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}

function PlanDialog({ plan, onSave, onClose }: { plan: any, onSave: (p: any) => void, onClose: () => void }) {
  const [formData, setFormData] = useState(plan || { name: '', price: '', period: '/month', features: [], popular: false })
  const [newFeature, setNewFeature] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData({ ...formData, features: [...formData.features, newFeature] })
      setNewFeature('')
    }
  }

  const removeFeature = (index: number) => {
    setFormData({ ...formData, features: formData.features.filter((_: any, i: number) => i !== index) })
  }

  return (
    <DialogContent className="bg-card max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>{plan ? 'Edit Plan' : 'Add New Plan'}</DialogTitle>
        <DialogDescription>
          {plan ? 'Update the plan details below.' : 'Fill in the details for the new plan.'}
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="plan-name">Plan Name</Label>
          <Input
            id="plan-name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g., Basic"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="plan-price">Price</Label>
            <Input
              id="plan-price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="e.g., $29"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="plan-period">Period</Label>
            <Input
              id="plan-period"
              value={formData.period}
              onChange={(e) => setFormData({ ...formData, period: e.target.value })}
              placeholder="e.g., /month"
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Features</Label>
          <div className="flex gap-2">
            <Input
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              placeholder="Add a feature..."
            />
            <Button type="button" onClick={addFeature} size="icon" className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <ul className="space-y-2 mt-2">
            {formData.features.map((feature: string, index: number) => (
              <li key={index} className="flex items-center justify-between bg-muted px-3 py-2 rounded">
                <span className="text-sm">{feature}</span>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="h-6 w-6"
                  onClick={() => removeFeature(index)}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="plan-popular"
            checked={formData.popular}
            onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
            className="rounded"
          />
          <Label htmlFor="plan-popular">Mark as Popular</Label>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose} className="bg-transparent">
            Cancel
          </Button>
          <Button type="submit" className="bg-primary hover:bg-primary/90">
            {plan ? 'Save Changes' : 'Add Plan'}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}

function TestimonialDialog({ testimonial, onSave, onClose }: { testimonial: any, onSave: (t: any) => void, onClose: () => void }) {
  const [formData, setFormData] = useState(testimonial || { name: '', text: '', rating: 5 })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <DialogContent className="bg-card">
      <DialogHeader>
        <DialogTitle>{testimonial ? 'Edit Testimonial' : 'Add New Testimonial'}</DialogTitle>
        <DialogDescription>
          {testimonial ? 'Update the testimonial details below.' : 'Fill in the details for the new testimonial.'}
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="testimonial-name">Name</Label>
          <Input
            id="testimonial-name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g., John Martinez"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="testimonial-text">Testimonial</Label>
          <Textarea
            id="testimonial-text"
            value={formData.text}
            onChange={(e) => setFormData({ ...formData, text: e.target.value })}
            placeholder="Share the success story..."
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="testimonial-rating">Rating</Label>
          <Select value={formData.rating.toString()} onValueChange={(value) => setFormData({ ...formData, rating: parseInt(value) })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 Star</SelectItem>
              <SelectItem value="2">2 Stars</SelectItem>
              <SelectItem value="3">3 Stars</SelectItem>
              <SelectItem value="4">4 Stars</SelectItem>
              <SelectItem value="5">5 Stars</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose} className="bg-transparent">
            Cancel
          </Button>
          <Button type="submit" className="bg-primary hover:bg-primary/90">
            {testimonial ? 'Save Changes' : 'Add Testimonial'}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
