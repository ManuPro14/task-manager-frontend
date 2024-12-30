import React, { useEffect, useState } from 'react';
import client from '../api/client';
import { Check, FilePenLine, Trash2, TriangleAlert } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [showCompleted, setShowCompleted] = useState(false);

  // Obtener tareas al cargar el componente
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

  const handleEdit = (id: string) => {
    window.location.href = `/edit/${id}`;
  };

  const handleDelete = async () => {
    if (!selectedTaskId) return;

    try {
      await client.delete(`/api/tasks/${selectedTaskId}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== selectedTaskId));
      setIsModalOpen(false);
      setSelectedTaskId(null);
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
    }
  };

  const openDeleteModal = (id: string) => {
    setSelectedTaskId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTaskId(null);
  };

  const toggleCompletedTasks = () => {
    setShowCompleted((prevState) => !prevState);
  };

  const filteredTasks = showCompleted
    ? tasks.filter((task) => task.completed)
    : tasks;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-400 text-white px-4">
      <h1 className="text-4xl font-extrabold mb-6 text-center">
        Lista de <span className="text-gray-100">Tareas</span>
      </h1>

      <div className="flex items-center space-x-4 mb-4">
        <button
          onClick={toggleCompletedTasks}
          className={`px-4 py-2 rounded-lg font-semibold ${
            showCompleted
              ? 'bg-gray-600 text-white hover:bg-gray-700'
              : 'bg-green-500 text-white hover:bg-green-600'
          }`}
        >
          {showCompleted ? 'Mostrar Todas' : 'Mostrar Completadas'}
        </button>
        <button>
          <a
            href="/create"
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-semibold"
          >
            Crear Tarea
          </a>
        </button>
      </div>

      <div className="bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-lg shadow-lg w-full max-w-2xl">
        {filteredTasks.length > 0 ? (
          <ul className="space-y-4">
            {filteredTasks.map((task) => (
              <li
                key={task.id}
                className="p-4 bg-white rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center"
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
                <div className="flex space-x-2">
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
                    onClick={() => openDeleteModal(task.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 font-semibold"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-300 text-center">
            {showCompleted
              ? 'No hay tareas completadas.'
              : 'No hay tareas disponibles.'}
          </p>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h1 className="text-2xl font-semibold text-red-500 mb-4 justify-center flex items-center">
              <TriangleAlert size={24} className="inline-block mr-2" />
              Alerta
            </h1>
            <h2 className="text-lg font-bold mb-4 text-gray-800">
              ¿Estás seguro de que deseas eliminar esta tarea?
            </h2>
            <div className="flex justify-center space-x-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;