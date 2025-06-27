"use client"

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Brain, CheckCircle, Clock, Code2, Database, FileText, Github, Globe, Instagram, MessageCircle, Palette, Target, Users } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useTranslation } from 'react-i18next'

gsap.registerPlugin(ScrollTrigger)

const Skills = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("technical")
  const skillsGridRef = useRef();

  useEffect(() => {
    // Card scale-in + fade-in on scroll
    gsap.utils.toArray('.skill-card').forEach((card, i) => {
      gsap.fromTo(
        card,
        { y: 40, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: i * 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    // Parallax on skill icons
    gsap.utils.toArray('.skill-icon-parallax').forEach((icon) => {
      gsap.fromTo(
        icon,
        { y: 0 },
        {
          y: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: icon,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    });
  }, []);

  const skillCategories = {
    technical: [
      {
        name: "PHP",
        color: "from-purple-500 to-blue-600",
        icon: "🐘",
        description: "Server-side scripting and web development",
        highlights: ["Backend Development", "API Integration", "Database Management"]
      },
      {
        name: "Java",
        color: "from-red-500 to-orange-600",
        icon: "☕",
        description: "Object-oriented programming and enterprise applications",
        highlights: ["Enterprise Applications", "Microservices", "Spring Framework"]
      },
      {
        name: "Python",
        color: "from-green-500 to-blue-600",
        icon: "🐍",
        description: "Data analysis, automation, and backend development",
        highlights: ["Data Analysis", "Automation", "Web Scraping"]
      },
      {
        name: "React",
        color: "from-blue-500 to-cyan-600",
        icon: "⚛️",
        description: "Modern frontend library for building user interfaces",
        highlights: ["Component Architecture", "State Management", "Performance Optimization"]
      },
      {
        name: "HTML/CSS",
        color: "from-orange-500 to-red-600",
        icon: "🌐",
        description: "Markup and styling for web applications",
        highlights: ["Responsive Design", "CSS Grid", "Flexbox"]
      },
      {
        name: "JavaScript",
        color: "from-yellow-500 to-orange-600",
        icon: "🟨",
        description: "Dynamic programming for web and mobile applications",
        highlights: ["ES6+ Features", "Async Programming", "DOM Manipulation"]
      },
      {
        name: "SQL",
        color: "from-indigo-500 to-purple-600",
        icon: "🗄️",
        description: "Database management and query optimization",
        highlights: ["Database Design", "Query Optimization", "Data Modeling"]
      },
      {
        name: "Electron",
        color: "from-gray-500 to-blue-600",
        icon: "⚡",
        description: "Cross-platform desktop application development",
        highlights: ["Desktop Apps", "Cross-platform", "Native Integration"]
      },
    ],
    soft: [
      {
        name: "Problem Solving",
        color: "from-green-500 to-teal-600",
        icon: Brain,
        description: "Analytical thinking and creative solution finding",
        strengths: ["Critical Analysis", "Creative Solutions", "Systematic Approach"],
        highlights: ["Algorithm Design", "Debugging", "Optimization"]
      },
      {
        name: "Time Management",
        color: "from-blue-500 to-indigo-600",
        icon: Clock,
        description: "Efficient project planning and deadline management",
        strengths: ["Project Planning", "Deadline Adherence", "Priority Setting"],
        highlights: ["Agile Methodologies", "Sprint Planning", "Resource Allocation"]
      },
      {
        name: "Communication",
        color: "from-purple-500 to-pink-600",
        icon: MessageCircle,
        description: "Clear technical communication and presentation skills",
        strengths: ["Technical Writing", "Client Communication", "Team Collaboration"],
        highlights: ["Documentation", "Presentations", "Stakeholder Management"]
      },
      {
        name: "Teamwork",
        color: "from-orange-500 to-red-600",
        icon: Users,
        description: "Collaborative development and agile methodologies",
        strengths: ["Agile Development", "Code Reviews", "Mentoring"],
        highlights: ["Code Reviews", "Pair Programming", "Knowledge Sharing"]
      },
      {
        name: "Documentation",
        color: "from-cyan-500 to-blue-600",
        icon: FileText,
        description: "Technical writing and code documentation",
        strengths: ["API Documentation", "Code Comments", "User Guides"],
        highlights: ["API Docs", "README Files", "Technical Specifications"]
      },
    ],
  }

  return (
    <section
      id="skills"
      className="min-h-screen py-20 relative overflow-hidden"
    >
      {/* Background: gradient for light, image for dark */}
      <div className="absolute inset-0 w-full h-full">
        {/* Light mode: vibrant gradient */}
        <div className="block dark:hidden absolute inset-0 bg-gradient-to-br from-[#fbc2eb] via-[#e0e7ff] to-[#c2ffd8]" />
        {/* Dark mode: background image (user will set their own) */}
        <img
          src="/hero-bg.jpg"
          alt="Skills background"
          className="hidden dark:block w-full h-full object-cover object-center dark:opacity-35"
          style={{ zIndex: 0 }}
        />
        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "url('data:image/svg+xml,%3Csvg%20width=\'60\'%20height=\'60\'%20viewBox=\'0%200%2060%2060\'%20xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg%20fill=\'none\'%20fillRule=\'evenodd\'%3E%3Cg%20fill=\'%239C92AC\'%20fillOpacity=\'0.1\'%3E%3Ccircle%20cx=\'30\'%20cy=\'30\'%20r=\'2\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
            backgroundRepeat: "repeat",
            zIndex: 1,
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {t('skills.title')}
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {t('skills.subtitle')}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-md rounded-2xl p-2 border border-white/20 dark:border-gray-700/20 shadow-xl">
            <button
              onClick={() => setActiveCategory("technical")}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                activeCategory === "technical"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg transform scale-105"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              }`}
            >
              <Code2 className="w-5 h-5" />
              {t('skills.tabs.technical')}
            </button>
            <button
              onClick={() => setActiveCategory("soft")}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                activeCategory === "soft"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg transform scale-105"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              }`}
            >
              <Target className="w-5 h-5" />
              {t('skills.tabs.soft')}
            </button>
          </div>
        </div>

        {/* Skills Grid */}
        <div ref={skillsGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {skillCategories[activeCategory].map((skill, index) => {
            const IconComponent = skill.icon
            return (
              <div 
                key={skill.name} 
                className="skill-card group bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl border border-white/20 dark:border-gray-700/20 p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:border-purple-200 dark:hover:border-purple-800"
              >
                {/* Skill Header */}
                <div className="flex items-start gap-4 mb-4">
                  {typeof skill.icon === "string" ? (
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg skill-icon-parallax">
                      {skill.icon}
                    </div>
                  ) : (
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white shadow-lg skill-icon-parallax">
                      <IconComponent className="w-8 h-8" />
                    </div>
                  )}
                </div>

                {/* Skill Name */}
                <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-white">
                  {skill.name}
                </h3>

                {/* Skill Description */}
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
                  {skill.description}
                </p>

                {/* Highlights */}
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                    Key Highlights
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {(skill.highlights || skill.strengths).map((item, itemIndex) => (
                      <span key={itemIndex} className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs rounded-full flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Expertise Areas */}
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-8">
            {t('skills.expertise.title')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-md rounded-2xl border border-white/20 dark:border-gray-700/20 p-8 text-center group hover:scale-105 transition-transform duration-300 hover:shadow-xl">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-300">
                <Globe className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-3">{t('skills.expertise.web.title')}</h4>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {t('skills.expertise.web.desc')}
              </p>
            </div>

            <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-md rounded-2xl border border-white/20 dark:border-gray-700/20 p-8 text-center group hover:scale-105 transition-transform duration-300 hover:shadow-xl">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-300">
                <Database className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-3">{t('skills.expertise.db.title')}</h4>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {t('skills.expertise.db.desc')}
              </p>
            </div>

            <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-md rounded-2xl border border-white/20 dark:border-gray-700/20 p-8 text-center group hover:scale-105 transition-transform duration-300 hover:shadow-xl">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-300">
                <Palette className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-3">{t('skills.expertise.uiux.title')}</h4>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {t('skills.expertise.uiux.desc')}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-sm flex flex-col items-center gap-2">
          <div className="flex items-center justify-center gap-3 mb-1">
            <a
              href="https://github.com/Rajak13"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="inline-flex items-center justify-center p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Github className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </a>
            <a
              href="https://www.instagram.com/rajak01013/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="inline-flex items-center justify-center p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Instagram className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </a>
          </div>
          <span className="text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Abdul Razzaq Ansari. All rights reserved.
          </span>
        </footer>
      </div>
    </section>
  )
}

export default Skills
