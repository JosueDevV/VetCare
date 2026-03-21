import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout'
import { Home } from './pages/Home.jsx'
import Services from './pages/Services';
import About from './pages/About';
import Login from './pages/Login';
import AdminPanel from './pages/AdminPanel';
import RecepcionPanel from './pages/RecepcionPanel';
import VeterinarioPanel from './pages/VeterinarioPanel';
import { Toaster } from 'sonner';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/servicios" element={<Services />} />
            <Route path="/nosotros" element={<About />} />
            <Route path="/login" element={<Login />} />

            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/recepcion" element={<RecepcionPanel />} />
            <Route path="/veterinario" element={<VeterinarioPanel />} />

          </Routes>
        </Layout>
      </BrowserRouter>

      <Toaster position="top-right" richColors />
    </div>
  );
}

export default App;
