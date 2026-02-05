// AI Utilities and Knowledge Base for Alpha Gym

// Gym Knowledge Base
export const gymKnowledge = {
    hours: {
        weekday: "Monday - Friday: 5am - 11pm",
        weekend: "Saturday - Sunday: 7am - 9pm",
        premium: "24/7 for Premium Members"
    },
    pricing: {
        basic: { name: "Basic", price: "$29/month", features: ["Gym Access", "Locker Room", "Free WiFi", "Basic Equipment"] },
        standard: { name: "Standard", price: "$59/month", features: ["All Basic Features", "Group Classes", "Nutrition Guide", "Shower Facilities", "Free Parking"] },
        premium: { name: "Premium", price: "$99/month", features: ["All Standard Features", "Personal Training", "Meal Planning", "Sauna & Steam Room", "24/7 Access", "Guest Passes"] }
    },
    contact: {
        phone: "+1 (555) 123-4567",
        email: "info@alphagym.com",
        address: "123 Fitness Street, New York, NY 10001"
    },
    programs: ["Muscle Gain", "Weight Loss", "Cardio Training", "Yoga & Flexibility"],
    trainers: ["Marcus Steel - Strength & Conditioning", "Sarah Phoenix - CrossFit & HIIT", "David Iron - Bodybuilding", "Emma Flex - Yoga & Pilates"]
};

// Workout Database
export const exerciseDatabase = {
    chest: [
        { name: "Bench Press", sets: 4, reps: "8-12", equipment: "Barbell" },
        { name: "Incline Dumbbell Press", sets: 3, reps: "10-12", equipment: "Dumbbells" },
        { name: "Cable Flyes", sets: 3, reps: "12-15", equipment: "Cable Machine" },
        { name: "Push-Ups", sets: 3, reps: "15-20", equipment: "None" },
        { name: "Dips", sets: 3, reps: "10-12", equipment: "Dip Station" }
    ],
    back: [
        { name: "Deadlifts", sets: 4, reps: "6-8", equipment: "Barbell" },
        { name: "Pull-Ups", sets: 4, reps: "8-12", equipment: "Pull-up Bar" },
        { name: "Bent Over Rows", sets: 4, reps: "8-10", equipment: "Barbell" },
        { name: "Lat Pulldowns", sets: 3, reps: "10-12", equipment: "Cable Machine" },
        { name: "Seated Cable Rows", sets: 3, reps: "10-12", equipment: "Cable Machine" }
    ],
    shoulders: [
        { name: "Overhead Press", sets: 4, reps: "8-10", equipment: "Barbell" },
        { name: "Lateral Raises", sets: 3, reps: "12-15", equipment: "Dumbbells" },
        { name: "Front Raises", sets: 3, reps: "12-15", equipment: "Dumbbells" },
        { name: "Reverse Flyes", sets: 3, reps: "12-15", equipment: "Dumbbells" },
        { name: "Arnold Press", sets: 3, reps: "10-12", equipment: "Dumbbells" }
    ],
    legs: [
        { name: "Squats", sets: 4, reps: "8-12", equipment: "Barbell" },
        { name: "Leg Press", sets: 4, reps: "10-12", equipment: "Leg Press Machine" },
        { name: "Romanian Deadlifts", sets: 3, reps: "10-12", equipment: "Barbell" },
        { name: "Leg Curls", sets: 3, reps: "12-15", equipment: "Machine" },
        { name: "Calf Raises", sets: 4, reps: "15-20", equipment: "Machine" }
    ],
    arms: [
        { name: "Barbell Curls", sets: 3, reps: "10-12", equipment: "Barbell" },
        { name: "Tricep Pushdowns", sets: 3, reps: "12-15", equipment: "Cable Machine" },
        { name: "Hammer Curls", sets: 3, reps: "10-12", equipment: "Dumbbells" },
        { name: "Skull Crushers", sets: 3, reps: "10-12", equipment: "EZ Bar" },
        { name: "Concentration Curls", sets: 3, reps: "12-15", equipment: "Dumbbells" }
    ],
    core: [
        { name: "Planks", sets: 3, reps: "60 sec", equipment: "None" },
        { name: "Hanging Leg Raises", sets: 3, reps: "12-15", equipment: "Pull-up Bar" },
        { name: "Cable Crunches", sets: 3, reps: "15-20", equipment: "Cable Machine" },
        { name: "Russian Twists", sets: 3, reps: "20 each side", equipment: "Medicine Ball" },
        { name: "Ab Wheel Rollouts", sets: 3, reps: "10-12", equipment: "Ab Wheel" }
    ],
    cardio: [
        { name: "Treadmill Running", duration: "20-30 min", intensity: "Moderate" },
        { name: "Cycling", duration: "25-35 min", intensity: "Moderate-High" },
        { name: "Rowing", duration: "15-20 min", intensity: "High" },
        { name: "Jump Rope", duration: "10-15 min", intensity: "High" },
        { name: "Stair Climber", duration: "15-20 min", intensity: "Moderate-High" }
    ]
};

// Meal Database
export const mealDatabase = {
    breakfast: [
        { name: "Protein Oatmeal", calories: 450, protein: 30, carbs: 55, fat: 12, ingredients: ["Oats", "Whey protein", "Banana", "Almond butter"] },
        { name: "Egg White Omelette", calories: 320, protein: 35, carbs: 10, fat: 15, ingredients: ["6 egg whites", "Spinach", "Tomatoes", "Feta cheese"] },
        { name: "Greek Yogurt Bowl", calories: 380, protein: 25, carbs: 45, fat: 10, ingredients: ["Greek yogurt", "Berries", "Granola", "Honey"] },
        { name: "Avocado Toast with Eggs", calories: 420, protein: 20, carbs: 35, fat: 25, ingredients: ["Whole grain bread", "Avocado", "2 eggs", "Cherry tomatoes"] },
        { name: "Protein Smoothie", calories: 350, protein: 35, carbs: 40, fat: 8, ingredients: ["Whey protein", "Banana", "Oat milk", "Peanut butter"] }
    ],
    lunch: [
        { name: "Grilled Chicken Salad", calories: 480, protein: 45, carbs: 25, fat: 22, ingredients: ["Chicken breast", "Mixed greens", "Avocado", "Olive oil dressing"] },
        { name: "Quinoa Power Bowl", calories: 520, protein: 28, carbs: 60, fat: 18, ingredients: ["Quinoa", "Chickpeas", "Roasted vegetables", "Tahini"] },
        { name: "Turkey Wrap", calories: 450, protein: 35, carbs: 40, fat: 18, ingredients: ["Whole wheat wrap", "Turkey", "Hummus", "Vegetables"] },
        { name: "Salmon with Rice", calories: 550, protein: 40, carbs: 45, fat: 22, ingredients: ["Salmon fillet", "Brown rice", "Steamed broccoli", "Lemon"] },
        { name: "Lean Beef Stir-Fry", calories: 480, protein: 38, carbs: 35, fat: 20, ingredients: ["Lean beef strips", "Mixed vegetables", "Brown rice", "Soy sauce"] }
    ],
    dinner: [
        { name: "Baked Chicken with Vegetables", calories: 520, protein: 48, carbs: 30, fat: 22, ingredients: ["Chicken thigh", "Sweet potato", "Brussels sprouts", "Olive oil"] },
        { name: "Grilled Steak with Salad", calories: 580, protein: 52, carbs: 15, fat: 35, ingredients: ["Sirloin steak", "Mixed greens", "Cherry tomatoes", "Balsamic"] },
        { name: "Fish Tacos", calories: 450, protein: 35, carbs: 40, fat: 18, ingredients: ["White fish", "Corn tortillas", "Cabbage slaw", "Lime crema"] },
        { name: "Pasta with Turkey Meatballs", calories: 620, protein: 42, carbs: 65, fat: 20, ingredients: ["Whole wheat pasta", "Turkey meatballs", "Marinara sauce", "Parmesan"] },
        { name: "Grilled Salmon Bowl", calories: 540, protein: 45, carbs: 40, fat: 25, ingredients: ["Salmon", "Quinoa", "Edamame", "Avocado", "Ginger dressing"] }
    ],
    snacks: [
        { name: "Protein Bar", calories: 200, protein: 20, carbs: 22, fat: 8 },
        { name: "Mixed Nuts", calories: 180, protein: 6, carbs: 8, fat: 16 },
        { name: "Apple with Almond Butter", calories: 220, protein: 5, carbs: 28, fat: 12 },
        { name: "Cottage Cheese with Berries", calories: 180, protein: 20, carbs: 15, fat: 5 },
        { name: "Hard Boiled Eggs (2)", calories: 140, protein: 12, carbs: 1, fat: 10 }
    ]
};

