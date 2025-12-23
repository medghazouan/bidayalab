import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { BIDAYALAB_KNOWLEDGE } from '@/lib/assistant-knowledge';
import { connectToDatabase } from '@/lib/mongoose';
import { Settings } from '@/models/Settings';

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { message, history } = body;

        if (!process.env.GOOGLE_API_KEY) {
            return NextResponse.json(
                { error: 'API key not configured' },
                { status: 500 }
            );
        }

        // Fetch dynamic settings
        await connectToDatabase();
        const settings = await Settings.findOne();

        let dynamicKnowledge = BIDAYALAB_KNOWLEDGE;

        if (settings) {
            const contactInfo = `
            \n[CURRENT CONTACT INFORMATION]
            Email: ${settings.email || "bidayalab1@gmail.com"}
            Phone: ${settings.phone || "+212 751 388 901"}
            WhatsApp: ${settings.whatsapp || "+212 751 388 901"}
            LinkedIn: ${settings.linkedinUrl}
            Instagram: ${settings.instagramUrl}

            ALWAYS use this contact information when users ask how to contact us.
            `;
            dynamicKnowledge += contactInfo;
        }

        // Initialize model with system instruction
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            systemInstruction: dynamicKnowledge,
        });

        // Start chat with history
        const chat = model.startChat({
            history: history || [],
            generationConfig: {
                maxOutputTokens: 300, // Increased for detailed business answers, prompt handles brevity
                temperature: 0.7,
            },
        });

        // Send message (streaming optional, but simple response for now)
        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ response: text });

    } catch (error: any) {
        console.error('Gemini API Error:', error);
        return NextResponse.json(
            {
                error: 'Failed to generate response',
                details: error.message || String(error)
            },
            { status: 500 }
        );
    }
}
