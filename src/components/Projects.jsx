"use client"

import { CheckSquare, Code, Database, ExternalLink, Github, Globe, Search, Video } from "lucide-react"
import { useState } from "react"

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

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
    { id: "all", label: "All Projects", icon: Globe, count: projects.length },
    { id: "web", label: "Web Apps", icon: Code, count: projects.filter((p) => p.category === "web").length },
    {
      id: "desktop",
      label: "Desktop Apps",
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

  return (
    <section
      id="projects"
      className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            A showcase of my recent work and technical achievements across different platforms
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
                placeholder="Search projects, technologies..."
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
            {technologies.slice(0, 8).map((tech) => (
              <button
                key={tech}
                onClick={() => setSearchTerm(tech)}
                className="px-3 py-1 bg-white/30 dark:bg-gray-800/30 backdrop-blur-md border border-white/20 dark:border-gray-700/20 rounded-full text-sm text-gray-600 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300"
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="group relative bg-white/70 dark:bg-gray-900/70 backdrop-blur-md rounded-3xl border border-white/20 overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 transform hover:scale-105"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Status Badge */}
                <div
                  className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}
                >
                  {project.status}
                </div>

                {/* Overlay Buttons */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/20 backdrop-blur-md rounded-lg hover:bg-white/30 transition-colors"
                  >
                    <Github className="w-5 h-5 text-white" />
                  </a>
                  {project.live !== "#" && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white/20 backdrop-blur-md rounded-lg hover:bg-white/30 transition-colors"
                    >
                      <ExternalLink className="w-5 h-5 text-white" />
                    </a>
                  )}
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1 bg-blue-100 dark:bg-blue-900/30 rounded-lg">{getProjectIcon(project.type)}</div>
                  <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">{project.type}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">• {project.year}</span>
                </div>

                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{project.description}</p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Features */}
                <div className="space-y-1">
                  {project.features.slice(0, 3).map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">No projects found</h3>
            <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSearchTerm("")
                setActiveFilter("all")
              }}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* View More Button */}
        <div className="text-center mt-12">
          <a
            href="https://github.com/Rajak13"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-semibold hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
          >
            View More on GitHub
            <ExternalLink className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  )
}

export default Projects