// AI Response Generator for Chatbot
export function generateChatResponse(message: string): string {
    const lowerMessage = message.toLowerCase();

    // Greetings
    if (lowerMessage.match(/^(hi|hello|hey|good morning|good evening)/)) {
        return "Hello! 💪 Welcome to Alpha Gym! I'm your AI fitness assistant. How can I help you today? I can answer questions about our programs, pricing, trainers, or give you fitness tips!";
    }

    // Hours
    if (lowerMessage.includes("hour") || lowerMessage.includes("open") || lowerMessage.includes("close") || lowerMessage.includes("time")) {
        return `🕐 Our gym hours are:\n\n• ${gymKnowledge.hours.weekday}\n• ${gymKnowledge.hours.weekend}\n• ${gymKnowledge.hours.premium}\n\nNeed anything else?`;
    }

    // Pricing
    if (lowerMessage.includes("price") || lowerMessage.includes("cost") || lowerMessage.includes("membership") || lowerMessage.includes("plan")) {
        return `💰 Our membership plans:\n\n🔹 **Basic**: ${gymKnowledge.pricing.basic.price}\n   ${gymKnowledge.pricing.basic.features.slice(0, 2).join(", ")}\n\n🔹 **Standard**: ${gymKnowledge.pricing.standard.price} ⭐ Most Popular\n   ${gymKnowledge.pricing.standard.features.slice(0, 3).join(", ")}\n\n🔹 **Premium**: ${gymKnowledge.pricing.premium.price}\n   ${gymKnowledge.pricing.premium.features.slice(0, 3).join(", ")}\n\nWant me to explain any plan in detail?`;
    }

    // Contact
    if (lowerMessage.includes("contact") || lowerMessage.includes("phone") || lowerMessage.includes("email") || lowerMessage.includes("address") || lowerMessage.includes("location")) {
        return `📍 Contact us:\n\n📞 Phone: ${gymKnowledge.contact.phone}\n✉️ Email: ${gymKnowledge.contact.email}\n🏢 Address: ${gymKnowledge.contact.address}\n\nWe're here to help!`;
    }

    // Trainers
    if (lowerMessage.includes("trainer") || lowerMessage.includes("coach") || lowerMessage.includes("instructor")) {
        return `👥 Our expert trainers:\n\n${gymKnowledge.trainers.map((t, i) => `${i + 1}. ${t}`).join("\n")}\n\nAll our trainers are certified professionals with years of experience. Would you like to book a session?`;
    }

    // Programs
    if (lowerMessage.includes("program") || lowerMessage.includes("class") || lowerMessage.includes("workout")) {
        return `🏋️ Our training programs:\n\n${gymKnowledge.programs.map((p, i) => `${i + 1}. ${p}`).join("\n")}\n\nEach program is designed by experts for maximum results. Which one interests you?`;
    }

    // Weight loss
    if (lowerMessage.includes("weight loss") || lowerMessage.includes("lose weight") || lowerMessage.includes("fat") || lowerMessage.includes("slim")) {
        return "🔥 For weight loss, I recommend:\n\n1. **Cardio Training** - Burns calories efficiently\n2. **HIIT Workouts** - Maximum fat burn in minimum time\n3. **Strength Training** - Builds muscle to boost metabolism\n\nCombine with our nutrition guide for best results! Would you like a personalized plan?";
    }

    // Muscle gain
    if (lowerMessage.includes("muscle") || lowerMessage.includes("bulk") || lowerMessage.includes("gain") || lowerMessage.includes("strength")) {
        return "💪 For muscle gain, I recommend:\n\n1. **Muscle Gain Program** - Progressive overload training\n2. **High protein diet** - 1.6-2.2g per kg bodyweight\n3. **Adequate rest** - 7-9 hours of sleep\n\nOur trainers can create a personalized hypertrophy plan. Interested?";
    }

    // Diet/Nutrition
    if (lowerMessage.includes("diet") || lowerMessage.includes("nutrition") || lowerMessage.includes("eat") || lowerMessage.includes("food") || lowerMessage.includes("meal")) {
        return "🥗 Nutrition tips:\n\n• **Protein**: Essential for muscle repair (chicken, fish, eggs, legumes)\n• **Carbs**: Energy for workouts (oats, rice, vegetables)\n• **Fats**: Hormonal health (avocado, nuts, olive oil)\n• **Hydration**: Drink 2-3 liters of water daily\n\nOur Standard and Premium plans include nutrition guides! Check out our AI Nutrition Assistant too! 🍎";
    }

    // BMI
    if (lowerMessage.includes("bmi") || lowerMessage.includes("body mass")) {
        return "📊 BMI (Body Mass Index) helps assess healthy weight:\n\n• Under 18.5: Underweight\n• 18.5-24.9: Normal\n• 25-29.9: Overweight\n• 30+: Obese\n\nTry our BMI calculator on this page! Scroll down to find it. 📉";
    }

    // Beginner
    if (lowerMessage.includes("beginner") || lowerMessage.includes("start") || lowerMessage.includes("new") || lowerMessage.includes("first time")) {
        return "🌟 Welcome to your fitness journey!\n\nFor beginners, I recommend:\n\n1. Start with our **Basic** membership\n2. Book a free consultation with a trainer\n3. Begin with 3 days/week of training\n4. Focus on learning proper form\n\nOur trainers love helping beginners! Ready to start?";
    }

    // Thank you
    if (lowerMessage.includes("thank") || lowerMessage.includes("thanks")) {
        return "You're welcome! 😊 If you have any more questions, I'm here to help. See you at Alpha Gym! 💪";
    }

    // Goodbye
    if (lowerMessage.includes("bye") || lowerMessage.includes("goodbye") || lowerMessage.includes("see you")) {
        return "Goodbye! 👋 Remember, every workout counts. See you at Alpha Gym! 💪🔥";
    }

    // Default response
    return "I'm here to help with anything related to Alpha Gym! 💪\n\nI can tell you about:\n• 🕐 Gym hours\n• 💰 Membership pricing\n• 🏋️ Training programs\n• 👥 Our trainers\n• 🥗 Nutrition tips\n• 📍 Contact & location\n\nWhat would you like to know?";
}

