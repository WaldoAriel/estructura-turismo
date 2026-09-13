import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Home from './pages/Home'
import DondeComer from './pages/DondeComer'
import Eventos from './pages/Eventos'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/eventos" element={<Eventos />} />
          <Route path="/eventos/:estacion" element={<Eventos />} />
          <Route path="/comer" element={<DondeComer />} />
          <Route path="/comer/:categoria" element={<DondeComer />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
