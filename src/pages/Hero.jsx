"use client"

import gsap from 'gsap'
import { Code, Download, Github, Instagram, Mail, Sparkles } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useTranslation } from 'react-i18next'

const BG_IMAGE = "/glasses-lie-laptop-reflecting-light-from-screen-dark.jpg" // Place your background image in public/hero-bg.jpg
const PROFILE_IMAGE = "/profile.jpg" // Place your profile image in public/profile.jpg

const Hero = () => {
  const { t } = useTranslation();
  const [text, setText] = useState("")
  const fullText = t('hero.role')
  const [bgError, setBgError] = useState(false)
  const [imgError, setImgError] = useState(false)
  const imgRef = useRef();
  const nameTextRef = useRef();
  const roleRef = useRef();
  const btnsRef = useRef();

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      setText(fullText.slice(0, index))
      index++
      if (index > fullText.length) {
        clearInterval(timer)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    // Animate the profile image
    if (imgRef.current) {
      gsap.fromTo(imgRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" });
    }
    // Animate the name text after the image
    if (nameTextRef.current) {
      gsap.fromTo(nameTextRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: "power3.out" });
    }
    // Animate the role/description, after the name
    if (roleRef.current) {
      gsap.fromTo(roleRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 1, ease: "power3.out" });
    }
    // Animate the CTA buttons, after the role
    if (btnsRef.current) {
      gsap.fromTo(btnsRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 1.5, ease: "power3.out" });
    }
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background: gradient for light, image for dark */}
      <div className="absolute inset-0 w-full h-full">
        {/* Light mode: vibrant gradient */}
        <div className="block dark:hidden absolute inset-0 bg-gradient-to-br from-[#e0e7ff] via-[#fceabb] to-[#fbc2eb]" />
        {/* Dark mode: background image (mobile and desktop) */}
        {/* Mobile background image (dark mode, mobile only) */}
        <img
          src="/559.jpg"
          alt="Hero background mobile"
          className="hidden dark:block sm:hidden w-full h-full object-cover object-[center_top] opacity-50 dark:opacity-35"
          style={{ zIndex: 0 }}
        />
        {/* Desktop background image (debug: always show, use mobile image) */}
        <img
          src="/glasses-lie-laptop-reflecting-light-from-screen-dark(mobile).jpg"
          alt="Hero background debug"
          className="block w-full h-full object-cover object-center dark:opacity-35"
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

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Floating Code Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <Code className="absolute top-1/4 left-1/4 w-8 h-8 text-blue-400/30 animate-bounce delay-300" />
        <Sparkles className="absolute top-1/3 right-1/4 w-6 h-6 text-purple-400/30 animate-bounce delay-700" />
        <Code className="absolute bottom-1/3 left-1/3 w-10 h-10 text-pink-400/30 animate-bounce delay-1000" />
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Profile Image or Initials */}
        <div className="mb-8 relative mt-24 sm:mt-0">
          {!imgError ? (
            <img
              ref={imgRef}
              src={PROFILE_IMAGE}
              alt="Abdul Razzaq Ansari"
              className="w-40 h-40 mx-auto rounded-full object-cover border-4 border-blue-400 shadow-lg bg-white dark:bg-gray-900"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-40 h-40 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1 animate-pulse flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-6xl font-bold text-gray-600 dark:text-gray-400">
                AR
              </div>
            </div>
          )}
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white dark:border-gray-900 animate-ping"></div>
        </div>

        {/* Main Content */}
        <h1 ref={nameTextRef} className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            {t('hero.firstname')}
          </span>
          <br />
          <span className="text-gray-800 dark:text-white">{t('hero.lastname')}</span>
        </h1>

        <div ref= {roleRef} className="h-16 mb-8">
          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 font-medium">
            {text}
            <span className="animate-pulse">|</span>
          </p>
        </div>

        <p className="text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
          {t('hero.description')}
        </p>

        {/* CTA Buttons */}
        <div ref={btnsRef} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <a
            href="mailto:rajakansari833@gmail.com"
            className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
          >
            <span className="flex items-center justify-center gap-2">
              <Mail className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              {t('hero.get_in_touch')}
            </span>
          </a>
          <a
            href="https://drive.google.com/file/d/1TH1QGBxYpbRCUziBBvxhFAOy7GElsbAh/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="group px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-full font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
          >
            <span className="flex items-center justify-center gap-2">
              <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
              {t('hero.download_cv')}
            </span>
          </a>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-6">
          <a
            href="https://github.com/Rajak13"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300"
          >
            <Github className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:scale-110 transition-transform" />
          </a>
          <a
            href="mailto:rajakansari833@gmail.com"
            className="group p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300"
          >
            <Mail className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:scale-110 transition-transform" />
          </a>
          <a
            href="https://www.instagram.com/rajak01013/"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300"
          >
            <Instagram className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:scale-110 transition-transform" />
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2 animate-bounce"></div>
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

export default Hero
