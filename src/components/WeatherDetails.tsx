import {FC} from 'react';
import styles from './WeatherDetails.module.css'
import {WeatherData} from "../hooks/useWeatherData";

interface WeatherDetailsProps {
  weatherData: WeatherData;
}
export const WeatherDetails: FC<WeatherDetailsProps> = ({weatherData}) => {
  const {name, country, region, localtime} = weatherData.location
  const {text, icon} = weatherData.current.condition
  const {temp_f, feelslike_f, wind_mph, wind_dir, humidity, precip_in} = weatherData.current
  return <div className={styles.weatherDetailsContainer}>
    <h1>{name}, {country === 'United States of America' ? region : country}</h1>

    <div className={styles.currentConditions}>
      <p>{text}</p>
      <img src={icon} />
      <p>{`${temp_f}° F`}</p>
    </div>

    <div className={styles.moreDetails}>
      <div>
        <p>Feels like:</p>
        <p>{`${feelslike_f}° F`}</p>
      </div>
      <div>
        <p>Wind:</p>
        <p>{`${wind_mph} mph`} {wind_dir}</p>
      </div>
      <div>
        <p>Humidity:</p>
        <p>{humidity}%</p>
      </div>
      <div>
        <p>Precipitation:</p>
        <p>{`${precip_in} in`}</p>
      </div>
    </div>

    <p className={styles.lastUpdated}>Last updated: {localtime}</p>
  </div>
}