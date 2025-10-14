import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthProvider.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Tasks from './pages/Tasks.jsx';
import AllTasks from './pages/Alltasks.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import Navbar from './components/Navbar.jsx';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter basename="/TaskManageAPI">
        <Navbar />
        <main className="app-container">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<PrivateRoute><Tasks /></PrivateRoute>} />
              <Route path="/all-tasks" element={<PrivateRoute><AllTasks /></PrivateRoute>} />
            </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;