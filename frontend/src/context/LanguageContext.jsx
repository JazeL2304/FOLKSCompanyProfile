import { createContext, useContext, useState, useEffect } from 'react'
import id from '../locales/id.json'
import en from '../locales/en.json'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(localStorage.getItem('folks_lang') || 'id')
  
  const t = lang === 'id' ? id : en
  
  const toggleLang = () => setLang(prev => {
    const next = prev === 'id' ? 'en' : 'id'
    localStorage.setItem('folks_lang', next)
    return next
  })
  
  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
