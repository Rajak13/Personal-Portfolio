# Abdul Razzaq Ansari — Developer Portfolio

[Live Portfolio → ara-portfolio.vercel.app](https://ara-portfolio.vercel.app)

---

## 🚀 Overview
This is a modern, fully responsive developer portfolio built with React, Tailwind CSS, and Vite. It showcases my skills, projects, certifications, and contact information in a visually engaging, dark-themed design. The site is optimized for all devices and features smooth animations, project filtering, and easy ways for visitors to get in touch or download your CV.

---

## ✨ Features
- **Hero Section:** Eye-catching intro with animated text, profile photo, and background image (dark mode only).
- **About Section:** Bio, education, certifications (with downloadable links), and social/contact icons.
- **Skills Section:** Visual display of technical and soft skills with progress bars.
- **Projects Section:** Filterable, searchable project gallery with images, tech tags, and direct GitHub links.
- **Contact Section:** Professional contact form (opens mail client with pre-filled message), social links, and availability status.
- **Responsive Design:** Looks great on mobile, tablet, and desktop.
- **Dark/Light Mode:** Background image appears only in dark mode for best contrast.
- **Easy Customization:** Add new projects, certifications, or update info with simple edits.

---

## 🛠️ Tech Stack
- **React** (with functional components and hooks)
- **Vite** (for fast development and builds)
- **Tailwind CSS** (utility-first styling)
- **Lucide React** (for icons)

---

## 🌐 Live Demo
[ara-portfolio.vercel.app](https://ara-portfolio.vercel.app)

---

## 📁 Folder Structure
```
react-portfolio/
├── app/                # Next.js app directory (if using Next.js)
├── components/         # Reusable UI components (theme, UI, etc.)
├── src/
│   ├── components/     # Main page sections (About, Contact, Hero, Projects, Skills)
│   ├── App.jsx         # Main app entry (for Vite/React)
│   ├── App.css         # Main CSS (Tailwind + custom)
│   └── main.jsx        # React entry point
├── public/
│   ├── projects/       # Project images (gym.png, bookstore.png, etc.)
│   └── ...             # Profile photo, background images, etc.
├── tailwind.config.cjs # Tailwind config
├── postcss.config.cjs  # PostCSS config
├── package.json        # Project dependencies
└── README.md           # This file
```

---

## 🖼️ Adding/Editing Projects
1. **Images:** Place your project images in `public/projects/` (e.g., `gym.png`, `bookstore.png`).
2. **Project Data:** Edit `src/components/Projects.jsx`:
   - Update the `projects` array with your project details, image path, GitHub link, and description.
3. **Links:** Each project card links to its GitHub repo. You can also add a live demo link if available.

---

## 📜 Adding/Editing Certifications
1. **Edit `src/components/About.jsx`**
2. Each certification is a clickable link to a PDF or image (e.g., Google Drive link).

---

## ✏️ Customization
- **Profile Photo:** Replace `/public/profile.jpg` with your own image.
- **Hero Background:** Replace `/public/hero-bg.jpg` (or your chosen filename) for the dark mode background.
- **Social Links:** Update GitHub and Instagram URLs in `Hero.jsx`, `About.jsx`, and `Contact.jsx`.
- **Contact Email:** Change the email in the contact form and mailto links as needed.

---

## 🛠️ Local Setup & Development
1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/ara-portfolio.git
   cd ara-portfolio
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```
4. **Open in your browser:**
   Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

---

## 📝 Deployment
- **Vercel:** This project is ready to deploy on [Vercel](https://vercel.com/). Just connect your repo and set the output directory to `dist` (for Vite).
- **Other hosts:** You can also deploy to Netlify, GitHub Pages, or any static host that supports React/Vite.

---

## 📬 Contact & Social
- **Email:** [rajakansari833@gmail.com](mailto:rajakansari833@gmail.com)
- **GitHub:** [Rajak13](https://github.com/Rajak13)
- **Instagram:** [rajak01013](https://www.instagram.com/rajak01013/)

---

## 📄 License
This project is open source and available under the [MIT License](LICENSE).

---

> _Designed and developed by Abdul Razzaq Ansari_ 