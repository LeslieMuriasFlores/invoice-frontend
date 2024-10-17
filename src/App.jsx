// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import EnergyPriceForm from './components/EnergyPriceForm';
import PowerPriceForm from './components/PowerPriceForm';
import InvoiceCalculator from './components/InvoiceCalculator';
import InvoiceList from './components/InvoiceList';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <header>
          <h2 className="scrolling-text">Gestión de Facturas Eléctricas</h2>
          <nav className="nav">
            <div className="nav-item">
              <Link to="/" className="nav-link">Precio de Energía</Link>
            </div>
            <div className="nav-item">
              <Link to="/power-prices" className="nav-link">Precios de Potencia</Link>
            </div>
            <div className="nav-item">
              <Link to="/calculate-bill" className="nav-link">Calcular Factura</Link>
            </div>
            <div className="nav-item">
              <Link to="/invoice-list" className="nav-link">Lista de Facturas</Link>
            </div>
          </nav>
        </header>

        <main className="container mt-4">
          <Routes>
            <Route path="/" element={<EnergyPriceForm />} />
            <Route path="/power-prices" element={<PowerPriceForm />} />
            <Route path="/calculate-bill" element={<InvoiceCalculator />} />
            <Route path="/invoice-list" element={<InvoiceList />} />
          </Routes>
        </main>

        <footer className="bg-light text-center p-3 mt-4">
          <p className="mb-0">
            © {new Date().getFullYear()} Leslie Murias Flores. Todos los derechos reservados.
          </p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
