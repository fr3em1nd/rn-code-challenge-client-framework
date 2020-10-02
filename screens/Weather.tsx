import React, {useState, useEffect} from 'react';
import {StyleSheet, Dimensions, ActivityIndicator} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import {getWeather} from '../functions/Location';
import {getCurrentDate} from '../functions/Common';

const windowWidth = Dimensions.get('window').width;
 
export default function Weather() {
    const [temp, setTemp] = useState<String>('');
    const [desc, setDesc] = useState<String>('');
    const [pressure, setPressure] = useState<String>('');
    const [humidity, setHumidity] = useState<String>('');
    const [main, setMain] = useState<String>('');
    const [fetching, setFetching] = useState<boolean>(true);

    const isLargeGrid = windowWidth>414 ? true: false; // i'll consider devices larger than 414width (iphone 8s) to be large grid
  useEffect(() => {
      const weatherLookup =()=> getWeather();
      weatherLookup().then((weatherData) => {
        setTemp(weatherData?.temp);
        setHumidity(weatherData?.humidity);
        setPressure(weatherData?.pressure);
        setDesc(weatherData?.weather);
        setMain(weatherData?.main);
        setFetching(false);
      });
  }, []);
  return (
    <View style={styles.container}>
      {fetching ? (
        <View style={styles.containerAesthetics}>
          <Text style={styles.title}>Fetching Weather data...</Text>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      ) : (
        <View style={styles.containerAesthetics}>
          <Text style={styles.title}>Date: {getCurrentDate()} </Text>
          <Text style={styles.title}>Temp(Farenheit): {temp} </Text>

          {isLargeGrid ? (
            <View style={styles.containerBig}>
              <Text style={styles.title}>Description: {desc} </Text>
              <Text style={styles.title}>Main: {main} </Text>
              <Text style={styles.title}>Pressure: {pressure} </Text>
              <Text style={styles.title}>Humidity: {humidity} </Text>
            </View>
          ) : (
            false
          )}
        </View>
      )}
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

  containerAesthetics: {
 
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
