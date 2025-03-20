"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Loader2, AlertCircle, Upload, FileText } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import TextAnalysisResults from "@/components/text-analysis-results"
import TextAnalysisMetrics from "@/components/text-analysis-metrics"

export default function TextAnalysisPage() {
  const [text, setText] = useState("")
  const [file, setFile] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState(null)
  const [error, setError] = useState(null)

  const handleTextChange = (e) => {
    setText(e.target.value)
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    setFile(selectedFile)

    if (selectedFile) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setText(event.target.result)
      }
      reader.readAsText(selectedFile)
    }
  }

  const analyzeText = async () => {
    if (!text.trim()) {
      setError("Please enter some text to analyze")
      return
    }

    setIsAnalyzing(true)
    setError(null)

    try {
      // Call the API route for text analysis
      const response = await fetch("/api/analyze-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      })

      if (!response.ok) {
        throw new Error("Failed to analyze text")
      }

      const data = await response.json()
      setResults(data)
    } catch (err) {
      setError(err.message || "An error occurred during analysis")
    } finally {
      setIsAnalyzing(false)
    }
  }

  const resetAnalysis = () => {
    setText("")
    setFile(null)
    setResults(null)
    setError(null)
  }

  // For demo purposes, simulate analysis with mock data
  const simulateAnalysis = () => {
    setIsAnalyzing(true)
    setError(null)

    setTimeout(() => {
      const mockResults = {
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
      }

      setResults(mockResults)
      setIsAnalyzing(false)
    }, 2000)
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Text Analysis</h1>
          <p className="text-muted-foreground">
            Detect AI-generated text by analyzing linguistic patterns, perplexity, and burstiness
          </p>
        </div>

        <Tabs defaultValue="input" className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger className="rounded-xl hover:bg-cyan-500 hover:text-black transition-colors duration-300" value="input">Text Input</TabsTrigger>
            <TabsTrigger className="rounded-xl hover:bg-cyan-500 hover:text-black transition-colors duration-300" value="upload">File Upload</TabsTrigger>
          </TabsList>
          <TabsContent value="input">
            <Card className="h-[370px] border-blue-700 p-4">
              <CardHeader>
                <CardTitle className="p-2">Enter Text</CardTitle>
                <CardDescription className="p-2">Paste the text you want to analyze for AI detection</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Enter or paste text here for analysis..."
                  className="min-h-[200px]"
                  value={text}
                  onChange={handleTextChange}
                  disabled={isAnalyzing}
                />
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" className="m-4 rounded-xl hover:bg-cyan-500 hover:text-black transition-colors duration-300" onClick={resetAnalysis} disabled={isAnalyzing || (!text && !results)}>
                  Clear
                </Button>
                <Button className="rounded-xl hover:bg-cyan-950 hover:text-white transition-colors duration-300" onClick={simulateAnalysis} disabled={isAnalyzing || !text}>
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    "Analyze Text"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="upload">
            <Card className="h-[440px] border-blue-700 p-4">
              <CardHeader>
                <CardTitle>Upload Text File</CardTitle>
                <CardDescription className="p-2">Upload a .txt file to analyze for AI-generated content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-12 text-center">
                  <FileText className="h-10 w-10 text-muted-foreground mb-4" />
                  <div className="mb-4">
                    <h3 className="font-medium">Upload a text file</h3>
                    <p className="text-sm p-2 text-muted-foreground">Drag and drop or click to browse</p>
                  </div>
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    accept=".txt"
                    onChange={handleFileChange}
                    disabled={isAnalyzing}
                  />
                  <Button asChild variant="secondary">
                    <label htmlFor="file-upload" className="h-14 w-35 rounded-xl hover:bg-cyan-500 hover:text-black transition-colors duration-300 cursor-pointer p-4 gap-2">
                      <Upload className="mr-2 h-4 w-4" />
                      Browse Files
                    </label>
                  </Button>
                  {file && (
                    <div className="mt-4 text-sm">
                      Selected: <span className="font-medium">{file.name}</span>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" className="m-4 rounded-xl hover:bg-cyan-500 hover:text-black transition-colors duration-300" onClick={resetAnalysis} disabled={isAnalyzing || (!file && !results)}>
                  Clear
                </Button>
                <Button className="rounded-xl hover:bg-cyan-950 hover:text-white transition-colors duration-300" onClick={simulateAnalysis} disabled={isAnalyzing || !file}>
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    "Analyze File"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        {error && (
          <Alert variant="destructive" className="mb-8">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {isAnalyzing && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Analyzing Text</CardTitle>
              <CardDescription>Running multiple detection algorithms to analyze the content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2 text-sm">
                    <span>Linguistic Pattern Analysis</span>
                    <span>Complete</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2 text-sm">
                    <span>Perplexity & Burstiness Calculation</span>
                    <span>75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2 text-sm">
                    <span>Model Detection</span>
                    <span>50%</span>
                  </div>
                  <Progress value={50} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2 text-sm">
                    <span>Generating Report</span>
                    <span>25%</span>
                  </div>
                  <Progress value={25} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {results && !isAnalyzing && (
          <>
            <TextAnalysisResults results={results} />
            <TextAnalysisMetrics metrics={results.metrics} indicators={results.indicators} />
          </>
        )}
      </div>
    </div>
  )
}

