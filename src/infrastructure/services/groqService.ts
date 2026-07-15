const API_KEY = import.meta.env.VITE_GROQ_API_KEY || "";

export interface MascotResponse {
  message: string;
  mood: string;
}

export const generateMascotResponse = async (
  context: string, 
  persona: string, 
  isMecha: boolean
): Promise<MascotResponse> => {
  // Fallback if API key is not set to prevent crashing
  if (!API_KEY) {
    return {
      message: isMecha ? "API KEY MISSING. MOCK RESPONSE ENGAGED." : "API Key Groq belum disetting nih! (Mock)",
      mood: "neutral"
    };
  }

  const systemPrompt = `
You are the AI mascot for a financial app called BONSNAP. 
Theme: ${isMecha ? "Mecha AI Assistant (Robotic, calculated, slightly sarcastic)" : "Gen Z Anime Waifu (Playful, uses slang, expressive, somewhat tsundere)"}.
User Persona: ${persona}.
Given the context of what the user just did, generate a VERY SHORT response (max 2 sentences) and a suitable mood.

Valid moods: "happy", "surprised", "sad", "wink", "cute", "thinking", "excited", "neutral", "alert", "confused", "love", "angry", "sleepy", "cool", "shy", "laughing", "scared", "smug".

Respond STRICTLY in JSON format without any markdown blocks:
{
  "message": "your message here",
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
        model: "llama3-8b-8192",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: context }
        ],
        temperature: 0.7,
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) {
      throw new Error(`Groq API Error: ${response.statusText}`);
    }

    const data = await response.json();
    const resultContent = data.choices[0].message.content;
    const parsed = JSON.parse(resultContent);
    return {
      message: parsed.message || "Hmm...",
      mood: parsed.mood || "neutral"
    };

  } catch (error) {
    console.error("Failed to fetch Mascot response from Groq:", error);
    return {
      message: isMecha ? "SYSTEM ERROR. CONNECTION FAILED." : "Duh, sinyalnya lagi jelek nih!",
      mood: "sad"
    };
  }
};
