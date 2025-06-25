import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from '../public/locales/en/translation.json'
import es from '../public/locales/es/translation.json'
import ne from '../public/locales/ne/translation.json'

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en},
            ne: { translation: ne},
            es: { translation: es}
        },
        lng: 'en',
        fallbackLng: 'en',
        interpolation: { escapeValue: false }
    })

export default i18n;