// AI Workout Plan Generator
export function generateWorkoutPlan(
    goal: string,
    level: string,
    daysPerWeek: number,
    equipment: string
): { day: string; focus: string; exercises: any[] }[] {
    const plan: { day: string; focus: string; exercises: any[] }[] = [];
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    // Determine workout split based on days per week
    let splits: { focus: string; muscles: string[] }[] = [];

    if (daysPerWeek <= 3) {
        splits = [
            { focus: "Full Body A", muscles: ["chest", "back", "legs", "core"] },
            { focus: "Full Body B", muscles: ["shoulders", "arms", "legs", "cardio"] },
            { focus: "Full Body C", muscles: ["chest", "back", "arms", "core"] }
        ];
    } else if (daysPerWeek <= 4) {
        splits = [
            { focus: "Upper Body", muscles: ["chest", "back", "shoulders"] },
            { focus: "Lower Body", muscles: ["legs", "core"] },
            { focus: "Push Day", muscles: ["chest", "shoulders", "arms"] },
            { focus: "Pull Day", muscles: ["back", "arms", "core"] }
        ];
    } else {
        splits = [
            { focus: "Chest & Triceps", muscles: ["chest", "arms"] },
            { focus: "Back & Biceps", muscles: ["back", "arms"] },
            { focus: "Shoulders & Core", muscles: ["shoulders", "core"] },
            { focus: "Legs", muscles: ["legs"] },
            { focus: "Full Body & Cardio", muscles: ["chest", "back", "cardio"] },
            { focus: "Arms & Core", muscles: ["arms", "core"] }
        ];
    }

    // Generate plan for selected days
    let dayIndex = 0;
    let splitIndex = 0;
    let workoutDaysAdded = 0;

    while (workoutDaysAdded < daysPerWeek && dayIndex < 7) {
        const split = splits[splitIndex % splits.length];
        const exercises: any[] = [];

        // Add exercises from each muscle group
        split.muscles.forEach(muscle => {
            const muscleExercises = exerciseDatabase[muscle as keyof typeof exerciseDatabase];
            if (muscleExercises) {
                // Filter by equipment if specified
                let available = muscleExercises;
                if (equipment === "none") {
                    available = muscleExercises.filter((e: any) =>
                        e.equipment === "None" || e.equipment === "Pull-up Bar" || !e.equipment
                    );
                } else if (equipment === "basic") {
                    available = muscleExercises.filter((e: any) =>
                        e.equipment !== "Cable Machine" && e.equipment !== "Machine"
                    );
                }

                if (available.length > 0) {
                    // Pick 1-2 exercises per muscle group
                    const count = level === "beginner" ? 1 : 2;
                    for (let i = 0; i < Math.min(count, available.length); i++) {
                        exercises.push(available[i]);
                    }
                }
            }
        });

        // Adjust sets/reps based on goal and level
        const adjustedExercises = exercises.map(ex => {
            let sets = ex.sets || 3;
            let reps = ex.reps || "10-12";

            if (level === "beginner") {
                sets = Math.max(2, sets - 1);
            } else if (level === "advanced") {
                sets = Math.min(5, sets + 1);
            }

            if (goal === "weight-loss" && !ex.duration) {
                reps = "15-20";
            } else if (goal === "muscle-gain") {
                reps = "6-10";
            }

            return { ...ex, sets, reps };
        });

        plan.push({
            day: days[dayIndex],
            focus: split.focus,
            exercises: adjustedExercises
        });

        workoutDaysAdded++;
        splitIndex++;

        // Skip a day for rest if training less than 6 days
        if (daysPerWeek < 6) {
            dayIndex += 2;
        } else {
            dayIndex++;
        }
    }

    return plan;
}

