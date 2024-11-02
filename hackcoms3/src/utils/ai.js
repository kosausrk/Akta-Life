import { GoogleGenerativeAI } from "@google/generative-ai"

const API_KEY = "AIzaSyD58BG79kuKLLbad1DHk6h6XWonqGTiHV8"

export default async function Query(prompt) {
    const genAI = new GoogleGenerativeAI(API_KEY)

    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash"
    })

    const res = await model.generateContent(prompt)

    return res.result.text()
}   