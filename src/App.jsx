"use client"

import { Briefcase, Code, Home, Mail, Menu, Moon, Sun, User, X } from "lucide-react"
import { useEffect, useState } from "react"
import "./App.css"
import About from "./components/About"
import Contact from "./components/Contact"
import Hero from "./components/Hero"
import Projects from "./components/Projects"
import Skills from "./components/Skills"

function App() {
  const [darkMode, setDarkMode] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const handleNavClick = (sectionId) => {
    setMobileMenuOpen(false)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "about", label: "About", icon: User },
    { id: "skills", label: "Skills", icon: Code },
    { id: "projects", label: "Projects", icon: Briefcase },
    { id: "contact", label: "Contact", icon: Mail },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-900 transition-all duration-500">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-white/20 dark:border-gray-700/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Abdul Razzaq
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => {
                const IconComponent = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                      activeSection === item.id
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105"
                        : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className="hidden xl:inline">{item.label}</span>
                  </button>
                )
              })}
            </div>

            {/* Mobile Navigation Button & Dark Mode Toggle */}
            <div className="flex items-center gap-3">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-xl bg-white/10 dark:bg-gray-800/50 backdrop-blur-md border border-white/20 dark:border-gray-700/20 hover:bg-white/20 dark:hover:bg-gray-700/50 transition-all duration-300 group"
              >
                {darkMode ? (
                  <Sun className="w-5 h-5 text-yellow-400 group-hover:rotate-180 transition-transform duration-500" />
                ) : (
                  <Moon className="w-5 h-5 text-slate-700 group-hover:rotate-180 transition-transform duration-500" />
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 rounded-xl bg-white/10 dark:bg-gray-800/50 backdrop-blur-md border border-white/20 dark:border-gray-700/20 hover:bg-white/20 dark:hover:bg-gray-700/50 transition-all duration-300"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          <div
            className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="py-4 space-y-2">
              {navItems.map((item) => {
                const IconComponent = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                      activeSection === item.id
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                        : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sections */}
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </div>
  )
}

export default App
