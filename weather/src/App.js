// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Info from './pages/Info'; // Import the Info page

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/info" element={<Info />} /> {/* Add route for Info page */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
