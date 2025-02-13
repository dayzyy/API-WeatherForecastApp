import { Routes, Route } from "react-router-dom"

import IndexPage from "./pages/IndexPage"

export default function App() {
  return (
    <Routes>
      <Route index element={<IndexPage/>} />
    </Routes>
  )
}
