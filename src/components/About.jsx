import { Award, Calendar, Github, Instagram, Mail, MapPin, Phone } from "lucide-react"

const About = () => {
  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-br from-slate-100 to-blue-100 dark:from-gray-800 dark:to-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">About Me</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Passionate about creating innovative solutions and building the future of web development
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
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Hi, I'm Abdul Razzaq Ansari</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    My journey as a software engineer has been a fascinating one, filled with challenges and
                    opportunities to grow. I am a self-motivated and technical professional wishing to grow as a web
                    developer in an energetic organization. Currently pursuing BSc Computing at Itahari International
                    College.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info Card */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
            <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Get In Touch</h3>
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
                    <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                    <p className="text-gray-800 dark:text-white font-medium">+977 9827310498</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
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
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Education</h3>
              </div>
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-gray-800 dark:text-white">BSc. (Hons) Computing</h4>
                  <p className="text-blue-600 dark:text-blue-400 font-medium">2023 - Current</p>
                  <p className="text-gray-600 dark:text-gray-300">Itahari International College</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">London Metropolitan University</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-gray-800 dark:text-white">S.L.C. (Science Stream)</h4>
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
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Certifications</h3>
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
      </div>
    </section>
  )
}

export default About