// AI Nutrition Plan Generator
export function generateMealPlan(
    goal: string,
    dietType: string,
    targetCalories: number
): { type: string; meal: any; quantity: string }[] {
    const meals: { type: string; meal: any; quantity: string }[] = [];

    // Calculate macro distribution based on goal
    let proteinRatio = 0.3;
    let carbRatio = 0.4;
    let fatRatio = 0.3;

    if (goal === "muscle-gain") {
        proteinRatio = 0.35;
        carbRatio = 0.45;
        fatRatio = 0.2;
    } else if (goal === "weight-loss") {
        proteinRatio = 0.4;
        carbRatio = 0.3;
        fatRatio = 0.3;
    }

    // Calorie distribution
    const breakfastCals = targetCalories * 0.25;
    const lunchCals = targetCalories * 0.3;
    const dinnerCals = targetCalories * 0.3;
    const snackCals = targetCalories * 0.15;

    // Select meals based on calorie targets
    const selectMeal = (mealType: keyof typeof mealDatabase, targetCals: number) => {
        const options = mealDatabase[mealType];
        // Find closest match to target calories
        let best = options[0];
        let bestDiff = Math.abs(options[0].calories - targetCals);

        options.forEach(meal => {
            const diff = Math.abs(meal.calories - targetCals);
            if (diff < bestDiff) {
                best = meal;
                bestDiff = diff;
            }
        });

        // Calculate quantity adjustment
        const ratio = targetCals / best.calories;
        let quantity = "1 serving";
        if (ratio < 0.8) quantity = "3/4 serving";
        else if (ratio > 1.2) quantity = "1.5 servings";
        else if (ratio > 1.4) quantity = "2 servings";

        return { meal: best, quantity };
    };

    const breakfast = selectMeal("breakfast", breakfastCals);
    const lunch = selectMeal("lunch", lunchCals);
    const dinner = selectMeal("dinner", dinnerCals);
    const snack = selectMeal("snacks", snackCals);

    meals.push({ type: "Breakfast", ...breakfast });
    meals.push({ type: "Lunch", ...lunch });
    meals.push({ type: "Dinner", ...dinner });
    meals.push({ type: "Snack", ...snack });

    return meals;
}

