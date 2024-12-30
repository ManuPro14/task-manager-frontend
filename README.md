# Task Manager Frontend

Este proyecto es el frontend de una aplicación de gestión de tareas, desarrollado en React con TypeScript y TailwindCSS. Proporciona una interfaz amigable y moderna para interactuar con el backend y gestionar tareas.

## 🚀 Tecnologías Utilizadas

	•	React: Biblioteca para construir interfaces de usuario.
	•	TypeScript: Superconjunto de JavaScript que añade tipado estático.
	•	TailwindCSS: Framework de CSS para un diseño rápido y eficiente.
	•	Vite: Herramienta de construcción rápida para aplicaciones modernas.
	•	Axios: Para realizar solicitudes HTTP al backend.

 📂 Estructura del Proyecto

 src/
├── api/
│   └── client.ts       # Configuración de Axios para la API
├── pages/
│   ├── TaskList.tsx    # Componente principal para mostrar tareas
│   ├── CreateTask.tsx  # Vista para crear nuevas tareas
│   ├── EditTask.tsx    # Vista para editar tareas existentes
│   ├── HomeTask.tsx    # Vista home donde se puede ver tareas o crear
├── App.tsx             # Componente principal de la aplicación
├── App.css            # Punto de entrada de la aplicación
├── routes.tsx          # Configuración de rutas de React Router
├── index.css           # Estilos principales con TailwindCSS
├── main.tsx            # Punto de entrada de la aplicación
├── index.tsx            # Punto de entrada de la aplicación

## 🌐 Funcionalidades

	1.	Lista de Tareas:
	•	Muestra todas las tareas disponibles.
	•	Permite filtrar entre tareas completadas y todas las tareas.
	•	Muestra estado de la tarea (completada o pendiente).
	•	Incluye botones para:
	•	Completar tareas.
	•	Editar tareas.
	•	Eliminar tareas (con confirmación mediante un modal).
	2.	Crear Nueva Tarea:
	•	Formulario para agregar una nueva tarea con título y descripción.
	•	Interacción con el backend para guardar la tarea.
	3.	Editar Tarea:
	•	Carga los datos de la tarea seleccionada en un formulario.
	•	Permite modificar y guardar cambios.
	4.	Responsividad:
	•	Diseño adaptado a dispositivos móviles, tablets y pantallas de escritorio.
	5.	Filtrar Tareas:
	•	Botón dinámico para alternar entre mostrar tareas completadas y todas las tareas.

 ## 📖 Uso

 Navegación Principal
	•	Página de inicio: Lista todas las tareas existentes.
	•	Crear nueva tarea: Redirige a la página de creación de tareas.
	•	Editar tarea: Redirige a la vista de edición de una tarea específica.
	•	Eliminar tarea: Abre un modal de confirmación antes de eliminar.

Funcionalidades Clave
	•	Filtrar tareas: Cambia entre “Mostrar Todas” y “Mostrar Completadas” con un botón dinámico.
	•	Responsividad: Navega cómodamente en cualquier dispositivo.

 ## 📝 Licencia

 Este proyecto está bajo la Licencia MIT. Puedes consultarla en el archivo LICENSE.
