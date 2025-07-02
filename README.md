# Abdul Razzaq Ansari – Developer Portfolio & Dynamic Blog

> **Live Site:** [https://rajak.vercel.app/](https://rajak.vercel.app/)

---

## 🚀 About This Project

A modern, fully responsive developer portfolio and dynamic blog built with **React**, **Tailwind CSS**, **Supabase**, and **Vite**. Showcasing my skills, projects, certifications, and a feature-rich blog with multimedia, likes, search, and internationalization. Optimized for all devices, featuring smooth animations, project filtering, and easy ways for visitors to get in touch or download my CV.

---

## ✨ Features

- Beautiful hero section with background image and profile photo
- Responsive navigation bar with mobile bottom sheet
- About section with glassmorphism cards, education, and certifications
- Projects section with filtering and image previews
- Skills and tools grid
- **Dynamic Blog** with:
  - Supabase backend (CRUD, images, video, tags, types)
  - Pagination, filtering, and modern sort
  - Full-text search (title/content)
  - Tag and type organization
  - Like/reaction system (anonymous, device-based)
  - Related articles (by tags/type)
  - Estimated reading time
  - GSAP-powered animations
  - Responsive, glassy, modern UI
  - **Internationalization (i18n):** English, Nepali, Spanish
- Contact form (mailto integration) and social links
- Dynamic, accessible footer
- Light & dark theme support
- Smooth animations and transitions

---

## 🛠️ Tech Stack

- **React** (with functional components & hooks)
- **Tailwind CSS** (utility-first styling)
- **Supabase** (Postgres, Storage, Auth)
- **Vite** (blazing fast dev/build)
- **React Query** (data fetching/caching)
- **GSAP** (animations)
- **Lucide Icons** (modern SVG icons)
- **react-i18next** (multi-language support)

---

## 📦 Getting Started

1. **Clone the repo:**
   ```bash
   git clone https://github.com/Rajak13/react-portfolio.git
   cd react-portfolio
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   pnpm install
   ```
3. **Set up environment variables:**
   - Create a `.env` file in the root with:
     ```env
     VITE_SUPABASE_URL=your-supabase-url
     VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
     ```
   - Get these from your Supabase project dashboard.
4. **Run locally:**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```
5. **Open:** [http://localhost:5173](http://localhost:5173)

---

## 🌐 Connecting to Supabase

1. **Create a Supabase Project:**
   - Go to [https://supabase.com/](https://supabase.com/) and sign up/log in.
   - Click **New Project** and fill in the details (name, password, region).
   - Wait for your project to initialize.
2. **Get Your API Keys:**
   - In your Supabase dashboard, go to **Project Settings > API**.
   - Copy your **Project URL** and **anon public key**.
3. **Configure Your .env File:**
   - In the root of your project, create a `.env` file (if you haven't already).
   - Add the following lines, replacing with your actual values:
     ```env
     VITE_SUPABASE_URL=https://your-project.supabase.co
     VITE_SUPABASE_ANON_KEY=your-anon-key
     ```
4. **(Optional) Set Up Database Schema:**
   - Use the provided SQL files in `blog-sql/` to create and seed your blog tables.
   - You can run these in the Supabase SQL editor.
5. **(Optional) Set Up Storage Buckets:**
   - In Supabase, go to **Storage > Create Bucket** (e.g., `blog-images`).
   - Set public access for easy blog image loading.

---

## 🚀 Deployment

- **Vercel** is used for auto-deployment.
- **.env** variables must be set in the Vercel dashboard for Supabase integration.
- On every commit to `main`, Vercel will auto-deploy the latest version.
- Make sure to add your Supabase credentials in Vercel's environment settings for production.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgements

- [Lucide Icons](https://lucide.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.com/)
- [Vercel](https://vercel.com/) for deployment
- [GSAP](https://greensock.com/gsap/)
- [react-i18next](https://react.i18next.com/)

---

> Designed & developed by Abdul Razzaq Ansari