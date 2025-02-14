import { Routes, Route } from "react-router-dom"

import IndexPage from "./pages/IndexPage"
import WeatherInfoPage from "./pages/WeatherInfoPage"

export default function App() {
  return (
    <Routes>
      <Route index element={<IndexPage/>} />
      <Route path='/:location' element={<WeatherInfoPage/>} />
    </Routes>
  )
}
