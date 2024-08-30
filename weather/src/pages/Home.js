// src/pages/Home.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
    // Variable.
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [userLocationWeather, setUserLocationWeather] = useState(null);
    const [error, setError] = useState('');
    const [forecast, setForecast] = useState(null);
    const [wait, setWait] = useState(false);
    const navigate = useNavigate();

    // API Key
    const API_KEY = '25ae58a99c9370c9164ddddc34c87f9c';

    // Get user location
    const getUserLocationWeather = () => {
        resetPage();
        setWait(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
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

    // Get current weather
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

    // Reset page.
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
            <h1>Sean Davran.</h1>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <FontAwesomeIcon icon={faStar} style={{ marginBottom: '25px' }}/>
                <FontAwesomeIcon icon={faStar} style={{ marginBottom: '25px' }}/>
                <FontAwesomeIcon icon={faStar} style={{ marginBottom: '25px' }}/>
                <FontAwesomeIcon icon={faStar} style={{ marginBottom: '25px' }}/>
                <FontAwesomeIcon icon={faStar} style={{ marginBottom: '25px' }}/>
            </div> 
            <input
                type="text"
                placeholder="Enter city name"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
                <button onClick={getWeather} style={{ marginBottom: '10px' }}>Get Weather</button>
                <button onClick={getForecast} style={{ marginBottom: '10px' }}>Get Forecast</button>
                <button onClick={getUserLocationWeather} style={{ marginBottom: '10px' }}>Get weather in user location.</button>
                <button onClick={resetPage} style={{ marginBottom: '10px' }}>Reset</button>
                <button onClick={() => navigate('/info')} style={{ marginBottom: '10px' }}>Info</button>
            </div>

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
