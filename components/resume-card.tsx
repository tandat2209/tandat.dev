import { FC } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Globe } from 'lucide-react'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
}

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { 
    y: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4
    }
  }
}

const ResumeCard: FC = () => {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{
        scale: 1.02,
        rotate: -1,
        transition: { type: "spring", bounce: 0.4 }
      }}
      className="w-full max-w-[400px] relative"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#4FACFE] to-[#00F2FE] rounded-2xl opacity-20"
        animate={{
          rotate: [0, 2, -2, 2, 0],
          scale: [1, 1.02, 0.98, 1.02, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <div className="bg-white rounded-2xl p-6 h-full relative shadow-lg">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          {/* Profile Picture */}
          <motion.div variants={item} className="flex justify-center">
            <motion.div
              className="w-24 h-24 rounded-full bg-gradient-to-br from-[#4FACFE] to-[#2BFF88] flex items-center justify-center text-3xl font-bold text-white shadow-lg"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, -2, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              DN
            </motion.div>
          </motion.div>

          {/* Name */}
          <motion.div variants={item} className="text-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#4FACFE] to-[#2BFF88] bg-clip-text text-transparent">
              Dat Nguyen
            </h1>
            <p className="text-[#6B7280] mt-1">Fullstack Developer</p>
          </motion.div>

          {/* Links */}
          <motion.div variants={item} className="flex justify-center gap-4">
            <motion.a
              href="https://github.com/tandat2209"
              target="_blank"
              className="p-2 rounded-xl bg-[#E8F7FF] text-[#4FACFE] hover:bg-[#4FACFE] hover:text-white transition-colors"
              whileHover={{ y: -4, rotate: -5, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github size={20} />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/tandat2209/"
              target="_blank"
              className="p-2 rounded-xl bg-[#E8FFF4] text-[#2BFF88] hover:bg-[#2BFF88] hover:text-white transition-colors"
              whileHover={{ y: -4, rotate: 5, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Linkedin size={20} />
            </motion.a>
            <motion.a
              href="https://tandat.dev"
              target="_blank"
              className="p-2 rounded-xl bg-[#FFF8E8] text-[#FFB344] hover:bg-[#FFB344] hover:text-white transition-colors"
              whileHover={{ y: -4, rotate: -5, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Globe size={20} />
            </motion.a>
          </motion.div>

          {/* Skills */}
          <motion.div variants={item} className="flex flex-wrap gap-2 justify-center">
            {['React', 'TypeScript', 'Node.js', 'Next.js'].map((skill, index) => (
              <motion.span
                key={skill}
                className="px-3 py-1 rounded-full text-sm font-medium"
                style={{
                  backgroundColor: `${index % 2 === 0 ? '#4FACFE' : '#2BFF88'}20`,
                  color: index % 2 === 0 ? '#4FACFE' : '#2BFF88'
                }}
                whileHover={{
                  scale: 1.1,
                  rotate: index % 2 === 0 ? -5 : 5,
                  y: -2
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.5 + (index * 0.1),
                  type: "spring",
                  bounce: 0.4
                }}
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>

          {/* Fun decorative elements */}
          <motion.div
            className="absolute -z-10 top-4 right-4 w-3 h-3 rounded-full bg-[#FFB344] opacity-20"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute -z-10 bottom-4 left-4 w-2 h-2 rounded-full bg-[#2BFF88] opacity-20"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.1, 0.2, 0.1],
              rotate: [360, 180, 0]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default ResumeCard
