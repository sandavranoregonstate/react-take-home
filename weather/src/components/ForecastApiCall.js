import React, { useState } from 'react';
import axios from 'axios';

const ForecastApiCall = () => {
  const [city, setCity] = useState('');
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState('');

  const API_KEY = '25ae58a99c9370c9164ddddc34c87f9c'; // Replace with your OpenWeatherMap API key

  const getForecast = async () => {
    if (!city) {
      setError('Please enter a city name.');
      return;
    }

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      console.log(response.data);
      setForecast(response.data);
      setError('');
    } catch (err) {
      setError('Could not fetch forecast data. Please try again.');
      setForecast(null);
    }
  };

  const resetPage = () => {
    setCity('');
    setForecast(null);
    setError('');
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      getForecast();
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>5-Day Weather Forecast</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button onClick={getForecast}>Get Forecast</button>
      <button onClick={resetPage} style={{ marginLeft: '10px' }}>Reset</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {forecast && (
        <div style={{ marginTop: '20px' }}>
          <h2>Forecast for {forecast.city.name}</h2>
          {forecast.list.slice(0, 40).map((item, index) => (
            <div key={index} style={{ marginBottom: '20px' }}>
              <p><strong>{new Date(item.dt_txt).toLocaleString()}</strong></p>
              <p>Temperature: {item.main.temp} °C</p>
              <p>Weather: {item.weather[0].description}</p>
              <p>Humidity: {item.main.humidity}%</p>
              <p>Wind Speed: {item.wind.speed} m/s</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ForecastApiCall;
