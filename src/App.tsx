import {useState, useEffect, useCallback} from 'react';
import styles from './App.module.css';
import {useWeatherData} from "./hooks/useWeatherData";
import {LocationForm} from "./components/LocationForm";
import {UnitToggle} from "./components/UnitToggle";
import {WeatherDetails} from "./components/WeatherDetails";


function App() {
  const {fetchWeatherData, weatherData, location, setLocation, isLoading, errorMessage} = useWeatherData()

  console.log(weatherData);

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <LocationForm />
        {weatherData && <UnitToggle/>}
      </div>
      <div>
        {errorMessage && <p className={styles.statusMessage}>{errorMessage}</p>}
        {isLoading && <p className={styles.statusMessage}>Loading...</p>}
        {weatherData && <WeatherDetails />}
      </div>
    </div>
  );
}

export default App;
