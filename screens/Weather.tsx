import React, {useState, useEffect} from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import * as Location from 'expo-location';
import {getWeatherApi} from '../api/WeatherApi';
 
 


 


export default function Weather() {

 


  useEffect(() => {
    Location.requestPermissionsAsync().then((status) => {
      console.log('-----testing----');
      if (!status.granted) {
        console.log('permission not granted');
      } else {
        Location.getCurrentPositionAsync().then((loc) => {
            let apiResponse = getWeatherApi({
              longt: loc.coords.longitude,
              lati: loc.coords.latitude,
            });
            apiResponse ? setWeatherData(apiResponse) : false;

        });
      }
    });

 console.log(weatherData);

  }, []);


 
    

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather: </Text>
    </View>
  );
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
