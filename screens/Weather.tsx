import React, {useState, useEffect} from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import * as Location from 'expo-location';

 
interface IUser {
  longt: number;
  lati: number;
}

export default function Weather() {
  //https://home.openweathermap.org/api_keys  weather API key 2e95d43863a52772701c6560c248bbc3

  const [userLoc, setUserLoc] = useState<IUser>({longt: 0, lati: 0});

  useEffect(() => {
    Location.requestPermissionsAsync().then((status) => {
      console.log('-----testing----');
      if (!status.granted) {
        console.log('permission not granted');
      } else {
        Location.getCurrentPositionAsync().then((loc) => {
          setUserLoc({longt: loc.coords.longitude, lati: loc.coords.latitude});

          console.log(userLoc);
        });
      }
    });
  }, [userLoc]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather</Text>
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
