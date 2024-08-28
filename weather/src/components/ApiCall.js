import React, { useState } from 'react';
import axios from 'axios';

const ApiCall = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const API_KEY = '25ae58a99c9370c9164ddddc34c87f9c'; // Replace with your OpenWeatherMap API key

  const getWeather = async () => {
    if (!city) {
      setError('Please enter a city name.');
      return;
    }

    try {
      console.log(city)
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );
      console.log(response.data)
      setWeather(response.data);
      setError('');
    } catch (err) {
      setError('Could not fetch weather data. Please try again.');
      setWeather(null);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={getWeather}>Get Weather</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {weather && (
        <div style={{ marginTop: '20px' }}>
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Weather: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default ApiCall;
