// src/components/InvoiceList.jsx
import React, { useEffect, useState } from 'react';
import axios from '../axios'; // Asegúrate de que esto apunta correctamente a tu instancia de Axios
import '../App.css';

const InvoiceList = () => {
    const [invoices, setInvoices] = useState([]); // Inicializar como un array vacío
    const [loading, setLoading] = useState(true); // Para manejar el estado de carga
    const [error, setError] = useState(null); // Para manejar errores

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const response = await axios.get('/invoices'); // Asegúrate de que esta URL sea correcta
                setInvoices(response.data); // Asegúrate de que response.data sea un array
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchInvoices();
    }, []);

    if (loading) {
        return <div className="loading-message">Cargando...</div>;
    }

    if (error) {
        return <div className="error-message">Error al cargar las facturas: {error.message}</div>;
    }

    return (
        <div className="invoice-list-container">
            <h2 className="text-center">Listado de Facturas</h2>
            <ul className="invoice-list">
                {invoices.map((invoice) => (
                    <li key={invoice.id} className="invoice-item">
                        <strong>Factura ID:</strong> {invoice.id}, 
                        <strong>Cliente:</strong> {invoice.user_id},
                        <strong>Total:</strong> {invoice.total_invoice} €,
                        <strong>Creado:</strong> {new Date(invoice.created_at).toLocaleDateString('es-ES') }
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default InvoiceList;
