"use client"

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CheckSquare, Code, Database, ExternalLink, Github, Globe, Instagram, Search, Video } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useTranslation } from 'react-i18next'
gsap.registerPlugin(ScrollTrigger)

const Projects = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const projectsGridRef = useRef();

  const projects = [
    {
      id: 1,
      title: "Gym Management Website",
      description:
        "A comprehensive gym management system with secure login/registration, role-based access control, and CRUD operations for managing members, trainers, and equipment.",
      image: "/projects/gym.png",
      technologies: ["PHP", "TailwindCSS", "Bootstrap", "MySQL"],
      category: "web",
      type: "Full Stack",
      github: "https://github.com/Rajak13/GymManagementSystem",
      live: "#",
      features: ["User Authentication", "Role-based Access", "Member Management", "Payment Tracking"],
      year: "2024",
      status: "Completed",
    },
    {
      id: 2,
      title: "Book Store Management System",
      description:
        "A full-featured bookstore management web application built with Java, featuring MVC architecture, role-based dashboards, and intelligent book recommendations.",
      image: "/projects/bookstore.png",
      technologies: ["Java", "JSP", "Servlets", "MySQL", "Bootstrap"],
      category: "web",
      type: "Enterprise Web App",
      github: "https://github.com/Rajak13/AdvanceProgrammingCW",
      live: "#",
      features: ["MVC Architecture", "Order Management", "Book Recommendations", "Inventory Control"],
      year: "2024",
      status: "Completed",
    },
    {
      id: 3,
      title: "Music Player Desktop App",
      description:
        "A lightweight, customizable desktop music player built with Electron. Features include drag-and-drop functionality, theme customization, and playlist management.",
      image: "/projects/musicplayer.png",
      technologies: ["Electron", "HTML", "CSS", "JavaScript"],
      category: "desktop",
      type: "Desktop Application",
      github: "https://github.com/Rajak13/Music-Player-Desktop-Icon",
      live: "#",
      features: ["Cross-platform", "Theme Customization", "Playlist Management", "Lightweight Design"],
      year: "2023",
      status: "Completed",
    },
    {
      id: 4,
      title: "React Todo App with Authentication",
      description:
        "A modern, responsive task management system built with React and Supabase. Features real-time data synchronization, user authentication, and profile management with avatar uploads.",
      image: "/projects/todo.png",
      technologies: ["React", "Supabase", "CSS3", "JavaScript"],
      category: "web",
      type: "Full Stack SPA",
      github: "https://github.com/Rajak13/ToDo-App",
      live: "https://razzaq-todo-app.vercel.app/",
      features: ["User Authentication", "Real-time Updates", "Profile Management", "Row Level Security"],
      year: "2024",
      status: "Live",
    },
    {
      id: 5,
      title: "WebRTC Connect - Video Chat App",
      description:
        "A modern, real-time video chat application built with React, WebRTC, and Supabase for signaling. Features peer-to-peer video calls, screen sharing, and end-to-end encryption.",
      image: "/projects/webrtc.png",
      technologies: ["React", "WebRTC", "Supabase", "TailwindCSS", "Vite"],
      category: "web",
      type: "Real-time Communication",
      github: "https://github.com/Rajak13/WebRTC-Call",
      live: "#",
      features: ["P2P Video Calls", "Screen Sharing", "End-to-end Encryption", "No Account Required"],
      year: "2024",
      status: "Completed",
    },
  ]

  const filters = [
    { id: "all", label: t('projects.filters.all'), icon: Globe, count: projects.length },
    { id: "web", label: t('projects.filters.web'), icon: Code, count: projects.filter((p) => p.category === "web").length },
    {
      id: "desktop",
      label: t('projects.filters.desktop'),
      icon: Database,
      count: projects.filter((p) => p.category === "desktop").length,
    },
  ]

  const technologies = [...new Set(projects.flatMap((project) => project.technologies))]

  const filteredProjects = projects.filter((project) => {
    const matchesFilter = activeFilter === "all" || project.category === activeFilter
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.technologies.some((tech) => tech.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesFilter && matchesSearch
  })

  const getProjectIcon = (type) => {
    switch (type) {
      case "Full Stack":
        return <Globe className="w-5 h-5" />
      case "Desktop Application":
        return <Database className="w-5 h-5" />
      case "Real-time Communication":
        return <Video className="w-5 h-5" />
      case "Full Stack SPA":
        return <CheckSquare className="w-5 h-5" />
      case "Enterprise Web App":
        return <Code className="w-5 h-5" />
      default:
        return <Code className="w-5 h-5" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Live":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      case "Completed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
      case "In Progress":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
    }
  }

  useEffect(() => {
    gsap.utils.toArray('.project-card').forEach((card, i) => {
      gsap.fromTo(
        card,
        {y:40, opacity:0, scale: 0.9},
        {
          y:0,
          opacity:1,
          duration: 0.8,
          delay: i* 0.15,
          scale: 1,
          ease:"power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    });
    gsap.utils.toArray('.project-image-parallax').forEach((img) => {
      gsap.fromTo(
        img,
        { y: 0 },
        {
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: img,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );
    });
  }, []);

  return (
    <section
      id="projects"
      className="min-h-screen py-20 relative overflow-hidden"
    >
      {/* Background: gradient for light, image for dark */}
      <div className="absolute inset-0 w-full h-full">
        {/* Light mode: vibrant gradient */}
        <div className="block dark:hidden absolute inset-0 bg-gradient-to-br from-[#e0e7ff] via-[#ffe0e7] to-[#b6ffe0]" />
        {/* Dark mode: background image (user will set their own) */}
        <img
          src="/gradient_1.jpg"
          alt="Projects background"
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
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {t('projects.title')}
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {t('projects.subtitle')}
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="mb-12 space-y-6">
          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={t('projects.search_placeholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border border-white/20 dark:border-gray-700/20 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex justify-center">
            <div className="flex bg-white/50 dark:bg-gray-900/50 backdrop-blur-md rounded-2xl p-2 border border-white/20 gap-2">
              {filters.map((filter) => {
                const IconComponent = filter.icon
                return (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      activeFilter === filter.id
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transform scale-105"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-white/30 dark:hover:bg-gray-800/30"
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className="hidden sm:inline">{filter.label}</span>
                    <span className="bg-white/20 dark:bg-gray-700/50 px-2 py-1 rounded-full text-xs">
                      {filter.count}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Technology Tags */}
          <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-white/50 dark:bg-gray-900/50 backdrop-blur-md border border-white/20 dark:border-gray-700/20 rounded-full text-sm text-gray-700 dark:text-gray-300 hover:bg-white/70 dark:hover:bg-gray-800/70 transition-all duration-300 cursor-pointer"
                onClick={() => setSearchTerm(tech)}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div ref={projectsGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="project-card group bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl border border-white/20 dark:border-gray-700/20 overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image-parallax w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>

                {/* Project Type Icon */}
                <div className="absolute top-4 left-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                  {getProjectIcon(project.type)}
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{project.year}</span>
                </div>

                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Key Features:</h4>
                  <ul className="space-y-1">
                    {project.features.map((feature, index) => (
                      <li key={index} className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-2">
                        <CheckSquare className="w-3 h-3 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 dark:bg-gray-700 text-white rounded-xl hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-300"
                  >
                    <Github className="w-4 h-4" />
                    <span className="text-sm">GitHub</span>
                  </a>
                  {project.live !== "#" && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-300"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span className="text-sm">Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">No projects found</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
          </div>
        )}

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

export default Projects
