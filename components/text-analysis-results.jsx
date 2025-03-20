import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, AlertTriangle, Bot, User } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function TextAnalysisResults({ results }) {
  const { aiProbability, humanProbability, confidence, modelDetection, explanation } = results

  // Determine the verdict based on AI probability
  const getVerdict = () => {
    if (aiProbability > 80)
      return { label: "Likely AI-Generated", icon: <Bot className="h-5 w-5" />, variant: "destructive" }
    if (aiProbability > 60)
      return { label: "Possibly AI-Generated", icon: <AlertTriangle className="h-5 w-5" />, variant: "warning" }
    if (aiProbability > 40) return { label: "Uncertain", icon: <AlertCircle className="h-5 w-5" />, variant: "outline" }
    return { label: "Likely Human-Written", icon: <User className="h-5 w-5" />, variant: "default" }
  }

  const verdict = getVerdict()

  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Analysis Results</CardTitle>
            <CardDescription>AI detection results with confidence scores</CardDescription>
          </div>
          <Badge variant={verdict.variant} className="flex items-center gap-1 px-3 py-1.5">
            {verdict.icon}
            {verdict.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium">
              <div className="flex items-center">
                <Bot className="mr-2 h-4 w-4" />
                AI-Generated Probability
              </div>
              <span>{aiProbability.toFixed(1)}%</span>
            </div>
            <Progress value={aiProbability} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium">
              <div className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                Human-Written Probability
              </div>
              <span>{humanProbability.toFixed(1)}%</span>
            </div>
            <Progress value={humanProbability} className="h-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Analysis Confidence</h3>
              <div className="flex items-center">
                <div className="w-full bg-muted rounded-full h-4 mr-2">
                  <div className="bg-primary h-4 rounded-full" style={{ width: `${confidence}%` }}></div>
                </div>
                <span className="text-sm font-medium">{confidence.toFixed(1)}%</span>
              </div>
            </div>

            {modelDetection && (
              <div>
                <h3 className="text-sm font-medium mb-2">Detected AI Model</h3>
                <div className="flex items-center justify-between bg-muted p-3 rounded-lg">
                  <div className="flex items-center">
                    <Bot className="mr-2 h-4 w-4" />
                    <span>{modelDetection.detectedModel}</span>
                  </div>
                  <Badge variant="outline">{modelDetection.probability.toFixed(1)}% confidence</Badge>
                </div>
              </div>
            )}
          </div>

          {explanation && (
            <Alert>
              <AlertDescription className="text-sm">
                <strong>Analysis Explanation:</strong> {explanation}
              </AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

