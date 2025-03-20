import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, AlertTriangle, Bot, Camera, Info } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ImageAnalysisResults({ results, imageUrl }) {
  const { aiProbability, realProbability, confidence, heatmap, originalImageAnalysis, detailedAnalysis } = results

  // Get artifacts from either the detailed analysis or the legacy format
  const detectedArtifacts = detailedAnalysis?.detectedArtifacts || results.detectedArtifacts
  const modelDetection = detailedAnalysis?.modelDetection || results.modelDetection
  const analysisExplanation = detailedAnalysis?.analysisExplanation

  // Determine the verdict based on AI probability
  const getVerdict = () => {
    if (aiProbability > 80)
      return { label: "Likely AI-Generated", icon: <Bot className="h-5 w-5" />, variant: "destructive" }
    if (aiProbability > 60)
      return { label: "Possibly AI-Generated", icon: <AlertTriangle className="h-5 w-5" />, variant: "warning" }
    if (aiProbability > 40) return { label: "Uncertain", icon: <AlertCircle className="h-5 w-5" />, variant: "outline" }
    return { label: "Likely Authentic", icon: <Camera className="h-5 w-5" />, variant: "default" }
  }

  const verdict = getVerdict()

  return (
    <div className="space-y-8">
      <Card>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                    <Camera className="mr-2 h-4 w-4" />
                    Authentic Image Probability
                  </div>
                  <span>{realProbability.toFixed(1)}%</span>
                </div>
                <Progress value={realProbability} className="h-2" />
              </div>

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

            <div className="flex flex-col">
              <h3 className="text-sm font-medium mb-2">Analyzed Image</h3>
              <div className="relative border rounded-lg overflow-hidden flex-1">
                <img src={imageUrl || "/placeholder.svg"} alt="Analyzed" className="w-full h-full object-contain" />
              </div>
            </div>
          </div>

          {analysisExplanation && (
            <Alert className="mt-6">
              <Info className="h-4 w-4" />
              <AlertDescription className="text-sm">
                <strong>Expert Analysis:</strong> {analysisExplanation}
              </AlertDescription>
            </Alert>
          )}

          {originalImageAnalysis && (
            <div className="mt-6 p-4 border rounded-lg">
              <h3 className="text-sm font-medium mb-4">Original Image Comparison</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Original Image AI Probability</span>
                    <span>{originalImageAnalysis.aiProbability.toFixed(1)}%</span>
                  </div>
                  <Progress value={originalImageAnalysis.aiProbability} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Suspected Image AI Probability</span>
                    <span>{aiProbability.toFixed(1)}%</span>
                  </div>
                  <Progress value={aiProbability} className="h-2" />
                </div>
              </div>
              <div className="mt-4 text-sm">
                <Badge
                  variant={
                    Math.abs(originalImageAnalysis.aiProbability - aiProbability) > 40
                      ? "destructive"
                      : Math.abs(originalImageAnalysis.aiProbability - aiProbability) > 20
                        ? "warning"
                        : "default"
                  }
                >
                  {Math.abs(originalImageAnalysis.aiProbability - aiProbability) > 40
                    ? "Significant Difference"
                    : Math.abs(originalImageAnalysis.aiProbability - aiProbability) > 20
                      ? "Moderate Difference"
                      : "Similar Scores"}
                </Badge>
                <span className="ml-2">
                  {Math.abs(originalImageAnalysis.aiProbability - aiProbability) > 40
                    ? "The significant difference between the original and suspected image suggests manipulation or AI generation."
                    : Math.abs(originalImageAnalysis.aiProbability - aiProbability) > 20
                      ? "The moderate difference between images may indicate some manipulation."
                      : "Both images have similar AI probability scores."}
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Tabs defaultValue="artifacts">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="artifacts">Detected Artifacts</TabsTrigger>
          <TabsTrigger value="heatmap">Analysis Heatmap</TabsTrigger>
        </TabsList>

        <TabsContent value="artifacts">
          <Card>
            <CardHeader>
              <CardTitle>Detected Artifacts</CardTitle>
              <CardDescription>Specific anomalies that suggest AI generation or manipulation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {detectedArtifacts.map((artifact, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm font-medium">
                      <span>{artifact.name}</span>
                      <span>{artifact.score.toFixed(1)}%</span>
                    </div>
                    <Progress value={artifact.score} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      {artifact.description || getArtifactDescription(artifact.name)}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="heatmap">
          <Card>
            <CardHeader>
              <CardTitle>Analysis Heatmap</CardTitle>
              <CardDescription>Visual representation of detected anomalies in the image</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <img src={heatmap || "/placeholder.svg"} alt="Analysis Heatmap" className="w-full object-contain" />
              </div>
              <div className="mt-4 text-sm text-muted-foreground">
                <p>
                  The heatmap highlights areas of the image that show signs of AI generation or manipulation. Brighter
                  areas indicate higher probability of artificial content.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function getArtifactDescription(artifactName) {
  const descriptions = {
    "Facial inconsistencies":
      "Unnatural facial features, asymmetry, or blending issues often found in AI-generated faces.",
    "Unnatural lighting": "Inconsistent light sources, shadows, or reflections that don't match the scene physics.",
    "Background anomalies": "Unusual patterns, repetitions, or distortions in the background elements.",
    "Texture irregularities": "Abnormal smoothness, noise patterns, or detail inconsistencies in textures.",
  }

  return descriptions[artifactName] || "Detected anomaly suggesting AI generation or manipulation."
}