// AI BMI Recommendations
export function getBMIRecommendations(bmi: number, category: string): {
    summary: string;
    tips: string[];
    recommendedProgram: string;
    calorieAdvice: string;
} {
    if (category === "Underweight") {
        return {
            summary: "Your BMI indicates you're underweight. Focus on healthy weight gain through proper nutrition and strength training.",
            tips: [
                "Increase calorie intake by 300-500 calories daily",
                "Focus on protein-rich foods (1.6-2g per kg bodyweight)",
                "Incorporate strength training 3-4 times per week",
                "Eat more frequent, nutrient-dense meals",
                "Consider healthy weight gain shakes"
            ],
            recommendedProgram: "Muscle Gain",
            calorieAdvice: "Aim for a caloric surplus of 300-500 calories above your maintenance level"
        };
    } else if (category === "Normal weight") {
        return {
            summary: "Great job! Your BMI is in the healthy range. Focus on maintaining this through balanced nutrition and regular exercise.",
            tips: [
                "Maintain a balanced diet with all macronutrients",
                "Exercise 3-5 times per week for overall fitness",
                "Mix cardio and strength training",
                "Stay hydrated (2-3 liters daily)",
                "Get 7-9 hours of quality sleep"
            ],
            recommendedProgram: "Your choice based on fitness goals",
            calorieAdvice: "Maintain your current calorie intake for weight maintenance"
        };
    } else if (category === "Overweight") {
        return {
            summary: "Your BMI indicates you're slightly overweight. A combination of cardio and strength training with a moderate calorie deficit can help.",
            tips: [
                "Create a mild calorie deficit (300-500 below maintenance)",
                "Increase protein intake to preserve muscle",
                "Aim for 150+ minutes of cardio per week",
                "Add strength training 2-3 times per week",
                "Reduce processed foods and sugary drinks"
            ],
            recommendedProgram: "Weight Loss",
            calorieAdvice: "Reduce daily calories by 300-500 from your maintenance level"
        };
    } else {
        return {
            summary: "Your BMI indicates obesity. We recommend consulting with a healthcare provider and starting with low-impact exercises.",
            tips: [
                "Start with low-impact activities (walking, swimming)",
                "Gradually increase activity duration and intensity",
                "Focus on whole foods and portion control",
                "Consider working with a personal trainer",
                "Track your food intake for awareness"
            ],
            recommendedProgram: "Weight Loss (start with Cardio Training)",
            calorieAdvice: "Create a sustainable calorie deficit of 500-750 calories daily"
        };
    }
}

// AI Program Recommender
export function recommendProgram(answers: {
    goal: string;
    experience: string;
    timeCommitment: string;
    preference: string;
    injuries: string;
}): {
    program: string;
    matchPercentage: number;
    reasons: string[];
    alternates: string[];
} {
    let scores: { [key: string]: number } = {
        "Muscle Gain": 0,
        "Weight Loss": 0,
        "Cardio Training": 0,
        "Yoga & Flexibility": 0
    };

    // Goal scoring
    if (answers.goal === "build-muscle") {
        scores["Muscle Gain"] += 40;
        scores["Weight Loss"] += 10;
    } else if (answers.goal === "lose-weight") {
        scores["Weight Loss"] += 40;
        scores["Cardio Training"] += 25;
    } else if (answers.goal === "improve-endurance") {
        scores["Cardio Training"] += 40;
        scores["Weight Loss"] += 15;
    } else if (answers.goal === "flexibility") {
        scores["Yoga & Flexibility"] += 40;
    } else if (answers.goal === "general-fitness") {
        scores["Muscle Gain"] += 20;
        scores["Cardio Training"] += 20;
        scores["Yoga & Flexibility"] += 15;
    }

    // Experience scoring
    if (answers.experience === "beginner") {
        scores["Yoga & Flexibility"] += 15;
        scores["Cardio Training"] += 10;
    } else if (answers.experience === "intermediate") {
        scores["Muscle Gain"] += 15;
        scores["Weight Loss"] += 15;
    } else {
        scores["Muscle Gain"] += 20;
        scores["Weight Loss"] += 10;
    }

    // Time commitment
    if (answers.timeCommitment === "short") {
        scores["Cardio Training"] += 15;
    } else if (answers.timeCommitment === "long") {
        scores["Muscle Gain"] += 15;
    }

    // Preference
    if (answers.preference === "strength") {
        scores["Muscle Gain"] += 20;
    } else if (answers.preference === "cardio") {
        scores["Cardio Training"] += 20;
        scores["Weight Loss"] += 10;
    } else if (answers.preference === "mind-body") {
        scores["Yoga & Flexibility"] += 25;
    }

    // Injuries consideration
    if (answers.injuries === "yes") {
        scores["Yoga & Flexibility"] += 20;
        scores["Muscle Gain"] -= 10;
    }

    // Find top program
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const topProgram = sorted[0][0];
    const topScore = sorted[0][1];

    // Calculate match percentage (max possible ~80)
    const matchPercentage = Math.min(98, Math.round((topScore / 80) * 100));

    // Generate reasons
    const reasons: string[] = [];
    if (answers.goal === "build-muscle" && topProgram === "Muscle Gain") {
        reasons.push("Aligns perfectly with your muscle-building goal");
    }
    if (answers.goal === "lose-weight" && (topProgram === "Weight Loss" || topProgram === "Cardio Training")) {
        reasons.push("Optimized for fat burning and calorie expenditure");
    }
    if (answers.experience === "beginner") {
        reasons.push("Includes beginner-friendly progressions");
    }
    if (answers.preference === "strength" && topProgram === "Muscle Gain") {
        reasons.push("Matches your strength training preference");
    }
    if (answers.injuries === "yes" && topProgram === "Yoga & Flexibility") {
        reasons.push("Low-impact and safe for recovery");
    }
    reasons.push("Suited to your available time commitment");

    return {
        program: topProgram,
        matchPercentage,
        reasons: reasons.slice(0, 3),
        alternates: sorted.slice(1, 3).map(s => s[0])
    };
}

