import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("Wisques");
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (city) => {
    try {
      setLoading(true);
      const apiKey = process?.env?.REACT_APP_WEATHER_API_KEY || 'fallback_api_key';
      console.log(process.env);
      const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
      const response = await axios.get(url);
      setWeather(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, [city]);
  return (
    <div>
      <h1>Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
      />
      <button onClick={() => fetchWeather(city)}>Get Weather</button>

      {loading ? (
        <p>Loading...</p>
      ) : weather ? (
        <div>
          <h2>
            {weather.location.name}, {weather.location.country}
          </h2>
          <p>Temperature: {weather.current.temp_c}°C</p>
          <p>Condition: {weather.current.condition.text}</p>
          <img src={weather.current.condition.icon} alt="weather icon" />
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}

export default App;
