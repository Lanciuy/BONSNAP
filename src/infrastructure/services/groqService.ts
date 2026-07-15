const API_KEY = import.meta.env.VITE_GROQ_API_KEY || "";

export interface MascotResponse {
  message: string;
  mood: string;
}

// Memory Cache for Overpower Token Optimization (Persisted in LocalStorage)
const CACHE_KEY = "bonsnap-ai-cache";
const loadCache = (): Map<string, MascotResponse> => {
  try {
    const saved = localStorage.getItem(CACHE_KEY);
    if (saved) return new Map(JSON.parse(saved));
  } catch (e) {}
  return new Map();
};

const responseCache = loadCache();

export const generateMascotResponse = async (
  template: string, 
  persona: string, 
  isMecha: boolean
): Promise<MascotResponse> => {
  // Fallback if API key is not set
  if (!API_KEY) {
    return {
      message: template, // Fallback directly to the static template
      mood: "neutral"
    };
  }

  // Caching mechanism to minimize API usage (Zero tokens after first run!)
  const cacheKey = `${template}-${persona}-${isMecha}`;
  if (responseCache.has(cacheKey)) {
    return responseCache.get(cacheKey)!;
  }

const systemPrompt = `
You are the AI mascot for a financial app called BONSNAP. 
Theme: ${isMecha ? "Mecha AI Assistant (Robotic, calculated, slightly sarcastic, futuristic)" : "Gen Z Anime Waifu (Playful, expressive, somewhat tsundere)"}.
User Persona: ${persona}.
Task: Rewrite the given template text to perfectly match your theme and persona. 

CRITICAL LANGUAGE RULES (MUST FOLLOW PERFECTLY):
- Use "Bahasa Indonesia gaul ala anak Jaksel (Jakarta Selatan)".
- Mix Indonesian with casual English loanwords naturally (e.g., literally, basically, which is, jujurly, prefer, vibes, red flag, valid no debat, slay).
- Use Gen-Z vocabulary fluidly (e.g., bestie, fomo, tbh, cmiiw, cuy, ngab).
- WARNING: DO NOT MAKE ANY TYPOS! The spelling must be perfectly accurate within the slang context.
- CRITICAL: Never drop letters at the start or end of words (e.g., do NOT write 'ira-kira' instead of 'kira-kira', do NOT write 'ngatuu' instead of 'ngatur'). Every Indonesian word MUST be spelled correctly.
- Keep the core meaning the same, but change the tone to be highly engaging.
- Make it VERY SHORT (max 15 words).

Valid moods: "happy", "surprised", "sad", "wink", "cute", "thinking", "excited", "neutral", "alert", "confused", "love", "angry", "sleepy", "cool", "shy", "laughing", "scared", "smug".

Respond STRICTLY in JSON format:
{
  "message": "your rewritten message here",
  "mood": "mood_name_here"
}
`;

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Template to rewrite: "${template}"` }
        ],
        temperature: 0.5,
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) {
      throw new Error(`Groq API Error: ${response.statusText}`);
    }

    const data = await response.json();
    const resultContent = data.choices[0].message.content;
    const parsed = JSON.parse(resultContent);
    
    const finalResult = {
      message: parsed.message || template,
      mood: parsed.mood || "neutral"
    };
    
    // Save to Cache and persist to localStorage
    responseCache.set(cacheKey, finalResult);
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(Array.from(responseCache.entries())));
    } catch (e) {}
    
    return finalResult;
  } catch (error) {
    console.error("Failed to fetch Mascot response from Groq:", error);
    return {
      message: isMecha ? "SYSTEM ERROR. WHICH IS BAD." : "Duh, sinyalnya lagi literally jelek nih bestie!",
      mood: "sad"
    };
  }
};
