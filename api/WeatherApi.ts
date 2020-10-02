// api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
//https://home.openweathermap.org/api_keys  weather API key 2e95d43863a52772701c6560c248bbc3



import {WEATHER_API_KEY, WEATHER_ENDPOINT} from '../constants/ApiKeys';


 interface DATALOOKUP {
   longt: number;
   lati: number;
 }

 
export const getWeatherApi = (apiDataLookup:DATALOOKUP) => {
     return fetch(
        WEATHER_ENDPOINT +
      'lon=' +
      apiDataLookup.longt +
      '&lat=' +
      apiDataLookup.lati +
      '&appid=' +
      WEATHER_API_KEY
      )
        .then((response) => response.json())
        .then((json) => {
            return json;
        })
        .catch((error) => console.error(error));

};