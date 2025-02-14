import { FaCloudSun } from "react-icons/fa";
import { FaCloudShowersHeavy } from "react-icons/fa";

import { useState, useEffect } from "react";

export default function Header() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark')

  useEffect(_ => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <div className="py-4 flex gap-1 md:absolute md:top-0 md:left-4">
      <FaCloudSun className="text-[var(--color-logo-light)]" style={{fontSize: 'var(--text-heading-primary)'}}/>
      <div className="flex relative">
        <p className="text-[var(--color-logo-light)] font-bold" style={{fontSize: 'var(--text-heading-primary)'}}>Weather</p>
        <p className="text-[var(--color-logo-dark)] font-bold" style={{fontSize: 'var(--text-heading-primary)'}}>API</p>
        <FaCloudShowersHeavy className="text-[var(--color-logo-dark)] absolute right-0 -bottom-5" style={{fontSize: 'var(--text-heading-secondary)'}}/>
      </div>
    </div>
  )
}
