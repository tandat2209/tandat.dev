"use client"
import ResumeCard from '@/components/resume-card'
import { Card } from "@/components/ui/card"
import Link from 'next/link'
import { Network, FileJson, BookOpen } from "lucide-react"
import { motion } from 'framer-motion'

const projects = [
  {
    icon: <Network className="w-8 h-8" />,
    title: "HAR Viewer",
    description: "View and analyze HAR files, generate sequence diagrams, and filter requests.",
    href: "/har-viewer",
    color: "#4FACFE"
  },
  {
    icon: <FileJson className="w-8 h-8" />,
    title: "JSON Viewer",
    description: "View and analyze JSON files, convert to table, and generate diagrams.",
    href: "/json-viewer",
    color: "#2BFF88"
  },
  {
    icon: <BookOpen className="w-8 h-8" />,
    title: "Python Learning",
    description: "Learn Python with interactive coding challenges and Vietnamese tutorials",
    href: "https://code.tandat.dev",
    color: "#FFB344"
  }
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
}

const item = {
  hidden: { y: 50, opacity: 0, scale: 0.8 },
  show: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      bounce: 0.5
    }
  }
}

const iconAnimation = {
  hover: {
    rotate: [0, -10, 10, -10, 10, 0],
    scale: 1.2,
    transition: {
      duration: 0.6,
      ease: "easeInOut"
    }
  }
}

export default function Home() {
  return (
    <main className="min-w-screen min-h-screen bg-gray-100 flex flex-col items-center justify-center px-5 py-5 gap-20">
      <ResumeCard />
      <div className="w-full overflow-visible px-4 py-8">
        <motion.section
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-wrap justify-center gap-6 overflow-visible"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{
                scale: 1.05,
                rotate: index % 2 === 0 ? -2 : 2,
                y: -5,
                zIndex: 1
              }}
              transition={{
                type: "spring",
                bounce: 0.6
              }}
              className="relative"
              style={{
                transformOrigin: "center center",
                perspective: "1000px"
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#4FACFE] to-[#00F2FE] rounded-2xl opacity-20"
                animate={{
                  rotate: [0, 2, -2, 2, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <Link href={project.href}>
                <Card className="relative w-[300px] bg-white rounded-2xl p-6 cursor-pointer border-0 shadow-lg">
                  <div className="space-y-4">
                    <motion.div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center"
                      style={{
                        backgroundColor: `${project.color}20`,
                        color: project.color
                      }}
                      whileHover={iconAnimation.hover}
                    >
                      {project.icon}
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h3 className="text-xl font-bold bg-gradient-to-r from-[#4FACFE] to-[#2BFF88] bg-clip-text text-transparent">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-gray-600 text-sm">
                        {project.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Decorative dots */}
                  <motion.div
                    className="absolute -z-10 top-4 right-4 w-3 h-3 rounded-full"
                    style={{ backgroundColor: project.color }}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.2, 0.3, 0.2]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <motion.div
                    className="absolute -z-10 bottom-4 left-4 w-2 h-2 rounded-full"
                    style={{ backgroundColor: project.color }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5
                    }}
                  />
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.section>
      </div>
    </main>
  )
}
