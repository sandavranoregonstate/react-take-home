import React, { useState } from 'react';
import axios from 'axios';

const LocationWeather = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const API_KEY = '25ae58a99c9370c9164ddddc34c87f9c'; // Replace with your OpenWeatherMap API key

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          fetchWeather(position.coords.latitude, position.coords.longitude);
        },
        (err) => {
          setError('Failed to retrieve your location.');
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  const fetchWeather = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
      setError('');
    } catch (err) {
      setError('Could not fetch weather data. Please try again.');
    }
  };

  const resetPage = () => {
    setLocation({ latitude: null, longitude: null });
    setWeather(null);
    setError('');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Current Weather at Your Location</h1>

      <button onClick={getUserLocation}>Get Weather</button>
      <button onClick={resetPage} style={{ marginLeft: '10px' }}>Reset</button>

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

export default LocationWeather;
