import "./App.css";
import Search from "./components/search/search";
import Currentweather from "./components/current-feather/current-weather";
import Forecast from "./components/forecast/forecast";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import { useState } from "react";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = async (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    try {
      const currentWeatherFetch = fetch(
        `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      );

      const forecastFetch = fetch(
        `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      );

      const [weatherRes, forecastRes] = await Promise.all([
        currentWeatherFetch,
        forecastFetch,
      ]);

      if (!weatherRes.ok || !forecastRes.ok) {
        throw new Error("Error al obtener los datos del clima.");
      }

      const weatherResponse = await weatherRes.json();
      const forecastResponse = await forecastRes.json();

      setCurrentWeather({
        city: searchData.label,
        ...weatherResponse,
      });

      setForecast({
        city: searchData.label,
        ...forecastResponse,
      });
    } catch (err) {
      console.error("Error:", err);
    }
  };

  console.log(currentWeather);
  console.log(forecast);

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />

      {currentWeather && (
        <Currentweather data={currentWeather} />
      )}

      {forecast && (
        <Forecast data={forecast} />
      )}
    </div>
  );
}

export default App;
