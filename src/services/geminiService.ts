import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";

const genAI = new GoogleGenerativeAI(API_KEY);

export interface ScannedReceiptData {
  merchant: string;
  category: string;
  items: Array<{
    id: string;
    name: string;
    qty: number;
    price: number;
  }>;
}

export const analyzeReceipt = async (base64Image: string, mimeType: string): Promise<ScannedReceiptData> => {
  if (!API_KEY) {
    throw new Error("VITE_GEMINI_API_KEY is not set in .env file.");
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
      Anda adalah asisten AI ekstraktor data struk belanja terbaik di dunia.
      Tolong analisa gambar struk ini, dan kembalikan STRICTLY dalam format JSON murni TANPA markdown block (tidak perlu \`\`\`json).
      Format JSON harus persis seperti ini:
      {
        "merchant": "Nama Toko / Restoran",
        "category": "Kategori belanja singkat (contoh: Food & Beverage, Shopping, Transport, Groceries)",
        "items": [
          {
            "name": "Nama Item",
            "qty": 1,
            "price": 50000
          }
        ]
      }
      Pastikan 'price' adalah angka utuh bulat tanpa pemisah ribuan (contoh 50000, BUKAN "50.000").
      Jika tidak ditemukan struk, kembalikan JSON dengan merchant "Unknown" dan array items kosong.
    `;

    // Ensure we only send the pure base64 data, stripping out the prefix if present (e.g. data:image/png;base64,)
    const base64Data = base64Image.includes(",") ? base64Image.split(",")[1] : base64Image;

    const imagePart = {
      inlineData: {
        data: base64Data,
        mimeType
      }
    };

    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    let textResult = response.text();
    
    // Clean up potential markdown formatting from Gemini just in case
    if (textResult.includes('\`\`\`json')) {
      textResult = textResult.replace(/\`\`\`json/g, '').replace(/\`\`\`/g, '').trim();
    } else if (textResult.includes('\`\`\`')) {
      textResult = textResult.replace(/\`\`\`/g, '').trim();
    }

    const parsedData = JSON.parse(textResult);
    
    // Ensure uniqueness for React keys
    if (parsedData.items && Array.isArray(parsedData.items)) {
      parsedData.items = parsedData.items.map((item: any) => ({
        ...item,
        id: Math.random().toString(36).substring(2, 9)
      }));
    }

    return parsedData as ScannedReceiptData;

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
