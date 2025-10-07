import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/authprovider';
import Login from './pages/Login';
import Register from './pages/Register';
import Tasks from './pages/Tasks';
import AllTasks from './pages/AllTasks';
import PrivateRoute from './components/Privateroute';
import Navbar from './components/Navbar';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
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