// Smart Contact Form Categorization
export function categorizeInquiry(message: string): {
    category: string;
    priority: string;
    autoResponse: string;
    estimatedResponseTime: string;
} {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes("membership") || lowerMessage.includes("join") || lowerMessage.includes("sign up") || lowerMessage.includes("pricing")) {
        return {
            category: "Membership Inquiry",
            priority: "High",
            autoResponse: "Thank you for your interest in Alpha Gym! 🎉 Our team will contact you within 2 hours with membership details and a special welcome offer. In the meantime, check out our pricing section above!",
            estimatedResponseTime: "Within 2 hours"
        };
    }

    if (lowerMessage.includes("trainer") || lowerMessage.includes("personal training") || lowerMessage.includes("coach")) {
        return {
            category: "Personal Training",
            priority: "High",
            autoResponse: "Great choice! 💪 Personal training is the fastest way to achieve your goals. Our team will reach out within 4 hours to understand your needs and match you with the perfect trainer.",
            estimatedResponseTime: "Within 4 hours"
        };
    }

    if (lowerMessage.includes("cancel") || lowerMessage.includes("refund") || lowerMessage.includes("complaint")) {
        return {
            category: "Support Request",
            priority: "Urgent",
            autoResponse: "We're sorry to hear you're having an issue. A member of our support team will contact you within 1 hour to resolve this. Your satisfaction is our priority! 🙏",
            estimatedResponseTime: "Within 1 hour"
        };
    }

    if (lowerMessage.includes("class") || lowerMessage.includes("schedule") || lowerMessage.includes("time")) {
        return {
            category: "Class Schedule",
            priority: "Medium",
            autoResponse: "Thanks for your interest in our classes! 🏋️ We'll send you our complete class schedule within 4 hours. You can also check out our Programs section above!",
            estimatedResponseTime: "Within 4 hours"
        };
    }

    if (lowerMessage.includes("tour") || lowerMessage.includes("visit") || lowerMessage.includes("see")) {
        return {
            category: "Facility Tour",
            priority: "High",
            autoResponse: "We'd love to show you around! 🏢 Our team will contact you within 2 hours to schedule a personalized tour of our facilities. Tours are available daily!",
            estimatedResponseTime: "Within 2 hours"
        };
    }

    return {
        category: "General Inquiry",
        priority: "Medium",
        autoResponse: "Thank you for reaching out to Alpha Gym! 📩 One of our team members will get back to you within 24 hours. We appreciate your patience!",
        estimatedResponseTime: "Within 24 hours"
    };
}
