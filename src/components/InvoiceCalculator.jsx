// src/components/InvoiceCalculator.jsx
import React, { useState, useEffect } from 'react';
import axios from '../axios';
import '../App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const InvoiceCalculator = () => {
  const [consumption, setConsumption] = useState({ p1: '', p2: '', p3: '' });
  const [contractedPower, setContractedPower] = useState({ p1: '', p2: '', p3: '' });
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [username, setUsername] = useState('');
  const [invoiceResult, setInvoiceResult] = useState(null);
  const [userEmails, setUserEmails] = useState([]);

  useEffect(() => {
    // Función para obtener emails de usuarios
    const fetchEmails = async () => {
      try {
        const response = await axios.get('/users/emails');
        setUserEmails(response.data);
      } catch (error) {
        console.error('Error al obtener los correos electrónicos:', error);
        toast.error('Error al cargar los correos electrónicos');
      }
    };

    fetchEmails(); 
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar que todos los campos requeridos estén llenos
    if (!contractedPower.p1 || !contractedPower.p2 || !contractedPower.p3) {
      toast.error("Todos los campos de potencia son obligatorios.");
      return;
    }

    if (!consumption.p1 || !consumption.p2 || !consumption.p3) {
      toast.error("Todos los campos de consumo son obligatorios.");
      return;
    }

    if (!startDate || !endDate || !username) {
      toast.error("Por favor, complete todos los campos.");
      return;
    }

    try {
      const response = await axios.post('/generatebill', {
        consumption,
        contractedpower: contractedPower,
        start_date: startDate,
        end_date: endDate,
        username,
      });

      // Asignar el resultado de la factura
      setInvoiceResult(response.data);
      toast.success('Factura generada con éxito');

      // Resetear todos los campos después de calcular
      resetFields();

    } catch (error) {
      console.error('Error al generar la factura:', error);
      toast.error('Error al generar la factura');
    }
  };

  const resetFields = () => {
    setConsumption({ p1: '', p2: '', p3: '' });
    setContractedPower({ p1: '', p2: '', p3: '' });
    setStartDate('');
    setEndDate('');
    setUsername('');
  };

  const clearResults = () => {
    setInvoiceResult(null); 
  };

  return (
    <div className="mt-4">
      <form onSubmit={handleSubmit} className="border p-4 rounded bg-light shadow">
        <h2 className="mb-3 text-center" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Calcular Factura</h2>

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

        <h3>Consumos (P1-P3)</h3>
        <div className="mb-3 form-group d-flex align-items-center">
          <label htmlFor="consumptionP1" className="form-label me-3" style={{ width: '150px' }}>Consumo P1:</label>
          <input
            type="number"
            id="consumptionP1"
            className="form-control"
            value={consumption.p1}
            onChange={(e) => setConsumption({ ...consumption, p1: e.target.value })}
            placeholder="Consumo P1"
            required
          />
        </div>

        <div className="mb-3 form-group d-flex align-items-center">
          <label htmlFor="consumptionP2" className="form-label me-3" style={{ width: '150px' }}>Consumo P2:</label>
          <input
            type="number"
            id="consumptionP2"
            className="form-control"
            value={consumption.p2}
            onChange={(e) => setConsumption({ ...consumption, p2: e.target.value })}
            placeholder="Consumo P2"
            required
          />
        </div>

        <div className="mb-3 form-group d-flex align-items-center">
          <label htmlFor="consumptionP3" className="form-label me-3" style={{ width: '150px' }}>Consumo P3:</label>
          <input
            type="number"
            id="consumptionP3"
            className="form-control"
            value={consumption.p3}
            onChange={(e) => setConsumption({ ...consumption, p3: e.target.value })}
            placeholder="Consumo P3"
            required
          />
        </div>

        <h3>Potencias (P1-P3)</h3>
        <div className="mb-3 form-group d-flex align-items-center">
          <label htmlFor="contractedPowerP1" className="form-label me-3" style={{ width: '150px' }}>Potencia P1:</label>
          <input
            type="number"
            id="contractedPowerP1"
            className="form-control"
            value={contractedPower.p1}
            onChange={(e) => setContractedPower({ ...contractedPower, p1: e.target.value })}
            placeholder="Potencia P1"
            required
          />
        </div>

        <div className="mb-3 form-group d-flex align-items-center">
          <label htmlFor="contractedPowerP2" className="form-label me-3" style={{ width: '150px' }}>Potencia P2:</label>
          <input
            type="number"
            id="contractedPowerP2"
            className="form-control"
            value={contractedPower.p2}
            onChange={(e) => setContractedPower({ ...contractedPower, p2: e.target.value })}
            placeholder="Potencia P2"
            required
          />
        </div>

        <div className="mb-3 form-group d-flex align-items-center">
          <label htmlFor="contractedPowerP3" className="form-label me-3" style={{ width: '150px' }}>Potencia P3:</label>
          <input
            type="number"
            id="contractedPowerP3"
            className="form-control"
            value={contractedPower.p3}
            onChange={(e) => setContractedPower({ ...contractedPower, p3: e.target.value })}
            placeholder="Potencia P3"
            required
          />
        </div>

        <div className="mb-3 form-group d-flex align-items-center">
          <label htmlFor="username" className="form-label me-3" style={{ width: '150px' }}>Email:</label>
          <select
            id="username"
            className="form-select"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          >
            <option value="">Seleccione un email</option>
            {userEmails.map((email, index) => (
              <option key={index} value={email}>{email}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Calcular</button>

        {invoiceResult && (
          <div className="mt-4 card p-4" style={{ border: '1px solid #ced4da', borderRadius: '5px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
            <h3 className="text-center mb-3">Resultados de la Factura</h3>
            <div className="text-center">
              <p><strong>Costo de Energía:</strong> {invoiceResult.total_energy_cost.toFixed(2)}</p>
              <p><strong>Costo de Potencia:</strong> {invoiceResult.total_power_cost.toFixed(2)}</p>
              <p><strong>Total de Factura:</strong> {invoiceResult.total_invoice.toFixed(2)}</p>
              <p><strong>ID de Factura:</strong> {invoiceResult.invoice_id}</p>
            </div>
            <div className="text-center">
              <button className="btn btn-danger" onClick={clearResults}>Continuar Facturando</button>
            </div>
          </div>
        )}
      </form>

      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
};

export default InvoiceCalculator;
