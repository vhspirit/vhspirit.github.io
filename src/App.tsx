import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StorePage } from './pages/StorePage';
import { AdminPage } from './pages/AdminPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StorePage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;