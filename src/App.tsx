import {useState, useEffect, useCallback} from 'react';
import './App.css';
import {useWeatherData} from "./hooks/useWeatherData";



function App() {
  const {fetchWeatherData, weatherData, location, setLocation, isLoading, errorMessage} = useWeatherData()

  console.log(weatherData);

  return (
    <div className="App">
    </div>
  );
}

export default App;
