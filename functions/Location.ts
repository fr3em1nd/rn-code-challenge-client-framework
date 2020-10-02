import * as Location from 'expo-location';

import {getWeatherApi} from '../api/WeatherApi';
const kelvinToFahrenheit = require('kelvin-to-fahrenheit');

export const getWeather =() => {
    return Location.requestPermissionsAsync().then((status) => {
      if (!status.granted) {
        console.log('permission not granted');
      } else {
       return  Location.getCurrentPositionAsync().then((loc) => {
          const apiResponse = async () =>
            await getWeatherApi({
              longt: loc.coords.longitude,
              lati: loc.coords.latitude,
            });
         return apiResponse().then((resp) => {
            //cherry picking the data from the API to make sure.
            return {
                    temp: (kelvinToFahrenheit(resp.main.temp)),
                    humidity: resp.main.humidity,
                    pressure: resp.main.pressure,
                    weather: resp.weather[0].description,
                    main: resp.weather[0].main
            }
          });
        });
      }
    });

}