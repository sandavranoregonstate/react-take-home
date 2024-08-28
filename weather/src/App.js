import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ApiCall from './components/ApiCall';
import ForecastApiCall from './components/ForecastApiCall';
import LocationWeather from './components/LocationWeather';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Add more routes as needed */}
        </Routes>
        <ApiCall />
        <ForecastApiCall />
        <LocationWeather />
        <Footer />
      </div>
    </Router>
  );
}

export default App;