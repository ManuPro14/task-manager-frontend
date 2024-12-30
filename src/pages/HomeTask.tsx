import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeTask: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-400 to-gray-500 text-white">
      <div className="bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-5xl font-extrabold mb-2 drop-shadow-lg">
          Bienvenido a <span className="text-gray-200">Gestión de Tareas</span>
        </h1>
        <p className="text-lg mb-8 font-medium text-gray-300">
          Administra y visualiza tus tareas de manera eficiente.
        </p>
        <div className="flex space-x-6 items-center justify-center">
          <button
            onClick={() => navigate('/list')}
            className="px-6 py-3 bg-gray-200 text-black font-semibold rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
          >
            Ver Tareas
          </button>
          <button
            onClick={() => navigate('/create')}
            className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all"
          >
            Crear Tarea
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeTask;