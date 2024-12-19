import ResumeCard from '@/components/resume-card'
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Link from 'next/link'
import { Network, FileJson, Layers } from "lucide-react"

const projects = [
  {
    icon: <Network className="w-8 h-8" />,
    title: "HAR Viewer",
    description: "View and analyze HAR files, generate sequence diagrams, and filter requests.",
    href: "/har-viewer"
  },
  {
    icon: <FileJson className="w-8 h-8" />,
    title: "JSON Viewer",
    description: "View and analyze JSON files, convert to table, and generate diagrams.",
    href: "/json-viewer"
  },
  {
    icon: <Layers className="w-8 h-8" />,
    title: "Creative Project",
    description: "Showcase your creative work with a compelling description.",
    href: "/projects/creative-project"
  }
]

export default function Home() {
  return (
    <main className="min-w-screen min-h-screen bg-gray-200 flex flex-col items-center justify-center px-5 py-5 gap-20">
      <ResumeCard />
      <section className="flex overflow-x-auto gap-4 pb-4">
        {projects.map((project, index) => (
          <Link href={project.href} key={index}>
            <Card className="min-w-[300px] cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-2">{project.icon}</div>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </section>
    </main>
  )
}
