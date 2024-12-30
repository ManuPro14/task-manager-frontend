import React, { useEffect, useState } from 'react';
import client from '../api/client';
import { Check, FilePenLine, Trash2 } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await client.get('/api/tasks');
        setTasks(data);
      } catch (error) {
        console.error('Error al obtener las tareas:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleComplete = async (id: string) => {
    try {
      const task = tasks.find((task) => task.id === id);
      if (task) {
        const updatedTask = { completed: !task.completed }; 
        await client.put(`/api/tasks/${id}`, updatedTask); 
        setTasks((prevTasks) =>
          prevTasks.map((t) =>
            t.id === id ? { ...t, completed: !t.completed } : t
          )
        );
      }
    } catch (error) {
      console.error('Error al actualizar la tarea:', error);
    }
  };

  const handleEdit = async (id: string) => {
    window.location.href = `/edit/${id}`;
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar esta tarea?');
    if (!confirmDelete) return;

    try {
      await client.delete(`/api/tasks/${id}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-400 text-white px-4">
      <h1 className="text-4xl font-extrabold mb-6 text-center">
        Lista de <span className="text-gray-100">Tareas</span>
      </h1>

      <button className='mb-4'>
        <a 
          href="/create" 
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-semibold">
          Crear Tarea
        </a>
      </button>
      <div className="bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-lg shadow-lg w-full max-w-2xl">
        {tasks.length > 0 ? (
          <ul className="space-y-4">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="p-4 bg-white  rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center"
              >
                <div className="flex-1 mb-4 sm:mb-0">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{task.title}</h3>
                  <p className="text-gray-800">{task.description}</p>
                  <p
                    className={`mt-2 font-semibold ${
                      task.completed ? 'text-green-400' : 'text-red-500'
                    }`}
                  >
                    {task.completed ? 'Completada' : 'Pendiente'}
                  </p>
                </div>
                <div className="flex space-x-2 ">
                  <button
                    onClick={() => handleComplete(task.id)}
                    className={`px-4 py-2 rounded-lg font-semibold ${
                      task.completed
                        ? 'bg-green-500 text-white hover:bg-green-600'
                        : 'bg-gray-600 text-white hover:bg-gray-700'
                    }`}
                  >
                    <Check size={20} />
                  </button>
                  <button
                    onClick={() => handleEdit(task.id)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-semibold"
                  >
                    <FilePenLine size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 font-semibold"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-300 text-center">No hay tareas disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default TaskList;