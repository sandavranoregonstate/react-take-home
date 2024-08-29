import React, { useState } from 'react';
import axios from 'axios';

const Home = () => {

    // Variables.
    const [location, setLocation] = useState({ latitude: null, longitude: null });
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [userLocationWeather, setUserLocationWeather] = useState(null);
    const [error, setError] = useState('');
    const [forecast, setForecast] = useState(null);
    const [wait, setWait] = useState(false); 

    // API Key.
    const API_KEY = '25ae58a99c9370c9164ddddc34c87f9c'; 

    // Get user location.

    const getUserLocationWeather = () => {

        setWait(true);
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
                resetPage();
                setError('Failed to retrieve your location.');
            }
            );
        } else {
            resetPage();
            setError('Geolocation is not supported by this browser.');
        }
    };

    const fetchWeather = async (latitude, longitude) => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
            );
            resetPage();
            setWait(false);
            setUserLocationWeather(response.data);
        } catch (err) {
            resetPage();
            setError('Could not fetch weather data. Please try again.');
        }
    };

    // Get forecast.
    const getForecast = async () => {
        if (!city) {
            resetPage();
            setError('Please enter a city name.');
            return;
        }
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
            );
            resetPage();
            setForecast(response.data);
        } catch (err) {
            resetPage();
            setError('Could not fetch forecast data. Please try again.');
        }
    };

    // Get current weather.
    const getWeather = async () => {
        if (!city) {
            resetPage();
            setError('Please enter a city name.');
            return;
        }
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
            );
            resetPage();
            setWeather(response.data);
        } catch (err) {
            resetPage();
            setError('Could not fetch weather data. Please try again.');
        }
    };

    // Reset Page.
    const resetPage = () => {
        setError('');
        setWeather(null);
        setForecast(null);
        setUserLocationWeather(null);
        setCity('');
    };

    // Render.
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <input
                type="text"
                placeholder="Enter city name"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />

            <button onClick={getWeather}>Get Weather</button>
            <button onClick={getForecast}>Get Forecast</button>
            <button onClick={getUserLocationWeather}>Get weather in user location.</button>
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
            {userLocationWeather && (
                <div style={{ marginTop: '20px' }}>
                    <h2>{userLocationWeather.name}</h2>
                    <p>Temperature: {userLocationWeather.main.temp} °C</p>
                    <p>Weather: {userLocationWeather.weather[0].description}</p>
                    <p>Humidity: {userLocationWeather.main.humidity}%</p>
                    <p>Wind Speed: {userLocationWeather.wind.speed} m/s</p>
                </div>
            )}
            { wait && (
                <div style={{ marginTop: '20px' }}>
                    <h2>{"Wait."}</h2>
                </div>
            )}
        </div>
      );
  };
  
  export default Home;