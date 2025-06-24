"use client"

import { Brain, Clock, Code2, Database, FileText, Globe, MessageCircle, Palette, Target, Users } from "lucide-react"
import { useState } from "react"

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("technical")

  const skillCategories = {
    technical: [
      {
        name: "PHP",
        level: 90,
        color: "from-purple-500 to-blue-600",
        icon: "🐘",
        description: "Server-side scripting and web development",
      },
      {
        name: "Java",
        level: 85,
        color: "from-red-500 to-orange-600",
        icon: "☕",
        description: "Object-oriented programming and enterprise applications",
      },
      {
        name: "Python",
        level: 80,
        color: "from-green-500 to-blue-600",
        icon: "🐍",
        description: "Data analysis, automation, and backend development",
      },
      {
        name: "React",
        level: 85,
        color: "from-blue-500 to-cyan-600",
        icon: "⚛️",
        description: "Modern frontend library for building user interfaces",
      },
      {
        name: "HTML/CSS",
        level: 95,
        color: "from-orange-500 to-red-600",
        icon: "🌐",
        description: "Markup and styling for web applications",
      },
      {
        name: "JavaScript",
        level: 88,
        color: "from-yellow-500 to-orange-600",
        icon: "🟨",
        description: "Dynamic programming for web and mobile applications",
      },
      {
        name: "SQL",
        level: 82,
        color: "from-indigo-500 to-purple-600",
        icon: "🗄️",
        description: "Database management and query optimization",
      },
      {
        name: "Electron",
        level: 75,
        color: "from-gray-500 to-blue-600",
        icon: "⚡",
        description: "Cross-platform desktop application development",
      },
    ],
    soft: [
      {
        name: "Problem Solving",
        level: 92,
        color: "from-green-500 to-teal-600",
        icon: Brain,
        description: "Analytical thinking and creative solution finding",
      },
      {
        name: "Time Management",
        level: 88,
        color: "from-blue-500 to-indigo-600",
        icon: Clock,
        description: "Efficient project planning and deadline management",
      },
      {
        name: "Communication",
        level: 85,
        color: "from-purple-500 to-pink-600",
        icon: MessageCircle,
        description: "Clear technical communication and presentation skills",
      },
      {
        name: "Teamwork",
        level: 90,
        color: "from-orange-500 to-red-600",
        icon: Users,
        description: "Collaborative development and agile methodologies",
      },
      {
        name: "Documentation",
        level: 87,
        color: "from-cyan-500 to-blue-600",
        icon: FileText,
        description: "Technical writing and code documentation",
      },
    ],
  }

  const techStack = [
    { name: "React", icon: "⚛️", color: "bg-blue-500", position: { top: "10%", left: "15%" } },
    { name: "JavaScript", icon: "🟨", color: "bg-yellow-500", position: { top: "25%", right: "20%" } },
    { name: "PHP", icon: "🐘", color: "bg-purple-500", position: { top: "45%", left: "10%" } },
    { name: "Java", icon: "☕", color: "bg-orange-600", position: { top: "60%", right: "15%" } },
    { name: "Python", icon: "🐍", color: "bg-green-500", position: { top: "75%", left: "20%" } },
    { name: "HTML", icon: "🌐", color: "bg-orange-500", position: { top: "20%", left: "50%" } },
    { name: "CSS", icon: "🎨", color: "bg-blue-600", position: { top: "80%", right: "25%" } },
    { name: "SQL", icon: "🗄️", color: "bg-indigo-500", position: { top: "35%", right: "45%" } },
    { name: "Git", icon: "🔧", color: "bg-gray-700", position: { top: "55%", left: "45%" } },
    { name: "AWS", icon: "☁️", color: "bg-yellow-600", position: { top: "15%", right: "40%" } },
  ]

  return (
    <section
      id="skills"
      className="py-20 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Skills & Expertise
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            A comprehensive overview of my technical abilities and professional skills
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Floating Tech Stack Visualization */}
          <div className="lg:col-span-1">
            <div className="relative h-96 bg-gradient-to-br from-white/70 to-purple-50/70 dark:from-gray-900/70 dark:to-purple-900/30 backdrop-blur-md rounded-3xl border border-white/20 dark:border-gray-700/20 overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5"></div>

              {/* Central Avatar */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-2xl">
                  AR
                </div>
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl opacity-20 animate-pulse"></div>
              </div>

              {/* Floating Tech Icons */}
              {techStack.map((tech, index) => (
                <div
                  key={tech.name}
                  className="absolute group cursor-pointer"
                  style={{
                    ...tech.position,
                    animation: `float 6s ease-in-out infinite ${index * 0.5}s`,
                  }}
                >
                  <div className="relative">
                    <div
                      className={`w-12 h-12 ${tech.color} rounded-xl shadow-lg flex items-center justify-center text-white text-xl transform transition-all duration-300 group-hover:scale-125 group-hover:rotate-12`}
                    >
                      {tech.icon}
                    </div>
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>

                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                      {tech.name}
                    </div>
                  </div>
                </div>
              ))}

              {/* Connecting Lines Animation */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#ec4899" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
                {techStack.slice(0, 5).map((_, index) => (
                  <line
                    key={index}
                    x1="50%"
                    y1="50%"
                    x2={`${20 + index * 15}%`}
                    y2={`${30 + index * 10}%`}
                    stroke="url(#lineGradient)"
                    strokeWidth="1"
                    className="animate-pulse"
                    style={{ animationDelay: `${index * 0.3}s` }}
                  />
                ))}
              </svg>
            </div>
          </div>

          {/* Skills Categories */}
          <div className="lg:col-span-2">
            <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-md rounded-3xl border border-white/20 dark:border-gray-700/20 p-8 shadow-2xl">
              {/* Category Tabs */}
              <div className="flex mb-8 bg-gray-100 dark:bg-gray-800 rounded-2xl p-2">
                <button
                  onClick={() => setActiveCategory("technical")}
                  className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                    activeCategory === "technical"
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg transform scale-105"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                  }`}
                >
                  <Code2 className="w-5 h-5" />
                  Technical Skills
                </button>
                <button
                  onClick={() => setActiveCategory("soft")}
                  className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                    activeCategory === "soft"
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg transform scale-105"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                  }`}
                >
                  <Target className="w-5 h-5" />
                  Soft Skills
                </button>
              </div>

              {/* Skills List */}
              <div className="space-y-6">
                {skillCategories[activeCategory].map((skill, index) => {
                  const IconComponent = skill.icon
                  return (
                    <div key={skill.name} className="group">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex items-center gap-3 flex-1">
                          {typeof skill.icon === "string" ? (
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white text-lg">
                              {skill.icon}
                            </div>
                          ) : (
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white">
                              <IconComponent className="w-5 h-5" />
                            </div>
                          )}
                          <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-semibold text-gray-800 dark:text-white text-lg">{skill.name}</span>
                              <span className="text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
                                {skill.level}%
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{skill.description}</p>
                          </div>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out group-hover:scale-105 relative`}
                          style={{
                            width: `${skill.level}%`,
                            animationDelay: `${index * 0.1}s`,
                          }}
                        >
                          <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Skills Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-md rounded-2xl border border-white/20 dark:border-gray-700/20 p-6 text-center group hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Web Development</h3>
            <p className="text-gray-600 dark:text-gray-400">Full-stack web applications with modern frameworks</p>
          </div>

          <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-md rounded-2xl border border-white/20 dark:border-gray-700/20 p-6 text-center group hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300">
              <Database className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Database Design</h3>
            <p className="text-gray-600 dark:text-gray-400">Efficient database architecture and optimization</p>
          </div>

          <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-md rounded-2xl border border-white/20 dark:border-gray-700/20 p-6 text-center group hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300">
              <Palette className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">UI/UX Design</h3>
            <p className="text-gray-600 dark:text-gray-400">User-centered design and wireframing</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills
