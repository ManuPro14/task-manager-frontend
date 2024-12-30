import React, { useState } from 'react';
import client from '../api/client';
import { useNavigate } from 'react-router-dom';

const CreateTask: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await client.post('/api/tasks', { title, description, completed: false });
      navigate('/list');
    } catch (error) {
      console.error('Error al crear la tarea: ', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-400 to-gray-500 text-white">
        <h1 className="text-4xl font-extrabold mb-6 text-center">
          Crear Tarea
        </h1>
      <div className="bg-gray-300 bg-opacity-10 backdrop-blur-md p-8 rounded-lg shadow-lg w-full max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-semibold mb-2">
              Título
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-100 bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Escribe el título de la tarea"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-semibold  mb-2">
              Descripción
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-100 bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Describe los detalles de la tarea"
            />
          </div>
          <div className='flex justify-center'>

          <button
            type="submit"
            className="w-[150px] py-3 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 transition-all"
          >
            Crear Tarea
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;