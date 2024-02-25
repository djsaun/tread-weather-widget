import {render, screen} from '@testing-library/react';
import {WeatherDetails} from './WeatherDetails';
import {mockWeatherData} from '../App.test'

describe('WeatherDetails', () => {
  it('should render weather details correctly with metric units', () => {
    render(
      <WeatherDetails weatherData={mockWeatherData} isImperial={false}/>
    );

    expect(screen.getByText('0°C')).toBeInTheDocument();
    expect(screen.getByText('-1°C')).toBeInTheDocument();
    expect(screen.getByText('16 kph NE')).toBeInTheDocument();
    expect(screen.getByText('2.5 mm')).toBeInTheDocument();
  });

  it('should render weather details correctly with imperial units', () => {
    render(
      <WeatherDetails weatherData={mockWeatherData} isImperial={true}/>
    );

    expect(screen.getByText('32°F')).toBeInTheDocument();
    expect(screen.getByText('30°F')).toBeInTheDocument();
    expect(screen.getByText('10 mph NE')).toBeInTheDocument();
    expect(screen.getByText('0.1 in')).toBeInTheDocument();
  });
});