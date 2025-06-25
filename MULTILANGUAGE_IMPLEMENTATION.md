# Multi-Language Implementation Guide: English, Nepali, Spanish

## Table of Contents
1. [Overview](#overview)
2. [Directory & File Structure](#directory--file-structure)
3. [Translation File Examples](#translation-file-examples)
4. [i18n Setup & Configuration](#i18n-setup--configuration)
5. [Integrating i18n in the App](#integrating-i18n-in-the-app)
6. [Implementing a Language Switcher](#implementing-a-language-switcher)
7. [Best Practices](#best-practices)
8. [Testing & Verification](#testing--verification)

---

## 1. Overview
This guide will help you add **English (en)**, **Nepali (ne)**, and **Spanish (es)** language support to your React project using `react-i18next` and `i18next`.

---

## 2. Directory & File Structure
Organize your translation files as follows:
```
public/
  locales/
    en/
      translation.json
    ne/
      translation.json
    es/
      translation.json
src/
  i18n.js
```

---

## 3. Translation File Examples
Each language gets its own `translation.json` file. Example structure:

**public/locales/en/translation.json**
```json
{
  "nav": {
    "home": "Home",
    "about": "About",
    "projects": "Projects",
    "skills": "Skills",
    "contact": "Contact"
  },
  "hero": {
    "welcome": "Welcome to my portfolio!"
  },
  "about": {
    "title": "About Me"
  }
}
```

**public/locales/ne/translation.json**
```json
{
  "nav": {
    "home": "गृहपृष्ठ",
    "about": "मेरो बारेमा",
    "projects": "परियोजनाहरू",
    "skills": "सीपहरू",
    "contact": "सम्पर्क"
  },
  "hero": {
    "welcome": "मेरो पोर्टफोलियोमा स्वागत छ!"
  },
  "about": {
    "title": "मेरो बारेमा"
  }
}
```

**public/locales/es/translation.json**
```json
{
  "nav": {
    "home": "Inicio",
    "about": "Sobre mí",
    "projects": "Proyectos",
    "skills": "Habilidades",
    "contact": "Contacto"
  },
  "hero": {
    "welcome": "¡Bienvenido a mi portafolio!"
  },
  "about": {
    "title": "Sobre mí"
  }
}
```

---

## 4. i18n Setup & Configuration

**Install dependencies:**
```bash
npm install react-i18next i18next
# or
pnpm add react-i18next i18next
```

**Create `src/i18n.js`:**
```js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '../public/locales/en/translation.json';
import ne from '../public/locales/ne/translation.json';
import es from '../public/locales/es/translation.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ne: { translation: ne },
      es: { translation: es },
    },
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;
```

---

## 5. Integrating i18n in the App

**In `src/main.jsx`:**
```js
import './i18n'; // Import before rendering your app
```

**Using translations in components:**
```jsx
import { useTranslation } from 'react-i18next';

function Hero() {
  const { t } = useTranslation();
  return <h1>{t('hero.welcome')}</h1>;
}
```

Replace all static text with `t('key.path')` calls.

---

## 6. Implementing a Language Switcher

**Simple Language Switcher Component:**
```jsx
import i18n from '../i18n';

function LanguageSwitcher() {
  return (
    <div>
      <button onClick={() => i18n.changeLanguage('en')}>EN</button>
      <button onClick={() => i18n.changeLanguage('ne')}>ने</button>
      <button onClick={() => i18n.changeLanguage('es')}>ES</button>
    </div>
  );
}
export default LanguageSwitcher;
```
- Place this component in your navbar or header for easy access.
- Optionally, highlight the active language.

---

## 7. Best Practices
- **Organize keys** by feature/page for scalability.
- **Use descriptive keys** (e.g., `nav.home`, `hero.welcome`).
- **Fallback language:** Always set a fallback in your config.
- **Avoid hardcoding:** Use the `t` function everywhere.
- **Test all languages** after changes.
- **Support RTL:** If you add right-to-left languages in the future, update your CSS accordingly.

---

## 8. Testing & Verification
- Switch between EN, NE, and ES using the language switcher.
- Verify all text updates correctly.
- Check for missing keys (i18next will warn in the console).
- Ask native speakers to review translations for accuracy.

---

**You now have a robust, scalable multi-language setup for English, Nepali, and Spanish!** 