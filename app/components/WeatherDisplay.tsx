import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { WeatherData } from './types/weather';

interface WeatherDisplayProps {
  weather: WeatherData | null;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weather }) => {
  if (!weather) {
    return (
      <View style={styles.container}>
        <Text style={styles.noData}>No weather data available</Text>
      </View>
    );
  }

  // Get dynamic icon based on weather condition
  const getIconName = (desc: string) => {
    const d = desc.toLowerCase();
    if (d.includes('rain')) return 'weather-rainy';
    if (d.includes('cloud')) return 'weather-cloudy';
    if (d.includes('clear')) return 'weather-sunny';
    if (d.includes('snow')) return 'weather-snowy';
    if (d.includes('storm')) return 'weather-lightning';
    return 'weather-partly-cloudy';
  };

  const iconName = getIconName(weather.weather[0].description);

  return (
    <View style={styles.container}>
      <Text style={styles.city}>{weather.name}, {weather.sys.country}</Text>

      <MaterialCommunityIcons name={iconName} size={72} color="#2196f3" />

      <Text style={styles.temp}>{weather.main.temp}°C</Text>

      <Text style={styles.condition}>
        {weather.weather[0].description}
      </Text>

      <View style={styles.row}>
        <MaterialCommunityIcons name="water-percent" size={24} color="#0097a7" />
        <Text style={styles.label}>Humidity: {weather.main.humidity}%</Text>
      </View>

      <View style={styles.row}>
        <MaterialCommunityIcons name="weather-windy" size={24} color="#4fc3f7" />
        <Text style={styles.label}>Wind: {weather.wind.speed} m/s</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  city: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  temp: {
    fontSize: 48,
    color: '#f44336',
    fontWeight: 'bold',
    marginVertical: 8,
  },
  condition: {
    fontSize: 18,
    fontStyle: 'italic',
    textTransform: 'capitalize',
    color: '#555',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  label: {
    fontSize: 16,
    marginLeft: 10,
    color: '#444',
  },
  noData: {
    fontSize: 16,
    color: '#aaa',
  },
});

export default WeatherDisplay;
