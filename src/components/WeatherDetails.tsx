import {FC} from 'react';
import styles from './WeatherDetails.module.css';
import {WeatherData} from "../hooks/useWeatherData";
import wind from '../assets/wind.svg';
import temperature from '../assets/temperature.svg';
import raincloud from '../assets/raincloud.svg';
import raindrop from '../assets/droplet.svg';


interface WeatherDetailsProps {
  weatherData: WeatherData;
  isImperial: boolean;
}
export const WeatherDetails: FC<WeatherDetailsProps> = ({weatherData, isImperial}) => {
  const {name, country, region, localtime, tz_id} = weatherData.location
  const {text, icon} = weatherData.current.condition
  const {temp_f, temp_c, feelslike_f, feelslike_c, wind_mph, wind_kph, wind_dir, humidity, precip_in, precip_mm} = weatherData.current

  return <div className={styles.weatherDetailsContainer}>
    <h1>{name}, {country === 'United States of America' ? region : country}</h1>

    <div className={styles.currentConditions}>
      <img src={icon} alt='' />
      <div>
        <p>{text}</p>
        <p>{isImperial ? `${temp_f}°F` : `${temp_c}°C`}</p>
      </div>
    </div>

    <div className={styles.moreDetails}>
      <div>
        <img src={temperature} alt={''} />
        <div>
          <p>Feels like:</p>
          <p>{isImperial ? `${feelslike_f}°F` : `${feelslike_c}°C`}</p>
        </div>
      </div>
      <div>
        <img src={wind} alt={''} />
        <div>
          <p>Wind:</p>
          <p>{isImperial ? `${wind_mph} mph` : `${wind_kph} kph`} {wind_dir}</p>
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
          <p>{isImperial ? `${precip_in} in` : `${precip_mm} mm`}</p>
        </div>
      </div>
    </div>

    <p className={styles.lastUpdated}>Last updated: {localtime} {tz_id}</p>
  </div>
}