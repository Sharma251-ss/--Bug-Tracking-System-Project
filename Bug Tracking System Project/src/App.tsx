import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { BugList } from './pages/BugList';
import { NewBug } from './pages/NewBug';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="bugs" element={<BugList />} />
            <Route path="bugs/new" element={<NewBug />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;