import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloud, faBolt, faSnowflake, faCloudRain } from '@fortawesome/free-solid-svg-icons';
import CitySearch from './CitySearch';
import Loader from './Loader';
import './styles.css';

/*getWeatherData*/
const  REACT_APP_OPENWEATHERMAP_API_KEY =`1dcb539e8ffcf8b85ce525469a013a50`;
async function getWeatherData(latitude, longitude) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${REACT_APP_OPENWEATHERMAP_API_KEY}&lang=es`;
  const response = await axios.get(url);
  return response.data;
}
/*weather app*/
const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [isFahrenheit, setIsFahrenheit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  function getTemperature() {
    if (weatherData && weatherData.main) {
      return isFahrenheit ? convertToFahrenheit(weatherData.main.temp) : weatherData.main.temp;
    } else {
      return '-';
    }
  }
  /*iconosFont.awesome*/
  const getWeatherIcon = () => {
    if (weatherData && weatherData.weather) {
      const weather = weatherData.weather[0].main;
      switch (weather) {
        case 'Clear':
          return <FontAwesomeIcon icon={faSun} className="weather-icon fa-sun" />;
        case 'Clouds':
          return <FontAwesomeIcon icon={faCloud} className="weather-icon fa-cloud" />;
        case 'Thunderstorm':
          return <FontAwesomeIcon icon={faBolt} className="weather-icon fa-bolt" />;
        case 'Drizzle':
        case 'Rain':
          return <FontAwesomeIcon icon={faCloudRain} className="weather-icon fa-rain" />;
        case 'Snow':
          return <FontAwesomeIcon icon={faSnowflake} className="weather-icon fa-snowflake" />;
      }
    }
    return null;
  };
  /*convertToFahrenheit*/
  const convertToFahrenheit = (temp) => {
    return (temp * 9) / 5 + 32;
  }
  const toggleTemperature = () => {
    setIsFahrenheit(!isFahrenheit);
  }
/*Geolocation*/
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const data = await getWeatherData(latitude, longitude);
      setWeatherData(data);
      setIsLoading(false);
    });
  }
  , []);
/*handleCitySearch*/
  const handleCitySearch = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${REACT_APP_OPENWEATHERMAP_API_KEY}&lang=es`;
    const response = await axios.get(url);
    setWeatherData(response.data);
  }
 console.log(weatherData);
/*className="weather-app"*/
  return (
    <div className="weather-app">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <CitySearch onSearch={handleCitySearch} />
          <div className="weather-app__temperature">
            <span className="weather-app__temperature-value">{getTemperature()}</span>
            <span className="weather-app__temperature-unit">{isFahrenheit ? '°F' : '°C'}</span>
          </div>
          <div className="weather-app__weather">
            {getWeatherIcon()}
            <span className="weather-app__weather-description">{weatherData && weatherData.weather ? weatherData.weather[0].description : ''}</span>
          </div>
          <div className="weather-app__location">
            <span className="weather-app__location-city">{weatherData && weatherData.name ? weatherData.name : ''}</span>
            <span className="weather-app__location-country">{weatherData && weatherData.sys ? weatherData.sys.country : ''}</span>
            <img src={`https://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@4x.png`} alt="" />
          </div>
          <div className="weather-app__toggle">
            <button className="weather-app__toggle-button" onClick={toggleTemperature}>
              {isFahrenheit ? 'Ver en °C' : 'Ver en °F'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherApp;