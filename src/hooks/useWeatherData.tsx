import {useCallback, useEffect, useState, Dispatch, SetStateAction} from "react";

interface CurrentWeather {
  cloud: number;
  condition: {
    code: number;
    icon: string;
    text: string
  }
  feelslike_c: number;
  feelslike_f: number;
  gust_kph: number;
  gust_mph: number;
  humidity: number;
  is_day: number;
  last_updated: string;
  precip_in: number;
  precip_mm: number;
  temp_c: number;
  temp_f: number;
  wind_degree: number;
  wind_dir: string;
  wind_kph: number;
  wind_mph: string;
}

interface Location {
  country: string;
  lat: number;
  localtime: string;
  localtime_epoch: number;
  lon: number;
  name: string;
  region: string;
}

export interface WeatherData {
  current: CurrentWeather,
  location: Location
}

interface UseWeatherDataProps  {
  fetchWeatherData: (location: (string | number)) => Promise<void>
  weatherData: WeatherData | null;
  location: string | number;
  setLocation: Dispatch<SetStateAction<string | number>>
  isLoading: boolean;
  errorMessage: string | null;
}

export const useWeatherData = (): UseWeatherDataProps => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [location, setLocation] = useState<string | number>('')

  const fetchWeatherData = useCallback(async (location: string | number) => {
    try {
      setErrorMessage(null)
      setIsLoading(true)
      setWeatherData(null)
      const response = await fetch(`https://weatherapi-com.p.rapidapi.com/current.json?q=${location}`, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': process.env?.REACT_APP_RAPID_REALTIME_WEATHER_API_KEY ?? '',
          'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
      })
      if (!response.ok) {
        console.log(response);
        if (response.status.toString().startsWith('4')) {
          throw new Error(`Error code: ${response.status}. Client error. Please ensure your credentials are correct and try again.`)
        }
        if (response.status.toString().startsWith('5')) {
          throw new Error(`Error code: ${response.status }. Server error. The Rapid Realtime Weather API is currently unavailable. Please try again later.`)
        }
      }

      const data = await response.json()
      console.log('data', data);
      setWeatherData(data)
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
        setErrorMessage(e.message)
      }
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const formattedCoordinates = `${position.coords.latitude.toFixed(2)},${position.coords.longitude.toFixed(2)}`
      await fetchWeatherData(formattedCoordinates)
      setLocation(formattedCoordinates)
    });
  }, [fetchWeatherData])

  return {
    fetchWeatherData,
    weatherData,
    location,
    setLocation,
    isLoading,
    errorMessage
  }
}