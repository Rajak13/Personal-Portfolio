"use client"

import { CheckCircle, Github, Instagram, Mail, MapPin, MessageSquare, Phone, Send } from "lucide-react"
import { useState } from "react"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    projectType: "",
    budget: "",
    timeline: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Build mailto link
    const mailto = `mailto:rajakansari833@gmail.com?subject=${encodeURIComponent(formData.subject || 'Project Inquiry')}` +
      `&body=${encodeURIComponent(
        `Name: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        (formData.projectType ? `Project Type: ${formData.projectType}\n` : '') +
        (formData.budget ? `Budget: ${formData.budget}\n` : '') +
        (formData.timeline ? `Timeline: ${formData.timeline}\n` : '') +
        `\nMessage:\n${formData.message}`
      )}`
    window.open(mailto, '_blank')
  }

  const projectTypes = [
    "Web Application",
    "Mobile App",
    "Desktop Application",
    "E-commerce Site",
    "Portfolio Website",
    "Custom Software",
    "Other",
  ]

  const budgetRanges = [
    "Under $1,000",
    "$1,000 - $5,000",
    "$5,000 - $10,000",
    "$10,000 - $25,000",
    "$25,000+",
    "Let's discuss",
  ]

  const timelineOptions = ["ASAP", "1-2 weeks", "1 month", "2-3 months", "3-6 months", "6+ months", "Flexible"]

  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-slate-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Let's Work Together
            </span>
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Ready to bring your ideas to life? Let's discuss your next project and create something amazing together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Info - Left Side */}
          <div className="lg:col-span-2 space-y-8">
            <div className="group">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <MessageSquare className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                Get In Touch
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                I'm always excited to work on new projects and collaborate with amazing people. Whether you have a
                project in mind or just want to chat about technology, feel free to reach out!
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-4">
              <div className="group flex items-center gap-4 p-6 bg-white/80 dark:bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-white/20 hover:border-gray-300 dark:hover:border-white/40 transition-all duration-300 hover:scale-105 shadow-lg">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Email</p>
                  <p className="text-gray-900 dark:text-white font-semibold text-lg">rajakansari833@gmail.com</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Response within 24 hours</p>
                </div>
              </div>

              <div className="group flex items-center gap-4 p-6 bg-white/80 dark:bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-white/20 hover:border-gray-300 dark:hover:border-white/40 transition-all duration-300 hover:scale-105 shadow-lg">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Phone</p>
                  <p className="text-gray-900 dark:text-white font-semibold text-lg">+977 9827310498</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Available 9 AM - 6 PM NPT</p>
                </div>
              </div>

              <div className="group flex items-center gap-4 p-6 bg-white/80 dark:bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-white/20 hover:border-gray-300 dark:hover:border-white/40 transition-all duration-300 hover:scale-105 shadow-lg">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Location</p>
                  <p className="text-gray-900 dark:text-white font-semibold text-lg">Dharan-1, Sunsari</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Nepal (UTC+5:45)</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-6">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Connect With Me</h4>
              <div className="flex gap-4">
                <a
                  href="https://github.com/Rajak13"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 bg-white/80 dark:bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-white/20 hover:border-gray-300 dark:hover:border-white/40 transition-all duration-300 hover:scale-110 shadow-lg"
                >
                  <Github className="w-6 h-6 text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
                </a>
                <a
                  href="https://www.instagram.com/rajak01013/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 bg-white/80 dark:bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-white/20 hover:border-gray-300 dark:hover:border-white/40 transition-all duration-300 hover:scale-110 shadow-lg"
                >
                  <Instagram className="w-6 h-6 text-gray-600 dark:text-gray-300 group-hover:text-pink-500 transition-colors" />
                </a>
              </div>
            </div>

            {/* Availability Status */}
            <div className="p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl border border-green-100 dark:border-green-800 shadow-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-700 dark:text-green-400 font-semibold">Available for new projects</span>
              </div>
              <p className="text-sm text-green-600 dark:text-green-300">
                Currently accepting new client work and collaborations
              </p>
            </div>
          </div>

          {/* Contact Form - Right Side */}
          <div className="lg:col-span-3">
            <div className="bg-white/90 dark:bg-gray-900/70 backdrop-blur-md rounded-3xl border border-gray-200 dark:border-white/20 p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Send className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Start a Project</h3>
              </div>

              {/* Success Message */}
              {submitStatus === "success" && (
                <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <span className="text-green-700 dark:text-green-300 font-medium">
                    Message sent successfully! I'll get back to you soon.
                  </span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/50 dark:bg-gray-800/80 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white/70"
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-gray-900 dark:text-white mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/50 dark:bg-gray-800/80 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white/70"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <label
                      htmlFor="projectType"
                      className="block text-sm font-semibold text-gray-900 dark:text-white mb-2"
                    >
                      Project Type
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/50 dark:bg-gray-800/80 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white"
                    >
                      <option value="">Select type</option>
                      {projectTypes.map((type) => (
                        <option key={type} value={type} className="text-gray-900 dark:text-white">
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="budget"
                      className="block text-sm font-semibold text-gray-900 dark:text-white mb-2"
                    >
                      Budget Range
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/50 dark:bg-gray-800/80 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white"
                    >
                      <option value="">Select budget</option>
                      {budgetRanges.map((range) => (
                        <option key={range} value={range} className="text-gray-900 dark:text-white">
                          {range}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="timeline"
                      className="block text-sm font-semibold text-gray-900 dark:text-white mb-2"
                    >
                      Timeline
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/50 dark:bg-gray-800/80 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white"
                    >
                      <option value="">Select timeline</option>
                      {timelineOptions.map((option) => (
                        <option key={option} value={option} className="text-gray-900 dark:text-white">
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-semibold text-gray-900 dark:text-white mb-2"
                  >
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/50 dark:bg-gray-800/80 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white/70"
                    placeholder="Brief project description"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-gray-900 dark:text-white mb-2"
                  >
                    Project Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 bg-white/50 dark:bg-gray-800/80 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white/70 resize-none"
                    placeholder="Tell me about your project requirements, goals, and any specific features you need..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="group w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
                >
                  <span className="flex items-center justify-center gap-2">
                    Send Message
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </form>
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

export default Contact
