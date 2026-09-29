import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Home from './pages/Home'
import Eventos from './pages/Eventos'
import Hacer from './pages/Hacer'
import HacerDetalle from './pages/HacerDetalle'
import Visitar from './pages/Visitar'
import VisitarDetalle from './pages/VisitarDetalle'
import Informacion from './pages/Informacion'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="main-content">
         <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/eventos" element={<Eventos />} />
           <Route path="/eventos/:estacion" element={<Eventos />} />
           <Route path="/hacer" element={<Hacer />} />
           <Route path="/hacer/:category" element={<HacerDetalle />} />
           <Route path="/visitar" element={<Visitar />} />
           <Route path="/visitar/:category" element={<VisitarDetalle />} />
           <Route path="/visitar/:category/:subcategory" element={<VisitarDetalle />} />
           <Route path="/visitar/:category/:subcategory/:item" element={<VisitarDetalle />} />
           <Route path="/informacion" element={<Informacion />} />
           <Route path="/informacion/:page" element={<Informacion />} />
         </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
