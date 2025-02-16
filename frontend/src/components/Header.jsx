import { FaCloudSun } from "react-icons/fa";
import { FaCloudMoon } from "react-icons/fa";
import { FaCloudShowersHeavy } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa6";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')
  const navigate = useNavigate()

  const toggle_theme = _ => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  useEffect(_ => {
    document.documentElement.setAttribute('data-theme', theme)
      localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <div className="w-full py-4 md:px-4 flex justify-between md:absolute md:top-0 md:left-0">
      <div onClick={_ => navigate('/')} id="logo" className="flex gap-1 cursor-pointer">
        <FaCloudSun className={`lighty duration-300 ease-in-out text-[var(--color-logo-light)] 
                                        ${theme != 'light' && 'absolute opacity-0 -translate-y-10'}`} style={{fontSize: 'var(--text-heading-primary)'}}/>
        <FaCloudMoon className={`lighty duration-300 ease-in-out text-[var(--color-logo-light)]
                                          ${theme != 'dark' && 'absolute opacity-0'}`} style={{fontSize: 'var(--text-heading-primary)'}}/>
        <div className="flex relative">
          <p className="lighty text-[var(--color-logo-light)] font-bold" style={{fontSize: 'var(--text-heading-primary)'}}>Weather</p>
          <p className="darky text-[var(--color-logo-dark)] font-bold" style={{fontSize: 'var(--text-heading-primary)'}}>API</p>
          <FaCloudShowersHeavy className="darky text-[var(--color-logo-dark)] absolute right-0 -bottom-5" style={{fontSize: 'var(--text-heading-secondary)'}}/>
        </div>
      </div>

      <div className="relative w-12 md:w-32 h-12 md:border md:border-[#6B6B6B] rounded-2xl flex items-center justify-center md:justify-between p-4">
        <FaMoon onClick={toggle_theme}
          className={`transition-transform duration-300 ease-in-out absolute md:static darky text-[var(--color-logo-dark)] hover:text-[var(--color-logo-dark-hover)] text-[1.7rem] cursor-pointer
                      ${theme != 'dark' && 'translate-x-12 opacity-0'}`}
        />
        <FaSun onClick={toggle_theme}
          className={`transition-transform duration-300 ease-in-out absolute md:static text-[var(--color-logo-light)] hover:text-[var(--color-logo-light-hover)] text-[1.7rem] cursor-pointer
                      ${theme != 'light' && '-translate-x-12 opacity-0'}`}
        />
      </div>
    </div>
  )
}
