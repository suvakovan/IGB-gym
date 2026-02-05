import { fetchFullExerciseDatabase, fetchFullMealDatabase } from './data';

// Gym Knowledge Base (Static Fallback / Reference)
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

// AI Response Generator for Chatbot (Static Fallback)
export function generateChatResponse(message: string): string {
    const lowerMessage = message.toLowerCase();

    // Greetings
    if (lowerMessage.match(/^(hi|hello|hey|good morning|good evening)/)) {
        return "Hello! 💪 Welcome to Alpha Gym! I'm your AI fitness assistant. How can I help you today? I can answer questions about our programs, pricing, trainers, or give you fitness tips!";
    }

    // Default response (Simplified fallback)
    return "I'm connected to the Alpha Brain! Ask me about hours, pricing, or fitness tips! 💪";
}

// AI Workout Plan Generator
export async function generateWorkoutPlan(
    goal: string,
    level: string,
    daysPerWeek: number,
    equipment: string
): Promise<{ day: string; focus: string; exercises: any[] }[]> {

    // Fetch Data
    const exerciseDatabase = await fetchFullExerciseDatabase();

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
            const muscleExercises = exerciseDatabase[muscle] || [];

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
                        // Use loop index to pick, maybe randomize later? For now strict order is fine or simple modulus
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
export async function generateMealPlan(
    goal: string,
    dietType: string,
    targetCalories: number
): Promise<{ type: string; meal: any; quantity: string }[]> {

    // Fetch Data
    const mealDatabase = await fetchFullMealDatabase();

    const meals: { type: string; meal: any; quantity: string }[] = [];

    // Calorie distribution
    const breakfastCals = targetCalories * 0.25;
    const lunchCals = targetCalories * 0.3;
    const dinnerCals = targetCalories * 0.3;
    const snackCals = targetCalories * 0.15;

    // Select meals based on calorie targets
    const selectMeal = (mealType: string, targetCals: number) => {
        const options = mealDatabase[mealType] || [];
        if (options.length === 0) return { meal: { name: "Generic Meal", calories: 400, protein: 30, carbs: 40, fat: 15 }, quantity: "1 serving" };

        // Find closest match to target calories
        let best = options[0];
        let bestDiff = Math.abs(options[0].calories - targetCals);

        options.forEach((meal: any) => {
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
    const snack = selectMeal("snacks", snackCals); // ensure DB uses 'snacks' key

    meals.push({ type: "Breakfast", ...breakfast });
    meals.push({ type: "Lunch", ...lunch });
    meals.push({ type: "Dinner", ...dinner });
    meals.push({ type: "Snack", ...snack });

    return meals;
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
