const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY || "";

export const categorizeTransaction = async (merchantName: string): Promise<string> => {
  if (!API_KEY) {
    // Basic fallback logic
    const lower = merchantName.toLowerCase();
    if (lower.includes("starbucks") || lower.includes("kopi") || lower.includes("mcd") || lower.includes("kfc")) return "F&B";
    if (lower.includes("steam") || lower.includes("netflix") || lower.includes("gacha") || lower.includes("spotify")) return "Entertainment";
    if (lower.includes("grab") || lower.includes("gojek") || lower.includes("kai")) return "Transport";
    if (lower.includes("indomaret") || lower.includes("alfamart") || lower.includes("superindo")) return "Groceries";
    return "Lainnya";
  }

  const systemPrompt = `
You are an expert transaction categorizer. Categorize the given merchant/transaction name into EXACTLY ONE of the following predefined categories:
"F&B", "Groceries", "Transport", "Shopping", "Entertainment", "Bills", "Health", "Education", "Lainnya"

Respond STRICTLY with just the category name. Nothing else.
`;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
        "HTTP-Referer": "https://bonsnap.com", // Optional, for OpenRouter rankings
        "X-Title": "BONSNAP" // Optional, for OpenRouter rankings
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3-8b-instruct:free",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: merchantName }
        ],
        temperature: 0.1
      })
    });

    if (!response.ok) {
      throw new Error(`OpenRouter API Error: ${response.statusText}`);
    }

    const data = await response.json();
    let category = data.choices[0].message.content.trim();
    
    // Clean up if the model returns extra quotes
    category = category.replace(/['"]/g, '');
    
    const validCategories = ["F&B", "Groceries", "Transport", "Shopping", "Entertainment", "Bills", "Health", "Education", "Lainnya"];
    if (validCategories.includes(category)) {
      return category;
    }
    
    return "Lainnya";

  } catch (error) {
    console.error("Failed to categorize transaction via OpenRouter:", error);
    return "Lainnya"; // Fallback on error
  }
};
