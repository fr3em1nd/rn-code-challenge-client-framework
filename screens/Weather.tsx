import React, {useState, useEffect} from 'react';
import {StyleSheet, Dimensions} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import {}
const kelvinToFahrenheit = require('kelvin-to-fahrenheit');
const windowWidth = Dimensions.get('window').width;
 
const getCurrentDate = () => {
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();
  return month + '/' +date + '/'   + year; 
};



export default function Weather() {

 //conversion is kelvin
   const [temp, setTemp] = useState('');
 
   const [desc, setDesc] = useState('');
   const [pressure, setPressure] = useState('');
   const [humidity, setHumidity] = useState('');
   const [main, setMain] = useState('');

console.log('window width', windowWidth);

const isLargeGrid = windowWidth>414 ? true: false; // i'll consider devices larger than 414width (iphone 8s) to be large grid

  useEffect(() => {



              //  setTemp(kelvinToFahrenheit(resp.main.temp));
              //  setHumidity(resp.main.humidity);
              //  setPressure(resp.main.pressure);
              //  setDesc(resp.weather[0].description);
              //  setMain(resp.weather[0].main);

 
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Date: {getCurrentDate()} </Text>
      <Text style={styles.title}>Temp: {temp} F </Text>
      {isLargeGrid ? <View  style={styles.containerBig}>
      <Text style={styles.title}>Description: {desc} </Text>
      <Text style={styles.title}>Main: {main} </Text>
      <Text style={styles.title}>Pressure: {pressure} </Text>
      <Text style={styles.title}>Humidity: {humidity} </Text>
      </View>
      : false}
    </View>
  );
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  containerBig: {
 
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
