import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import client from "../api/client";

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

const EditTask: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Obtenemos el ID de la URL
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null); // Estado para la tarea
  const [loading, setLoading] = useState(true); // Para manejar el estado de carga
  const [error, setError] = useState<string | null>(null); // Para manejar errores

  // Función para cargar los detalles de la tarea
  useEffect(() => {
    console.log("ID obtenido desde la URL:", id); 
  
    const fetchTask = async () => {
      try {
        const { data } = await client.get(`/api/tasks/${id}`);
        console.log("Tarea obtenida:", data); 
        setTask(data);
      } catch (error) {
        console.error("Error al cargar la tarea:", error);
        setError("No se pudo cargar la tarea");
      } finally {
        setLoading(false);
      }
    };
  
    if (id) {
      fetchTask();
    }
  }, [id]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (!task) return;
      const { title, description, completed } = task;
      await client.put(`/api/tasks/${id}`, { title, description, completed });
      console.log('Tarea actualizada exitosamente');
      navigate('/list');
    } catch (error) {
      console.error('Error al actualizar la tarea:', error);
      setError('No se pudo actualizar la tarea.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!task) return;
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  if (loading) {
    return <div className="text-center text-white">Cargando tarea...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-400 to-gray-500 text-white">
      <div className="bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-5xl font-extrabold mb-8 text-center drop-shadow-lg">
          Editar Tarea
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-semibold mb-2">Título</label>
            <input
              type="text"
              name="title"
              value={task?.title || ""}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-100 bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Escribe el título de la tarea"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-semibold mb-2">Descripción</label>
            <textarea
              name="description"
              value={task?.description || ""}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-100 bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Describe los detalles de la tarea"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-[150px] py-3 bg-gray-600 text-white font-bold rounded-full hover:bg-gray-800 focus:outline-none focus:ring-2 transition-all"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTask;