import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

function LanguageSwitcher() {
  const { i18n: i18nextInstance } = useTranslation();
  const currentLang = i18nextInstance.language;
  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'ne', label: 'ने' },
    { code: 'es', label: 'ES' },
  ];
  const handleChange = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('i18nextLng', lang);
  };
  return (
    <div className="flex gap-2">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleChange(lang.code)}
          className={`px-3 py-1 rounded font-semibold border transition-colors duration-200 ${currentLang === lang.code ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-blue-600 border-blue-200 hover:bg-blue-50'}`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}

export default LanguageSwitcher; 