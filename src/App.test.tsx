import React from 'react';
import {render, screen} from '@testing-library/react';
import {useWeatherData} from './hooks/useWeatherData';
import App from './App';

jest.mock('./hooks/useWeatherData');
const mockedUseWeatherData = jest.mocked(useWeatherData)

export const mockWeatherData = {
  current: {
    cloud: 10,
    condition: {code: 100, icon: '', text: 'Clear'},
    feelslike_c: -1,
    feelslike_f: 30,
    humidity: 20,
    last_updated: '2024-02-23 12:00',
    precip_in: 0.1,
    precip_mm: 2.5,
    temp_c: 0,
    temp_f: 32,
    wind_mph: 10,
    wind_kph: 16,
    wind_dir: 'NE',
  },
  location: {
    country: 'United States of America',
    lat: 100,
    localtime: '2024-02-23 12:00',
    lon: 300,
    name: 'Chicago',
    region: 'Illinois',
    tz_id: 'America/Chicago'
  }
};

describe('App component', () => {
  const loadingText = 'Loading...'
  const errorMessage = 'Test error message';
  const weatherLocation = 'Chicago, Illinois'

  beforeEach(() => {
    mockedUseWeatherData.mockReturnValue({
      fetchWeatherData: jest.fn(),
      weatherData: null,
      location: '',
      setLocation: jest.fn(),
      isLoading: false,
      errorMessage: null,
      isImperial: true,
      setIsImperial: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders a loading message when isLoading is true', () => {
    mockedUseWeatherData.mockReturnValueOnce({
      ...useWeatherData(),
      isLoading: true,
    });

    render(<App/>);

    expect(screen.getByText(loadingText)).toBeInTheDocument();
    expect(screen.queryByText(errorMessage)).not.toBeInTheDocument()
    expect(screen.queryByText(weatherLocation)).not.toBeInTheDocument()
  });

  it('renders an error message when errorMessage is present', () => {
    mockedUseWeatherData.mockReturnValueOnce({
      ...useWeatherData(),
      errorMessage,
    });

    render(<App/>);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.queryByText(loadingText)).not.toBeInTheDocument()
    expect(screen.queryByText(weatherLocation)).not.toBeInTheDocument()
  });

  it('renders weather details when weatherData is present', () => {
    mockedUseWeatherData.mockReturnValueOnce({
      ...useWeatherData(),
      weatherData: mockWeatherData,
    });

    render(<App/>);

    expect(screen.getByText('Chicago, Illinois')).toBeInTheDocument();
    expect(screen.queryByText(loadingText)).not.toBeInTheDocument()
    expect(screen.queryByText(errorMessage)).not.toBeInTheDocument()
  });
});