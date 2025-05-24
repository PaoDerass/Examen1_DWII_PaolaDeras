'use client'
import React, { useState } from 'react'
import { useApp } from '../Context/ContextApp'

export default function Presupuesto() {
    const { presupuesto, establecerPresupuesto, alerta } = useApp();
    const [montoInput, setMontoInput] = useState('');

    function manejarPresupuesto() {
        const monto = parseFloat(montoInput);
        if (monto > 0) {
            establecerPresupuesto(monto);
            setMontoInput('');
        }
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Establecer un presupuesto mensual</h2>
            
            <div className="space-y-4">
                <div>
                    <input
                        type="number"
                        placeholder="Monto de su presupuesto Mensual"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={montoInput}
                        onChange={(e) => setMontoInput(e.target.value)}
                    />
                </div>
                
                <button
                    onClick={manejarPresupuesto}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
                >
                    Guardar Presupuesto
                </button>
            </div>

            {}
            {presupuesto.monto > 0 && (
                <div className="mt-4 p-4 bg-gray-50 rounded-md">
                    <p className="text-sm text-gray-600">
                        Presupuesto: {presupuesto.monto.toFixed(2)} Lempiras
                    </p>
                    <p className="text-sm text-gray-600">
                        Gastado: {presupuesto.gastoActual.toFixed(2)} Lempiras
                    </p>
                    <p className="text-sm text-gray-600">
                        Disponible: {(presupuesto.monto - presupuesto.gastoActual).toFixed(2)} Lempiras
                    </p>
                </div>
            )}

            {}
            {alerta.mensaje && (
                <div className={`mt-4 p-3 rounded-md ${
                    alerta.tipo === 'warning' 
                        ? 'bg-yellow-100 text-yellow-800 border border-yellow-300' 
                        : 'bg-red-100 text-red-800 border border-red-300'
                }`}>
                    {alerta.mensaje}
                </div>
            )}
        </div>
    );
}