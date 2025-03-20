"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, AlertCircle, Search } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function BehavioralAnalysisPage() {
  const [url, setUrl] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState(null)
  const [error, setError] = useState(null)

  const handleUrlChange = (e) => {
    setUrl(e.target.value)
  }

  const analyzeContent = async () => {
    if (!url) {
      setError("Please enter a URL to analyze")
      return
    }

    setIsAnalyzing(true)
    setError(null)

    try {
      // In a real implementation, you would call your API here
      // For demo purposes, we'll simulate the analysis
      simulateAnalysis()
    } catch (err) {
      setError(err.message || "An error occurred during analysis")
      setIsAnalyzing(false)
    }
  }

  const resetAnalysis = () => {
    setUrl("")
    setResults(null)
    setError(null)
  }

  // For demo purposes, simulate analysis with mock data
  const simulateAnalysis = () => {
    setTimeout(() => {
      const mockResults = {
        url: url,
        contentType: Math.random() > 0.5 ? "Article" : "Social Media Post",
        firstSeen: new Date(Date.now() - Math.random() * 10000000000).toLocaleString(),
        spreadPattern: Math.random() > 0.5 ? "Viral" : "Gradual",
        aiProbability: Math.random() * 100,
        spreadData: {
          timeline: [
            { date: "Day 1", shares: Math.floor(Math.random() * 100) },
            { date: "Day 2", shares: Math.floor(Math.random() * 500) },
            { date: "Day 3", shares: Math.floor(Math.random() * 1000) },
            { date: "Day 4", shares: Math.floor(Math.random() * 2000) },
            { date: "Day 5", shares: Math.floor(Math.random() * 3000) },
            { date: "Day 6", shares: Math.floor(Math.random() * 2500) },
            { date: "Day 7", shares: Math.floor(Math.random() * 2000) },
          ],
          platforms: [
            { name: "Twitter", shares: Math.floor(Math.random() * 5000) },
            { name: "Facebook", shares: Math.floor(Math.random() * 3000) },
            { name: "Reddit", shares: Math.floor(Math.random() * 2000) },
            { name: "Instagram", shares: Math.floor(Math.random() * 1500) },
            { name: "TikTok", shares: Math.floor(Math.random() * 1000) },
          ],
          demographics: [
            { name: "18-24", value: Math.floor(Math.random() * 30) },
            { name: "25-34", value: Math.floor(Math.random() * 30) },
            { name: "35-44", value: Math.floor(Math.random() * 20) },
            { name: "45-54", value: Math.floor(Math.random() * 15) },
            { name: "55+", value: Math.floor(Math.random() * 10) },
          ],
        },
        relatedContent: [
          {
            url: "https://example.com/related1",
            similarity: 85 + Math.random() * 15,
            aiProbability: Math.random() * 100,
          },
          {
            url: "https://example.com/related2",
            similarity: 70 + Math.random() * 20,
            aiProbability: Math.random() * 100,
          },
          {
            url: "https://example.com/related3",
            similarity: 60 + Math.random() * 30,
            aiProbability: Math.random() * 100,
          },
        ],
        anomalies: [
          { description: "Unusual sharing pattern", severity: Math.random() > 0.5 ? "high" : "medium" },
          { description: "Coordinated sharing from new accounts", severity: Math.random() > 0.5 ? "medium" : "low" },
          { description: "Inconsistent engagement metrics", severity: Math.random() > 0.5 ? "low" : "medium" },
        ],
      }

      setResults(mockResults)
      setIsAnalyzing(false)
    }, 3000)
  }

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "high":
        return "destructive"
      case "medium":
        return "warning"
      case "low":
        return "outline"
      default:
        return "secondary"
    }
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Behavioral Analysis</h1>
          <p className="text-muted-foreground">Track patterns in how AI-generated content spreads across platforms</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Analyze Content Spread</CardTitle>
            <CardDescription>Enter a URL to analyze how the content has spread across the internet</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="url">Content URL</Label>
                <div className="flex space-x-2">
                  <Input
                    id="url"
                    placeholder="https://example.com/article"
                    value={url}
                    onChange={handleUrlChange}
                    disabled={isAnalyzing}
                  />
                  <Button onClick={analyzeContent} disabled={isAnalyzing || !url}>
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Search className="mr-2 h-4 w-4" />
                        Analyze
                      </>
                    )}
                  </Button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Enter the URL of an article, social media post, or other content to analyze its spread pattern and
                detect potential AI-generated content campaigns.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={resetAnalysis} disabled={isAnalyzing || (!url && !results)}>
              Clear
            </Button>
          </CardFooter>
        </Card>

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
              <CardTitle>Analyzing Content Spread</CardTitle>
              <CardDescription>Tracking how the content has spread across platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <div>
                    <p className="font-medium">Analyzing content from {url}</p>
                    <p className="text-sm text-muted-foreground">This may take a moment...</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {results && !isAnalyzing && (
          <>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Content Overview</CardTitle>
                <CardDescription>Summary of the analyzed content and its spread pattern</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-muted rounded-lg p-4">
                      <p className="text-sm font-medium">Content URL</p>
                      <p className="text-sm text-muted-foreground truncate">{results.url}</p>
                    </div>
                    <div className="bg-muted rounded-lg p-4">
                      <p className="text-sm font-medium">Content Type</p>
                      <p className="text-sm text-muted-foreground">{results.contentType}</p>
                    </div>
                    <div className="bg-muted rounded-lg p-4">
                      <p className="text-sm font-medium">First Seen</p>
                      <p className="text-sm text-muted-foreground">{results.firstSeen}</p>
                    </div>
                    <div className="bg-muted rounded-lg p-4">
                      <p className="text-sm font-medium">Spread Pattern</p>
                      <div className="flex items-center">
                        <Badge variant={results.spreadPattern === "Viral" ? "warning" : "secondary"}>
                          {results.spreadPattern}
                        </Badge>
                        <p className="text-sm text-muted-foreground ml-2">
                          {results.spreadPattern === "Viral"
                            ? "Rapid spread across multiple platforms"
                            : "Steady growth in visibility over time"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-muted rounded-lg p-4">
                      <p className="text-sm font-medium mb-2">AI Content Probability</p>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-muted-foreground">Human-Generated</span>
                        <span className="text-xs text-muted-foreground">AI-Generated</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2.5 mb-2">
                        <div
                          className={`h-2.5 rounded-full ${results.aiProbability > 70 ? "bg-destructive" : results.aiProbability > 30 ? "bg-warning" : "bg-primary"}`}
                          style={{ width: `${results.aiProbability}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between">
                        <Badge
                          variant={
                            results.aiProbability > 70
                              ? "destructive"
                              : results.aiProbability > 30
                                ? "warning"
                                : "default"
                          }
                        >
                          {results.aiProbability.toFixed(1)}%
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {results.aiProbability > 70
                            ? "Likely AI-Generated"
                            : results.aiProbability > 30
                              ? "Possibly AI-Generated"
                              : "Likely Human-Generated"}
                        </span>
                      </div>
                    </div>

                    <div className="bg-muted rounded-lg p-4">
                      <p className="text-sm font-medium mb-2">Detected Anomalies</p>
                      <div className="space-y-2">
                        {results.anomalies.map((anomaly, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="text-sm">{anomaly.description}</span>
                            <Badge variant={getSeverityColor(anomaly.severity)}>{anomaly.severity}</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="timeline" className="mb-8">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="timeline">Spread Timeline</TabsTrigger>
                <TabsTrigger value="platforms">Platform Distribution</TabsTrigger>
                <TabsTrigger value="demographics">Demographics</TabsTrigger>
              </TabsList>

              <TabsContent value="timeline">
                <Card>
                  <CardHeader>
                    <CardTitle>Spread Timeline</CardTitle>
                    <CardDescription>How the content has spread over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={results.spreadData.timeline}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="shares" stroke="#8884d8" activeDot={{ r: 8 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-4 text-sm text-muted-foreground">
                      <p>
                        {results.spreadPattern === "Viral"
                          ? "This content shows a viral spread pattern with rapid growth in shares over a short period of time. This pattern is sometimes associated with coordinated campaigns or highly engaging AI-generated content."
                          : "This content shows a gradual spread pattern with steady growth over time. This pattern is typical of organic content sharing."}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="platforms">
                <Card>
                  <CardHeader>
                    <CardTitle>Platform Distribution</CardTitle>
                    <CardDescription>How the content has spread across different platforms</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={results.spreadData.platforms}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="shares" fill="#8884d8" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-4 text-sm text-muted-foreground">
                      <p>
                        The chart shows how the content has been shared across different social media platforms.
                        {results.spreadData.platforms[0].shares > 3000
                          ? " The high concentration on a single platform may indicate a targeted campaign."
                          : " The distribution across multiple platforms suggests organic sharing."}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="demographics">
                <Card>
                  <CardHeader>
                    <CardTitle>Demographic Distribution</CardTitle>
                    <CardDescription>Age groups sharing the content</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={results.spreadData.demographics}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {results.spreadData.demographics.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-4 text-sm text-muted-foreground">
                      <p>
                        The chart shows the age distribution of users sharing the content.
                        {Math.max(...results.spreadData.demographics.map((d) => d.value)) > 25
                          ? " The high concentration in specific age groups may indicate targeted content."
                          : " The even distribution across age groups suggests broad appeal."}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <Card>
              <CardHeader>
                <CardTitle>Related Content</CardTitle>
                <CardDescription>Similar content that may be part of the same campaign</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>URL</TableHead>
                      <TableHead>Similarity</TableHead>
                      <TableHead>AI Probability</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.relatedContent.map((content, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium truncate max-w-[200px]">{content.url}</TableCell>
                        <TableCell>{content.similarity.toFixed(1)}%</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              content.aiProbability > 70
                                ? "destructive"
                                : content.aiProbability > 30
                                  ? "warning"
                                  : "default"
                            }
                          >
                            {content.aiProbability.toFixed(1)}%
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="mt-4 text-sm text-muted-foreground">
                  <p>
                    These URLs contain content similar to the analyzed URL and may be part of a coordinated campaign.
                    High similarity and AI probability scores suggest potential AI-generated content networks.
                  </p>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}

