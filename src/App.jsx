"use client"

import { Briefcase, ChevronDown, Code, Globe, Home, Mail, Menu, Moon, Sun, User, X } from "lucide-react"
import { useEffect, useState } from "react"
import { useTranslation } from 'react-i18next'
import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import "./App.css"
import i18n from "./i18n"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Hero from "./pages/Hero"
import Projects from "./pages/Projects"
import Skills from "./pages/Skills"

function App() {
  const [darkMode, setDarkMode] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { t } = useTranslation();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  useEffect(() => {
    // Always start with English, then check localStorage
    const savedLang = localStorage.getItem('i18nextLng');
    if (savedLang && savedLang !== i18n.language) {
      i18n.changeLanguage(savedLang);
    } else if (!savedLang) {
      i18n.changeLanguage('en');
      localStorage.setItem('i18nextLng', 'en');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const handleNavClick = (route) => {
    setMobileMenuOpen(false)
    navigate(route)
  }

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('i18nextLng', lang);
    setLanguageDropdownOpen(false);
  }

  const navItems = [
    { route: "/", label: t('nav.home'), icon: Home },
    { route: "/about", label: t('nav.about'), icon: User },
    { route: "/skills", label: t('nav.skills'), icon: Code },
    { route: "/projects", label: t('nav.projects'), icon: Briefcase },
    { route: "/contact", label: t('nav.contact'), icon: Mail },
  ]

  const languages = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'ne', label: 'नेपाली', flag: '🇳🇵' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
  ]

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-900 transition-all duration-500">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-white/20 dark:border-gray-700/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Abdul Razzaq
            </div>

            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.route
                return (
                  <button
                    key={item.route}
                    onClick={() => handleNavClick(item.route)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                      isActive 
                        ? "text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 shadow-lg"
                        : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden xl:inline">{item.label}</span>
                  </button>
                )
              })}
            </div>

            <div className="flex items-center gap-3">
              {/* Language Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 dark:bg-gray-800/50 backdrop-blur-md border border-white/20 dark:border-gray-700/20 hover:bg-white/20 dark:hover:bg-gray-700/50 transition-all duration-300"
                >
                  <Globe className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {currentLanguage.flag} {currentLanguage.code.toUpperCase()}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-600 dark:text-gray-300 transition-transform duration-200 ${languageDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {languageDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg backdrop-blur-md">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 ${
                          lang.code === i18n.language 
                            ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" 
                            : "text-gray-700 dark:text-gray-300"
                        } ${lang.code === languages[0].code ? 'rounded-t-xl' : ''} ${lang.code === languages[languages.length - 1].code ? 'rounded-b-xl' : ''}`}
                      >
                        <span className="text-lg">{lang.flag}</span>
                        <span className="font-medium">{lang.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

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

          <div
            className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="py-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.route
                return (
                  <button
                    key={item.route}
                    onClick={() => handleNavClick(item.route)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                      isActive 
                        ? "text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30"
                        : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Route Pages */}
      <div className="pt-20">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
