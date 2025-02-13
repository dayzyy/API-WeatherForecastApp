import { useEffect } from "react"

export default function App() {
  useEffect(_ => {
    document.documentElement.setAttribute('data-theme', 'light')
  }, [])

  return (<>
    <div className="p-4 bg-blue-50">
      <p style={{fontSize: "var(--text-heading-primary)"}}>Heading 1</p>
      <p style={{fontSize: "var(--text-heading-secondary)"}}>Heading 2</p>
      <p style={{fontSize: "var(--text-body-primary)"}}>Body 1</p>
      <p style={{fontSize: "var(--text-body-secondary)"}}>Body 1</p>
    </div>

    <div className="p-4 bg-black">
      <p className="text-[var(--color-text-primary)]">#fff</p>
      <p className="text-[var(--color-text-secondary)]">#e0e0e0</p>
    </div>

    <div className="p-4 bg-blue-50 flex gap-4">
      <div className="test-box" style={{background: "var(--color-bg-primary)"}}></div>
      <div className="test-box" style={{background: "var(--color-bg-secondary)"}}></div>
    </div>
  </>)
}
