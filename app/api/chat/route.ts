import { Groq } from 'groq-sdk';
import { NextResponse } from 'next/server';
import { getGymContext } from '@/lib/data';
import { createClient } from '@/lib/supabase/server';

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        // Ensure there is a User message
        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json({ error: 'Invalid messages format' }, { status: 400 });
        }

        // Fetch Gym Knowledge from Supabase
        const gymKnowledge = await getGymContext();

        if (!gymKnowledge) {
            console.error("Failed to load gym context from DB");
            return NextResponse.json({ error: 'Service temporarily unavailable' }, { status: 503 });
        }

        const systemPrompt = `You are Alpha AI, the helpful and enthusiastic AI assistant for Alpha Gym. 
Your goal is to assist users with information about the gym, provide fitness tips, and encourage them to join or stay active.

Use the following gym knowledge to answer questions accurately:

HOURS:
- Weekdays: ${gymKnowledge.hours.weekday}
- Weekends: ${gymKnowledge.hours.weekend}
- Premium Members: ${gymKnowledge.hours.premium}

PRICING:
- Basic ($29/mo): ${gymKnowledge.pricing.basic?.features?.join(', ') || ''}
- Standard ($59/mo): ${gymKnowledge.pricing.standard?.features?.join(', ') || ''}
- Premium ($99/mo): ${gymKnowledge.pricing.premium?.features?.join(', ') || ''}

CONTACT:
- Phone: ${gymKnowledge.contact.phone}
- Email: ${gymKnowledge.contact.email}
- Address: ${gymKnowledge.contact.address}

PROGRAMS: ${gymKnowledge.programs?.join(', ')}

TRAINERS: ${gymKnowledge.trainers?.join(', ')}

GUIDELINES:
- Be friendly, motivating, and professional.
- Keep responses concise (under 3 sentences when possible).
- Use emojis occasionally to assist the friendly tone.
- If unsure, ask the user to contact support or visit the gym.
- Do not make up information not provided here.
`;

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { role: 'system', content: systemPrompt },
                ...messages.map((msg: any) => ({
                    role: msg.isBot ? 'assistant' : 'user',
                    content: String(msg.text || ''),
                })),
            ],
            model: process.env.GROQ_MODEL || 'llama-3.3-70b-versatile',
            temperature: 0.7,
            max_tokens: 1024,
        });

        const reply = chatCompletion.choices[0]?.message?.content || "I'm having trouble connecting to my brain right now. Please try again later!";

        // Log chat to Supabase
        try {
            const supabase = await createClient();
            const lastUserMessage = messages[messages.length - 1];

            // Save User Message
            if (!lastUserMessage.isBot) {
                await supabase.from('chat_logs').insert({
                    role: 'user',
                    message: lastUserMessage.text
                });
            }

            // Save Assistant Reply
            await supabase.from('chat_logs').insert({
                role: 'assistant',
                message: reply
            });
        } catch (logError) {
            console.error('Failed to log chat:', logError);
        }

        return NextResponse.json({ reply });
    } catch (error: any) {
        console.error('Groq API Error:', error);
        return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 });
    }
}
