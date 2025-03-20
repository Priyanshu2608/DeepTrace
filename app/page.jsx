import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, FileText, Image, Database, BarChart3 } from "lucide-react"

export default function Home() {
  return (
    <div className="container mx-auto py-[150px] px-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight mb-5 mt-[-60px]">Forensic Analysis of AI-Generated Content</h1>
        <p className="text-xl text-muted-foreground max-w-3xl py-[10px] mx-auto">
          A comprehensive multi-stage system for detecting and analyzing AI-generated content across text, images,
          videos, and metadata.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 mb-12">
        <FeatureCard
          icon={<FileText className="h-10 w-10" />}
          title="Text Analysis"
          description="Detect AI-generated text by analyzing linguistic patterns, perplexity, and burstiness."
          href="/text-analysis"
        />
        <FeatureCard
          icon={<Image className="h-10 w-10" />}
          title="Image & Video Analysis"
          description="Identify deepfakes and AI-generated visuals through advanced detection."
          href="/image-analysis"
        />
        <FeatureCard
          icon={<Database className="h-10 w-10" />}
          title="Metadata Inspection"
          description="Examine file metadata to detect inconsistencies and signs of manipulation."
          href="/metadata-analysis"
        />
        <FeatureCard
          icon={<BarChart3 className="h-10 w-10" />}
          title="Behavioral Analysis"
          description="Track patterns in how AI-generated content spreads across platforms."
          href="/behavioral-analysis"
        />
      </div>

      <div className="bg-muted rounded-lg p-8 mb-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">How It Works</h2>
          <ol className="space-y-4">
            <li className="flex gap-4">
              <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold">Upload Content</h3>
                <p className="text-muted-foreground">
                  Upload text, images, or videos for analysis through our intuitive interface.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold">Multi-Stage Analysis</h3>
                <p className="text-muted-foreground">
                  Our system runs multiple detection algorithms to analyze the content from different angles.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold">Comprehensive Results</h3>
                <p className="text-muted-foreground">
                  Receive detailed reports with confidence scores and specific indicators of AI generation.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">
                4
              </div>
              <div>
                <h3 className="font-semibold">Export & Share</h3>
                <p className="text-muted-foreground">
                  Export analysis results in various formats or share them directly with stakeholders.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Start Analyzing?</h2>
        <p className="text-muted-foreground mb-6">
          Choose one of our analysis tools to begin detecting AI-generated content.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/text-analysis">Analyze Text</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/image-analysis">Analyze Images</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, description, href }) {
  return (
   <Card className="h-[420px] w-[320px] flex flex-col items-center text-center p-6 hover:cursor-pointer shadow-lg rounded-lg transition-transform transform hover:scale-105">
  <CardHeader className="flex flex-col items-center gap-3">
    <div className="text-primary">{icon}</div>
    <CardTitle className="text-lg font-semibold">{title}</CardTitle>
    <CardDescription className="text-sm text-muted-foreground">{description}</CardDescription>
  </CardHeader>
  
  <CardFooter className="mt-auto w-full">
    <Button asChild variant="ghost" className="w-full flex items-center justify-center gap-2">
      <Link href={href} className="flex items-center">
        Learn more <ArrowRight className="h-5 w-5" />
      </Link>
    </Button>
  </CardFooter>
</Card>

  )
}

