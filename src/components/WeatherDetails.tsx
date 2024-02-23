import {FC} from 'react';
import styles from './WeatherDetails.module.css';
import {WeatherData} from "../hooks/useWeatherData";
import wind from '../assets/wind.svg';
import temperature from '../assets/temperature.svg';
import raincloud from '../assets/raincloud.svg';
import raindrop from '../assets/droplet.svg';


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
        <img src={temperature} alt={''} />
        <div>
          <p>Feels like:</p>
          <p>{`${feelslike_f}° F`}</p>
        </div>
      </div>
      <div>
        <img src={wind} alt={''} />
        <div>
          <p>Wind:</p>
          <p>{`${wind_mph} mph`} {wind_dir}</p>
        </div>
      </div>
      <div>
        <img src={raindrop} alt={''} />
        <div>
          <p>Humidity:</p>
          <p>{humidity}%</p>
        </div>
      </div>
      <div>
        <img src={raincloud} alt={''} />
        <div>
          <p>Precipitation:</p>
          <p>{`${precip_in} in`}</p>
        </div>
      </div>
    </div>

    <p className={styles.lastUpdated}>Last updated: {localtime}</p>
  </div>
}