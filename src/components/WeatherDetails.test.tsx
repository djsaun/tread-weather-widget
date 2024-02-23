import { render, screen } from '@testing-library/react';
import { WeatherDetails } from './WeatherDetails';

describe('WeatherDetails', () => {
  const mockWeatherData = {
    current: {
      cloud: 10,
      condition: { code: 100, icon: '', text: 'Clear' },
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

  it('should render weather details correctly with metric units', () => {
    render(
      <WeatherDetails weatherData={mockWeatherData} isImperial={false} />
    );

    expect(screen.getByText('0°C')).toBeInTheDocument();
    expect(screen.getByText('-1°C')).toBeInTheDocument();
    expect(screen.getByText('16 kph NE')).toBeInTheDocument();
    expect(screen.getByText('2.5 mm')).toBeInTheDocument();
  });

  it('should render weather details correctly with imperial units', () => {
    render(
      <WeatherDetails weatherData={mockWeatherData} isImperial={true} />
    );

    expect(screen.getByText('32°F')).toBeInTheDocument();
    expect(screen.getByText('30°F')).toBeInTheDocument();
    expect(screen.getByText('10 mph NE')).toBeInTheDocument();
    expect(screen.getByText('0.1 in')).toBeInTheDocument();
  });
});