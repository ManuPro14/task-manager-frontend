import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskList from './pages/TaskList';
import CreateTask from './pages/CreateTask';
import HomeTask from './pages/HomeTask';
import EditTask from './pages/EditTask';

const id = ':id';

const AppRoutes: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/create" element={<CreateTask />} />
      <Route path="/list" element={<TaskList />} />
      <Route path={`/edit/${id}`} element={<EditTask />} />
      <Route path="/" element={<HomeTask />} />
    </Routes>
  </Router>
);

export default AppRoutes;