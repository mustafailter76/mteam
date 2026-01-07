import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Library from './pages/Library';
import GameDetail from './pages/GameDetail';

import './App.css';

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div className="app-container">
      <Navbar />
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game/:id" element={<GameDetail />} />
          
          <Route 
            path="/login" 
            element={!isAuthenticated ? <Login /> : <Navigate to="/" />} 
          />
          <Route 
            path="/register" 
            element={!isAuthenticated ? <Register /> : <Navigate to="/" />} 
          />

          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/library" element={<Library />} />
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      
      <Footer />
      <CartDrawer />
      <ToastContainer position="top-right" autoClose={1500} />
    </div>
  );
}

export default App;