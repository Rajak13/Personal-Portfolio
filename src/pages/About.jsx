import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Calendar, Github, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const { t } = useTranslation();
  const aboutRef = useRef();

  useEffect(() => {
    if (aboutRef.current) {
      gsap.fromTo(
        aboutRef.current,
        { y: 40, opacity: 0, scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: aboutRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }
  }, []);

  return (
    <section
      id="about"
      ref={aboutRef}
      className="min-h-screen py-20 relative overflow-hidden"
    >
      {/* Background: gradient for light, image for dark */}
      <div className="absolute inset-0 w-full h-full">
        {/* Light mode: vibrant gradient */}
        <div className="block dark:hidden absolute inset-0 bg-gradient-to-br from-[#fceabb] via-[#e0e7ff] to-[#b6ffe0]" />
        {/* Dark mode: background image */}
        <img
          src="/89781.jpg"
          alt="About background"
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
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{t('about.title')}</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {t('about.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Main About Card */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
            <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300">
              <div className="flex items-start gap-6">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                  AR
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">{t('about.greeting')}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {t('about.intro')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info Card */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
            <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">{t('about.get_in_touch')}</h3>
              <div className="space-y-4">
                <div className="flex gap-4 mb-4">
                  <a href="mailto:rajakansari833@gmail.com" aria-label="Email" className="p-2 rounded-full bg-white/80 dark:bg-gray-900/80 shadow hover:bg-blue-100 dark:hover:bg-blue-800 transition">
                    <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </a>
                  <a href="https://www.instagram.com/rajak01013/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="p-2 rounded-full bg-white/80 dark:bg-gray-900/80 shadow hover:bg-pink-100 dark:hover:bg-pink-800 transition">
                    <Instagram className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                  </a>
                  <a href="https://github.com/Rajak13" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="p-2 rounded-full bg-white/80 dark:bg-gray-900/80 shadow hover:bg-blue-100 dark:hover:bg-blue-800 transition">
                    <Github className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('about.phone')}</p>
                    <p className="text-gray-800 dark:text-white font-medium">+977 9827310498</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('about.location')}</p>
                    <p className="text-gray-800 dark:text-white font-medium">Dharan-1, Sunsari, Nepal</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Education & Certifications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Education Card */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
            <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{t('about.education')}</h3>
              </div>
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-gray-800 dark:text-white">{t('about.degree')}</h4>
                  <p className="text-blue-600 dark:text-blue-400 font-medium">2023 - Current</p>
                  <p className="text-gray-600 dark:text-gray-300">Itahari International College</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">London Metropolitan University</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-gray-800 dark:text-white">{t('about.scl')}</h4>
                  <p className="text-green-600 dark:text-green-400 font-medium">2020 - 2022</p>
                  <p className="text-gray-600 dark:text-gray-300">Dharan Adarsha Secondary Boarding School</p>
                </div>
              </div>
            </div>
          </div>

          {/* Certifications Card */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
            <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{t('about.certifications')}</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  <a href="https://drive.google.com/file/d/1aVF8xZUq12kVtEQaguz9jdZEmARIU4pO/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 underline hover:text-orange-600">AWS Academy Cloud Foundations</a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <a href="https://drive.google.com/file/d/1aVF8xZUq12kVtEQaguz9jdZEmARIU4pO/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 underline hover:text-blue-600">AWS Machine Learning Foundations</a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <a href="https://drive.google.com/file/d/10p6e0CXGeQ5SnQXnQzbT6uUY4OMNDCez/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 underline hover:text-green-600">AWS Machine Learning for NLP</a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <a href="https://drive.google.com/file/d/1wPgQXGiCQoHCVH90HDn9ZBQydu5H9uwk/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 underline hover:text-purple-600">C++ Basic Certification</a>
                </div>
              </div>
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

export default About
