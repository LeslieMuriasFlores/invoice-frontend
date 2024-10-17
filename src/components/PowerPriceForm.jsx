// src/components/PowerPriceForm.jsx
import React, { useState } from 'react';
import axios from '../axios';
import '../App.css';
import { ToastContainer, toast } from 'react-toastify'; // Importar ToastContainer y toast
import 'react-toastify/dist/ReactToastify.css'; // Importar estilos

const PowerPriceForm = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [p1, setP1] = useState('');
  const [p2, setP2] = useState('');
  const [p3, setP3] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/prices/power', {
        power: { p1: parseFloat(p1), p2: parseFloat(p2), p3: parseFloat(p3) }, // Convertir a número
        start_date: startDate,
        end_date: endDate,
        username,
      });
      
      toast.success('Precios de potencia guardados con éxito'); // Mensaje de éxito

      // Resetear todos los campos después de guardar
      setStartDate('');
      setEndDate('');
      setP1('');
      setP2('');
      setP3('');
      setUsername('');

    } catch (error) {
      console.error('Error al guardar los precios de potencia:', error);
      toast.error('Error al guardar los precios de potencia'); // Mensaje de error
    }
  };

  return (
    <div className="mt-4">
      <form onSubmit={handleSubmit} className="border p-4 rounded bg-light shadow">
        <h2 className="mb-3 text-center" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Introducir Precios de Potencia</h2>

        <div className="mb-3 form-group d-flex align-items-center">
          <label htmlFor="startDate" className="form-label me-3" style={{ width: '150px' }}>Fecha de Inicio:</label>
          <input
            type="date"
            id="startDate"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>

        <div className="mb-3 form-group d-flex align-items-center">
          <label htmlFor="endDate" className="form-label me-3" style={{ width: '150px' }}>Fecha de Fin:</label>
          <input
            type="date"
            id="endDate"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>

        <div className="mb-3 form-group d-flex align-items-center">
          <label htmlFor="p1" className="form-label me-3" style={{ width: '150px' }}>Precio P1:</label>
          <input
            type="number"
            id="p1"
            className="form-control"
            value={p1}
            onChange={(e) => setP1(e.target.value)}
            placeholder="Precio P1"
            required
          />
        </div>

        <div className="mb-3 form-group d-flex align-items-center">
          <label htmlFor="p2" className="form-label me-3" style={{ width: '150px' }}>Precio P2:</label>
          <input
            type="number"
            id="p2"
            className="form-control"
            value={p2}
            onChange={(e) => setP2(e.target.value)}
            placeholder="Precio P2"
            required
          />
        </div>

        <div className="mb-3 form-group d-flex align-items-center">
          <label htmlFor="p3" className="form-label me-3" style={{ width: '150px' }}>Precio P3:</label>
          <input
            type="number"
            id="p3"
            className="form-control"
            value={p3}
            onChange={(e) => setP3(e.target.value)}
            placeholder="Precio P3"
            required
          />
        </div>

        <div className="mb-3 form-group d-flex align-items-center">
          <label htmlFor="username" className="form-label me-3" style={{ width: '150px' }}>Email:</label>
          <input
            type="email"
            id="username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Email"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Guardar</button>
      </form>

      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover /> {/* Agregar ToastContainer */}
    </div>
  );
};

export default PowerPriceForm;
