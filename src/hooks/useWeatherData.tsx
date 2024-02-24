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
  humidity: number;
  last_updated: string;
  precip_in: number;
  precip_mm: number;
  temp_c: number;
  temp_f: number;
  wind_dir: string;
  wind_kph: number;
  wind_mph: number;
}

interface Location {
  country: string;
  lat: number;
  localtime: string;
  lon: number;
  name: string;
  region: string;
  tz_id: string;
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
  isImperial: boolean;
  setIsImperial: Dispatch<SetStateAction<boolean>>
}

export const useWeatherData = (): UseWeatherDataProps => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [location, setLocation] = useState<string | number>('')
  const [isImperial, setIsImperial] = useState<boolean>(true)

  const fetchWeatherData = useCallback(async (location: string | number) => {
    try {
      setIsLoading(true)
      setErrorMessage(null)
      setWeatherData(null)
      const response = await fetch(`https://weatherapi-com.p.rapidapi.com/current.json?q=${location}`, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_RAPID_REALTIME_WEATHER_API_KEY || '',
          'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
      })
      if (!response.ok) {
        if (response.status === 429) {
          throw new Error(`Error code ${response.status}: Client error. You've exceeded the amount of allowed requests to the Rapid Realtime Weather API. Please wait a bit before trying again.`)
        } else if (response.status.toString().startsWith('4')) {
          throw new Error(`Error code: ${response.status}: Client error. Please ensure your credentials are correct and try again.`)
        } else if (response.status.toString().startsWith('5')) {
          throw new Error(`Error code: ${response.status }: Server error. The Rapid Realtime Weather API is currently unavailable. Please try again later.`)
        } else {
          throw new Error(`Unexpected error occurred. Status code ${response.status}`)
        }
      }

      const data = await response.json()
      setWeatherData(data)
    } catch (e) {
      let errorMessage = 'An unexpected error occurred. Please try again later.'
      if (e instanceof TypeError && e.message === 'Failed to fetch') {
        errorMessage = 'Network error. Please check your internet connection and try again.';
      } else if (e instanceof Error) {
        errorMessage = e.message;
      }
      console.error(errorMessage);
      setErrorMessage(errorMessage)
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
    errorMessage,
    isImperial,
    setIsImperial
  }
}