'use client'
import { useState } from 'react'
import ProviderApp from '../Providers/ProviderApp'
import { useApp } from '../Context/ContextApp'
import Login from '../Componetns/Login'
import Presupuesto from '../Componetns/Presupuesto'
import RegistroGastos from '../Componetns/RegistroGastos'

function ContenidoApp() {
  const { usuario, cerrarSesion } = useApp();
  const [vistaActual, setVistaActual] = useState<'presupuesto' | 'gastos'>('presupuesto');

  if (!usuario.autenticado) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Administrador de Gastos Personales
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                Bienvenido, {usuario.nombre}
              </span>
              <button
                onClick={cerrarSesion}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setVistaActual('presupuesto')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                vistaActual === 'presupuesto'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Presupuesto Mensual
            </button>
            <button
              onClick={() => setVistaActual('gastos')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                vistaActual === 'gastos'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Registro de Gastos
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {vistaActual === 'presupuesto' && <Presupuesto />}
          {vistaActual === 'gastos' && <RegistroGastos />}
        </div>
      </main>
    </div>
  );
}


export default function Home() {
  return (
    <ProviderApp>
      <ContenidoApp />
    </ProviderApp>
  );
}