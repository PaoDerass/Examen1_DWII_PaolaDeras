'use client'
import React, { useState } from 'react'
import { useApp } from '../Context/ContextApp'

export default function Login() {
    const { iniciarSesion } = useApp();
    const [usuario, setUsuario] = useState('');
    const [clave, setClave] = useState('');
    const [error, setError] = useState('');

    function manejarLogin() {
        if (iniciarSesion(usuario, clave)) {
            setError('');
        } else {
            setError('Usuario o contraseña incorrectos');
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8">
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-center text-2xl font-bold text-gray-900 mb-6">
                     Inicio de Sesión
                    </h2>
                    
                    <div className="space-y-4">
                        <div>
                            <input
                                type="text"
                                placeholder="Usuario"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={usuario}
                                onChange={(e) => setUsuario(e.target.value)}
                            />
                        </div>
                        
                        <div>
                            <input
                                type="password"
                                placeholder="Clave"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={clave}
                                onChange={(e) => setClave(e.target.value)}
                            />
                        </div>
                        
                        {error && (
                            <div className="text-red-500 text-sm text-center">
                                {error}
                            </div>
                        )}
                        
                        <button
                            onClick={manejarLogin}
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
                        >
                            Iniciar Sesión
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}