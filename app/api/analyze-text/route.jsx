import { NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request) {
  try {
    const { text } = await request.json()

    if (!text || text.trim() === "") {
      return NextResponse.json({ error: "Text is required" }, { status: 400 })
    }

    // Use OpenAI for actual text analysis instead of mock data
    try {
      const { text: analysis } = await generateText({
        model: openai("gpt-4o"),
        prompt: `You are an expert AI content detector with advanced linguistic analysis capabilities. Analyze the following text and determine if it was written by AI or a human.

        Analyze these specific aspects:
        1. Perplexity: How predictable is the text? AI tends to be more predictable.
        2. Burstiness: Do sentence lengths and structures vary naturally? Humans tend to be more "bursty".
        3. Entropy: How random or information-dense is the text?
        4. Repetitiveness: Does the text repeat phrases or patterns?
        5. Linguistic patterns: Are there unnatural phrasings or consistent tone?
        6. Personal elements: Does it contain personal anecdotes or unique perspectives?
        
        Based on your analysis, identify which AI model likely generated the text if applicable.
        
        Provide a JSON response with the following structure:
        {
          "aiProbability": number between 0-100,
          "humanProbability": number between 0-100,
          "confidence": number between 0-100,
          "metrics": {
            "perplexity": number between 0-100 (lower suggests AI),
            "burstiness": number between 0-1 (higher suggests human),
            "entropy": number between 0-5 (higher suggests human),
            "repetitiveness": number between 0-1 (higher suggests AI)
          },
          "indicators": [
            { "name": string, "score": number between 0-100 }
          ],
          "modelDetection": {
            "detectedModel": string,
            "probability": number between 0-100
          },
          "explanation": string with brief analysis explanation
        }
        
        Text to analyze: ${text}`,
        temperature: 0.1, // Low temperature for more deterministic results
      })

      // Parse the result
      const result = JSON.parse(analysis)
      return NextResponse.json(result)
    } catch (error) {
      console.error("Error calling OpenAI:", error)

      // Fallback to mock data if API call fails
      const mockResult = {
        aiProbability: Math.random() * 100,
        humanProbability: 100 - Math.random() * 100,
        confidence: 85 + Math.random() * 15,
        metrics: {
          perplexity: 45 + Math.random() * 30,
          burstiness: 0.3 + Math.random() * 0.5,
          entropy: 3.5 + Math.random() * 1.5,
          repetitiveness: 0.1 + Math.random() * 0.3,
        },
        indicators: [
          { name: "Repetitive phrases", score: Math.random() * 100 },
          { name: "Unnatural phrasing", score: Math.random() * 100 },
          { name: "Consistent tone", score: Math.random() * 100 },
          { name: "Lack of personal anecdotes", score: Math.random() * 100 },
          { name: "Generic examples", score: Math.random() * 100 },
        ],
        modelDetection: {
          detectedModel: Math.random() > 0.5 ? "GPT-4" : "Claude",
          probability: 75 + Math.random() * 25,
        },
        explanation: "API call failed. This is mock data.",
      }

      return NextResponse.json(mockResult)
    }
  } catch (error) {
    console.error("Error analyzing text:", error)
    return NextResponse.json({ error: "Failed to analyze text" }, { status: 500 })
  }
}

