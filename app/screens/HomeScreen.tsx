import React, { useState, useEffect } from 'react';
import { View, TextInput, Alert, Platform, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import WeatherDisplay from '../components/WeatherDisplay';
import { getWeatherByCity, getWeatherByLocation } from '../services/weatherApi';
import { WeatherData } from '../components/types/weather';

const HomeScreen: React.FC = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);

  const fetchWeatherByCity = async () => {
    if (!city.trim()) {
      Alert.alert('Error', 'Please enter a city name');
      return;
    }
    try {
      const data = await getWeatherByCity(city);
      setWeather(data);
    } catch {
      Alert.alert('Error', 'Could not fetch weather data');
    }
  };

  const fetchWeatherByLocation = () => {
    if (Platform.OS === 'web') {
      navigator.geolocation.getCurrentPosition(
        async ({ coords }) => {
          const data = await getWeatherByLocation(coords.latitude, coords.longitude);
          setWeather(data);
        },
        () => Alert.alert('Error', 'Location access denied'),
        { enableHighAccuracy: true, timeout: 20000 }
      );
    } else {
      Geolocation.getCurrentPosition(
        async ({ coords }) => {
          const data = await getWeatherByLocation(coords.latitude, coords.longitude);
          setWeather(data);
        },
        () => Alert.alert('Error', 'Location access denied'),
        { enableHighAccuracy: true, timeout: 20000 }
      );
    }
  };

  useEffect(() => {
    if (Platform.OS !== 'web') Geolocation.requestAuthorization();
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        value={city}
        onChangeText={setCity}
      />
      <TouchableOpacity style={styles.iconButton} onPress={fetchWeatherByCity}>
        <MaterialCommunityIcons name="magnify" size={24} color="#fff" />
        <Text style={styles.buttonText}>Search City</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconButtonSecondary} onPress={fetchWeatherByLocation}>
        <MaterialCommunityIcons name="crosshairs-gps" size={24} color="#fff" />
        <Text style={styles.buttonText}>Use My Location</Text>
      </TouchableOpacity>

      <WeatherDisplay weather={weather} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e0f7fa',
  },
  input: {
    height: 45,
    borderColor: '#00796b',
    borderWidth: 1.5,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    backgroundColor: '#ffffff',
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0288d1',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    justifyContent: 'center',
    gap: 10,
  },
  iconButtonSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#26a69a',
    padding: 14,
    borderRadius: 10,
    marginBottom: 20,
    justifyContent: 'center',
    gap: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default HomeScreen;
