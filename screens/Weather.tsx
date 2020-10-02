import { StackScreenProps } from '@react-navigation/stack';
import React, {useState, useEffect} from 'react';
import {StyleSheet, Dimensions, ActivityIndicator, TouchableOpacity} from 'react-native';
import { Text, View } from '../components/Themed';
import {getCurrentDate, getWeather} from '../functions/Common';
import { RootStackParamList } from '../types';
import {getLoginData} from '../functions/Storage';
const windowWidth = Dimensions.get('window').width;
 
export default function Weather({
  navigation,
}: StackScreenProps<RootStackParamList, 'NotFound'>) {
  // to be very sure of the data since the API might time out, we'll cherrypick the data.
  const [temp, setTemp] = useState<String>('');
  const [desc, setDesc] = useState<String>('');
  const [pressure, setPressure] = useState<String>('');
  const [humidity, setHumidity] = useState<String>('');
  const [main, setMain] = useState<String>('');
  const [fetching, setFetching] = useState<boolean>(true);
  const [loggedin, setLoggedin] = React.useState<boolean>(false);
  const isLargeGrid = windowWidth > 414 ? true : false; // i'll consider devices larger than 414width (iphone 8s) to be large grid
  // const isLargeGrid = true;
  useEffect(() => {

        const checkLogin = async () => await getLoginData();
            const weatherLookup = () => getWeather();
        checkLogin().then((loginData) => {
          if (loginData) {
  
            setLoggedin(true);
          }
        });



    weatherLookup().then((weatherData) => {
      setTemp(weatherData?.temp);
      setHumidity(weatherData?.humidity);
      setPressure(weatherData?.pressure);
      setDesc(weatherData?.weather);
      setMain(weatherData?.main);
      setFetching(false);
    });
  }, []);



 

  if (!!!loggedin) {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.replace('Root')}
          style={styles.link}
        >
          <Text style={styles.linkText}>
            You need to login to access this page
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

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
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});

