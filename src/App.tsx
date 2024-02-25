import styles from './App.module.css';
import {useWeatherData} from "./hooks/useWeatherData";
import {LocationForm} from "./components/LocationForm";
import {UnitToggle} from "./components/UnitToggle";
import {WeatherDetails} from "./components/WeatherDetails";

function App() {
  const {fetchWeatherData, weatherData, location, setLocation, isLoading, errorMessage, isImperial, setIsImperial} = useWeatherData()

  return (
    <article className={styles.container}>
      <div className={styles.formContainer}>
        <LocationForm onSubmit={fetchWeatherData} location={location} setLocation={setLocation}/>
        {weatherData && <UnitToggle isImperial={isImperial} setIsImperial={setIsImperial}/>}
      </div>
      <div>
        {errorMessage && <p className={styles.statusMessage}>{errorMessage}</p>}
        {isLoading && <p className={styles.statusMessage}>Loading...</p>}
        {weatherData && <WeatherDetails weatherData={weatherData} isImperial={isImperial}/>}
      </div>
    </article>
  );
}

export default App;
