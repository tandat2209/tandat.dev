import { FC } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Globe } from 'lucide-react'

const ResumeCard: FC = () => {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-[400px] rounded-[2rem] bg-gradient-to-br from-[#4FACFE] to-[#00F2FE] p-1"
    >
      <div className="bg-white rounded-[1.9rem] p-6 h-full">
        <motion.div
          className="space-y-6"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Profile Picture */}
          <div className="flex justify-center">
            <motion.div
              className="w-24 h-24 rounded-full bg-gradient-to-br from-[#4FACFE] to-[#2BFF88] flex items-center justify-center text-3xl font-bold text-white shadow-lg"
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              DN
            </motion.div>
          </div>

          {/* Name */}
          <div className="text-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#4FACFE] to-[#2BFF88] bg-clip-text text-transparent">
              Dat Nguyen
            </h1>
            <p className="text-[#6B7280] mt-1">Fullstack Developer</p>
          </div>

          {/* Links */}
          <div className="flex justify-center gap-4">
            <motion.a
              href="https://github.com/tandat2209"
              target="_blank"
              className="p-2 rounded-xl bg-[#E8F7FF] text-[#4FACFE] hover:bg-[#4FACFE] hover:text-white transition-colors"
              whileHover={{ y: -2, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github size={20} />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/tandat2209/"
              target="_blank"
              className="p-2 rounded-xl bg-[#E8FFF4] text-[#2BFF88] hover:bg-[#2BFF88] hover:text-white transition-colors"
              whileHover={{ y: -2, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Linkedin size={20} />
            </motion.a>
            <motion.a
              href="https://tandat.dev"
              target="_blank"
              className="p-2 rounded-xl bg-[#FFF8E8] text-[#FFB344] hover:bg-[#FFB344] hover:text-white transition-colors"
              whileHover={{ y: -2, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Globe size={20} />
            </motion.a>
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-2 justify-center">
            {['React', 'TypeScript', 'Node.js', 'Next.js'].map((skill, index) => (
              <motion.span
                key={skill}
                className="px-3 py-1 rounded-full text-sm font-medium"
                style={{
                  backgroundColor: index % 2 === 0 ? '#E8F7FF' : '#E8FFF4',
                  color: index % 2 === 0 ? '#4FACFE' : '#2BFF88'
                }}
                whileHover={{
                  scale: 1.05,
                  rotate: index % 2 === 0 ? -3 : 3
                }}
                whileTap={{ scale: 0.95 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>

          {/* Fun decorative elements */}
          <motion.div
            className="absolute -z-10 top-10 right-10 w-6 h-6 rounded bg-[#FFB344] opacity-20"
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute -z-10 bottom-10 left-10 w-4 h-4 rounded bg-[#2BFF88] opacity-20"
            animate={{
              rotate: -360,
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default ResumeCard
