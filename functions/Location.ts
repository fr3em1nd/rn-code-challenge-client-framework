import * as Location from 'expo-location';

import {getWeatherApi} from '../api/WeatherApi';

export const getWeather =() => {
    Location.requestPermissionsAsync().then((status) => {
      console.log('-----testing----');
      if (!status.granted) {
        console.log('permission not granted');
      } else {
        Location.getCurrentPositionAsync().then((loc) => {
          const apiResponse = async () =>
            await getWeatherApi({
              longt: loc.coords.longitude,
              lati: loc.coords.latitude,
            });
          apiResponse().then((resp) => {
            //cherry picking the data from the API to make sure.
          });
        });
      }
    });

}