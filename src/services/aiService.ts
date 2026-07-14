import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
if (!apiKey) console.error("Missing VITE_GEMINI_API_KEY in environment variables.");

// 1. Initialize using the new 2026 SDK standard
const ai = new GoogleGenAI({ apiKey: apiKey || "" });

// 2. Upgraded to the new 2026 Gemini 3.5 & 3.1 model lineup
const AI_MODELS = [
    "gemini-3.5-flash",
    "gemini-3.1-flash",
    "gemini-2.5-flash"
];

// Your exact interface remains untouched for UI stability
export interface StoreItem {
    description: string;
    id: string; // Supabase UUID
    img_url: string;
    name: string;
    price: number;
    sales: number;
    sec_id: string; // Supabase UUID (Tag reference)
    year: number;
}

export async function getAiRecommendations(
    items: StoreItem[],
    limit: number = 5
): Promise<StoreItem[]> {
    if (!items || items.length === 0) return [];

    // 3. THE CLEANUP: We strip img_url AND sec_id out here. 
    // We only keep the 'id' (for mapping) and the raw human-readable data (for the AI to analyze).
    const cleanedItemsForAi = items.map(({ img_url, sec_id, ...rest }) => rest);

    const prompt = `
    You are an expert e-commerce merchandising algorithm for an antique and vintage bazaar.
    I am providing a JSON array of store items. 
    
    Your task is to curate a "You might also like" recommendation list of exactly ${limit} items.
    Analyze descriptions, eras (year), pricing, and sales velocity to find deep thematic connections.

    CRITICAL RULES:
    1. Return ONLY a valid JSON array of strings. These strings must be the exact 'id' (Supabase UUID) of the winning items.
    2. DO NOT modify, truncate, or invent UUIDs. You must copy the exact UUID strings provided in the input data.
    3. The format MUST be exactly like this: ["8f94fc57-8723-445c-a8dd-6e908731f64f", "c341b2a9-1234-5678-b9a0-1234567890ab"]
    4. Order them strictly from most recommended (index 0) to least recommended.
    5. Do NOT wrap the array in an object or add markdown blocks. Just return the raw array of strings.

    Input Data:
    ${JSON.stringify(cleanedItemsForAi)}
    `;

    for (let i = 0; i < AI_MODELS.length; i++) {
        const modelName = AI_MODELS[i];

        try {
            // 4. The new generateContent syntax with STRICT SCHEMA
            const response = await ai.models.generateContent({
                model: modelName,
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    // This is the silver bullet. It forces the AI to output exactly an array of strings.
                    responseSchema: {
                        type: "ARRAY",
                        items: {
                            type: "STRING"
                        }
                    },
                    temperature: 0.7,
                }
            });

            // 5. The Sanitizer
            // Sometimes the AI still tries to wrap the JSON in markdown blocks. This strips them out.
            const rawText = response.text || "[]";
            const cleanedText = rawText.replace(/```json/gi, "").replace(/```/g, "").trim();

            // Now it is 100% safe to parse
            const recommendedIds = JSON.parse(cleanedText) as string[];

            // 6. THE RE-STITCH: 
            const finalRecommendations = recommendedIds
                .map(id => items.find(item => item.id === id))
                .filter((item): item is StoreItem => item !== undefined);

            return finalRecommendations.slice(0, limit);
            
        } catch (error: any) {
            const isRateLimit = error?.status === 429;
            const isOverloaded = error?.status === 503;

            if (isRateLimit || isOverloaded) {
                console.warn(`[AI Engine] ${modelName} hit a limit. Falling back...`);
                if (i === AI_MODELS.length - 1) {
                    throw new Error("All AI recommendation models are currently busy.");
                }
                continue;
            }

            console.error(`[AI Engine] Critical failure with ${modelName}:`, error);
            throw error;
        }
    }

    return [];
}