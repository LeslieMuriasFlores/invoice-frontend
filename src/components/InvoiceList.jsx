// src/components/InvoiceList.jsx
import React, { useEffect, useState } from 'react';
import axios from '../axios';
import '../App.css';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

const InvoiceList = () => {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const response = await axios.get('/invoices'); 
                const invoicesWithEmails = await Promise.all(
                    response.data.map(async (invoice) => {
                        const email = await fetchUserEmail(invoice.user_id); 
                        return { ...invoice, email };
                    })
                );
                setInvoices(invoicesWithEmails); // Guardar las facturas con los emails
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchInvoices();
    }, []);

    // Obtener el email de un usuario por su ID
    const fetchUserEmail = async (userId) => {
        try {
            const response = await axios.get(`/users/${userId}/email`);
            return response.data.email;
        } catch (error) {
            console.error('Error al obtener el email del usuario:', error);
            return 'Email no disponible'; 
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar esta factura?')) {
            try {
                await axios.delete(`/invoices/${id}`); 
                setInvoices(invoices.filter(invoice => invoice.id !== id));
                toast.success('Factura eliminada con éxito'); 
            } catch (error) {
                console.error('Error al eliminar la factura:', error);
                toast.error('Error al eliminar la factura'); 
            }
        }
    };

    if (loading) {
        return <div className="loading-message">Cargando...</div>;
    }

    if (error) {
        return <div className="error-message">Error al cargar las facturas: {error.message}</div>;
    }   

    return (
        <div className="invoice-list-container">
            <h2 className="text-center">Listado de Facturas</h2>
            <ul className="invoice-list" style={{ textAlign: 'left' }}>
            {invoices.map((invoice) => (
                <li key={invoice.id} className="invoice-item d-flex justify-content-between align-items-center">
                    <div className="invoice-details" style={{ flex: 1 }}>
                        <strong>Factura ID:</strong> {invoice.id}, 
                        <strong> Usuario:</strong> {invoice.email},
                        <strong> Total:</strong> {invoice.total_invoice} €,
                        <strong> Creado:</strong> {new Date(invoice.created_at).toLocaleDateString('es-ES')}
                    </div>
                    <div>
                        <button 
                            className="btn btn-danger btn-sm" 
                            onClick={() => handleDelete(invoice.id)} 
                            aria-label="Eliminar factura" 
                            style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }} 
                        >
                            <i className="bi bi-trash"></i>
                        </button>
                    </div>
                </li>
            ))}
            </ul>
            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </div>
    );
};

export default InvoiceList;
