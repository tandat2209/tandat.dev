import ResumeCard from '@/components/resume-card'
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function Home() {
  return (
    <main className="min-w-screen min-h-screen bg-gray-200 flex flex-col items-center justify-center px-5 py-5 gap-20">
      <ResumeCard />
      <section className="flex overflow-x-auto gap-4 pb-4">
        <Card className="min-w-[300px]">
          <CardHeader>
            <div className="text-4xl mb-2">🚀</div>
            <CardTitle>Project Title</CardTitle>
            <CardDescription>Brief description of the project goes here. Explain what makes it special.</CardDescription>
          </CardHeader>
        </Card>

        <Card className="min-w-[300px]">
          <CardHeader>
            <div className="text-4xl mb-2">💻</div>
            <CardTitle>Another Project</CardTitle>
            <CardDescription>Description of another amazing project you've worked on.</CardDescription>
          </CardHeader>
        </Card>

        <Card className="min-w-[300px]">
          <CardHeader>
            <div className="text-4xl mb-2">🎨</div>
            <CardTitle>Creative Project</CardTitle>
            <CardDescription>Showcase your creative work with a compelling description.</CardDescription>
          </CardHeader>
        </Card>
      </section>
    </main>
  )
}
