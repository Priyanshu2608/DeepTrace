import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function TextAnalysisMetrics({ metrics, indicators }) {
  // Format indicators for the chart
  const chartData = indicators.map((indicator) => ({
    name: indicator.name,
    score: indicator.score,
  }))

  return (
    <Tabs defaultValue="metrics" className="mb-8">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="metrics">Linguistic Metrics</TabsTrigger>
        <TabsTrigger value="indicators">AI Indicators</TabsTrigger>
      </TabsList>

      <TabsContent value="metrics">
        <Card>
          <CardHeader>
            <CardTitle>Linguistic Metrics</CardTitle>
            <CardDescription>Statistical measurements used to differentiate between AI and human text</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <MetricItem
                name="Perplexity"
                value={metrics.perplexity}
                description="How surprised a model is by the text. Lower values suggest AI generation."
                min={0}
                max={100}
                lowLabel="Likely AI"
                highLabel="Likely Human"
                invert={true}
              />

              <MetricItem
                name="Burstiness"
                value={metrics.burstiness}
                description="Variation in sentence length and structure. Higher values suggest human writing."
                min={0}
                max={1}
                lowLabel="Uniform (AI)"
                highLabel="Varied (Human)"
                format={(v) => v.toFixed(2)}
              />

              <MetricItem
                name="Entropy"
                value={metrics.entropy}
                description="Measure of randomness in the text. Higher values suggest more natural language."
                min={0}
                max={5}
                lowLabel="Predictable"
                highLabel="Unpredictable"
                format={(v) => v.toFixed(2)}
              />

              <MetricItem
                name="Repetitiveness"
                value={metrics.repetitiveness}
                description="Frequency of repeated phrases or patterns. Higher values suggest AI generation."
                min={0}
                max={1}
                lowLabel="Varied (Human)"
                highLabel="Repetitive (AI)"
                format={(v) => v.toFixed(2)}
                invert={true}
              />
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="indicators">
        <Card>
          <CardHeader>
            <CardTitle>AI Indicators</CardTitle>
            <CardDescription>Specific patterns and characteristics that suggest AI-generated content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="name" type="category" width={150} />
                  <Tooltip />
                  <Bar dataKey="score" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-4 mt-6">
              {indicators.map((indicator, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span>{indicator.name}</span>
                    <span>{indicator.score.toFixed(1)}%</span>
                  </div>
                  <Progress value={indicator.score} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

function MetricItem({
  name,
  value,
  description,
  min,
  max,
  lowLabel,
  highLabel,
  format = (v) => v.toFixed(1),
  invert = false,
}) {
  // Calculate percentage for the progress bar
  const percentage = ((value - min) / (max - min)) * 100

  // For inverted metrics (where lower values indicate AI), invert the color logic
  const displayPercentage = invert ? 100 - percentage : percentage

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <div>
          <h3 className="text-sm font-medium">{name}</h3>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
        <span className="text-sm font-medium">{format(value)}</span>
      </div>

      <div className="space-y-1">
        <Progress value={displayPercentage} className="h-2" />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{lowLabel}</span>
          <span>{highLabel}</span>
        </div>
      </div>
    </div>
  )
}

