'use client'
import React, { useState, useEffect } from 'react'
import { useApp } from '../Context/ContextApp'

export default function RegistroGastos() {
    const { presupuesto, gastos, agregarGasto, cargarGastos } = useApp();
    
    const [monto, setMonto] = useState('');
    const [categoria, setCategoria] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fecha, setFecha] = useState('');

    useEffect(() => {
        cargarGastos();
    }, []);

    async function manejarGuardarGasto() {
        if (monto && categoria && fecha) {
            const nuevoGasto = {
                categoria: categoria,
                monto: parseFloat(monto),
                fecha: fecha
            };
            
            await agregarGasto(nuevoGasto);
            
            setMonto('');
            setCategoria('');
            setDescripcion('');
            setFecha('');
        }
    }

    function manejarEliminar(idgasto: number) {

        console.log('Eliminar gasto:', idgasto);
    }

    function manejarEditar(idgasto: number) {

        console.log('Editar gasto:', idgasto);
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            {presupuesto.monto > 0 && (
                <div className="mb-6 p-4 bg-blue-50 rounded-md">
                    <h3 className="font-semibold text-blue-800">
                        Presupuesto Establecido: Lps. {presupuesto.monto.toFixed(2)}
                    </h3>
                </div>
            )}

            <h2 className="text-xl font-bold mb-4">Registro de Gastos</h2>
            

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                    <input
                        type="number"
                        placeholder="Monto"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={monto}
                        onChange={(e) => setMonto(e.target.value)}
                    />
                </div>
                
                <div>
                    <input
                        type="text"
                        placeholder="Descripción"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                    />
                </div>
                
                <div>
                    <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                    >
                        <option value="">Seleccionar Categoría</option>
                        <option value="Transporte">Transporte</option>
                        <option value="Entretenimiento">Entretenimiento</option>
                        <option value="Ropa">Ropa</option>
                        <option value="Comida">Comida</option>
                        <option value="Otros">Otros</option>
                    </select>
                </div>
                
                <div>
                    <input
                        type="date"
                        placeholder="Fecha"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                    />
                </div>
            </div>
            
            <button
                onClick={manejarGuardarGasto}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200 mb-6"
            >
                Guardar Gasto
            </button>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2">Monto</th>
                            <th className="border border-gray-300 px-4 py-2">Descripción</th>
                            <th className="border border-gray-300 px-4 py-2">Categoría</th>
                            <th className="border border-gray-300 px-4 py-2">Fecha</th>
                            <th className="border border-gray-300 px-4 py-2">Editar</th>
                            <th className="border border-gray-300 px-4 py-2">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {gastos.map((gasto) => (
                            <tr key={gasto.idgasto}>
                                <td className="border border-gray-300 px-4 py-2">
                                    Lps. {parseFloat(gasto.monto).toFixed(2)}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {gasto.descripcion || 'Sin descripción'}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {gasto.categoria}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {new Date(gasto.fecha).toLocaleDateString()}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <button
                                        onClick={() => manejarEditar(gasto.idgasto)}
                                        className="bg-yellow-500 text-white px-2 py-1 rounded text-sm hover:bg-yellow-600"
                                    >
                                        Editar
                                    </button>
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <button
                                        onClick={() => manejarEliminar(gasto.idgasto)}
                                        className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600"
                                    >
                                        Borrar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}