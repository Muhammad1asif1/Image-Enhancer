
import { GoogleGenAI, Modality } from "@google/genai";

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
}

function stripBase64Header(base64Data: string): string {
    return base64Data.split(',')[1];
}

function getMimeType(base64Data: string): string {
    return base64Data.split(';')[0].split(':')[1];
}

function getPassportPrompt(clothingDescription: string): string {
    return `براہ کرم اس تصویر سے ایک سرکاری پاسپورٹ تصویر بنائیں۔ صرف یہ تبدیلیاں کریں:
1. پس منظر کو مکمل طور پر ٹھوس، صاف سفید رنگ میں تبدیل کریں۔
2. لباس کو '${clothingDescription}' میں تبدیل کریں۔
3. **انتہائی ضروری:** شخص کا اصل چہرہ، چہرے کے تاثرات، بالوں کا انداز، جلد کا رنگ، اور عمر بالکل بھی تبدیل نہ کریں۔ چہرے کو کسی بھی طرح سے تبدیل کرنا سختی سے منع ہے۔
4. تصویر میں رسمی اور متوازن روشنی شامل کریں جو سرکاری دستاویزات کے لیے موزوں ہو۔ کوئی سایہ نہیں ہونا چاہیے۔`;
}

export async function generatePassportPhoto(base64Image: string, clothingDescription: string): Promise<string> {
    const model = 'gemini-2.5-flash-image';
    const prompt = getPassportPrompt(clothingDescription);

    const imageData = stripBase64Header(base64Image);
    const mimeType = getMimeType(base64Image);

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: {
                parts: [
                    {
                        inlineData: {
                            data: imageData,
                            mimeType: mimeType,
                        },
                    },
                    { text: prompt },
                ],
            },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });
        
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                const generatedBase64 = part.inlineData.data;
                const generatedMimeType = part.inlineData.mimeType;
                return `data:${generatedMimeType};base64,${generatedBase64}`;
            }
        }
        
        throw new Error('AI نے کوئی تصویر واپس نہیں کی۔ ماڈل کی پالیسیوں کی وجہ سے درخواست بلاک ہو سکتی ہے۔');

    } catch (error) {
        console.error("Gemini API Error:", error);
        throw new Error("Gemini API سے رابطہ کرنے میں ناکامی۔");
    }
}
