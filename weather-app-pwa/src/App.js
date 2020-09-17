import React, { useState, useEffect } from 'react';
import getTheWeather from './components/getTheWeather.js';
import './App.css';

const App = () => {
  const [query, setquery] = useState('');
  const [weather, setweather] = useState({});

  const search = async (e) => {
    if (e.key === 'Enter') {
      const data = await getTheWeather(query);

      setweather(data);
      //reseting the search bar or query back to zero
      setquery('');

      console.log(data);
    }
  };
  return (
    <div className='the-main-container'>
      <input
        type='text'
        className='search'
        placeholder='seaerch'
        value={query}
        onChange={(e) => setquery(e.target.value)}
        onKeyPress={search}
      />

      {/* // line of code says that if the data from the weather that we are calling exists then it will return the react component and if it doesn't exist then it returns nothing. */}
      {weather.main && (
        <div className='city'>
          <h2 className='city-name'>
            <span>{weather.name}</span>
            <sup>{weather.sys.country}</sup>
          </h2>

          <div className='city-temp'>
            {Math.round(weather.main.temp)}
            <sup>&deg;C</sup>
          </div>

          <div className='info'>
            <img
              className='city-icon'
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />

            <p>{weather.weather[0].description}</p>
            <p>Longitude:{weather.coord.lon}</p>
            <p>Latitude:{weather.coord.lat}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
