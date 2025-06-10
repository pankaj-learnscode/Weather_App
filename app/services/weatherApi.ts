import axios from 'axios';

   const API_KEY = '46a9246bebba16d42b36aac3fc3ba8af'; // Replace with your API key
   const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

   export const getWeatherByCity = async (city: string) => {
     try {
       const response = await axios.get(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
       return response.data;
     } catch (error) {
       throw new Error('Failed to fetch weather data');
     }
   };

   export const getWeatherByLocation = async (lat: number, lon: number) => {
     try {
       const response = await axios.get(`${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
       return response.data;
     } catch (error) {
       throw new Error('Failed to fetch weather data');
     }
   };