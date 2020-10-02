import React, {useState, useEffect} from 'react';
import {Button, StyleSheet, ActivityIndicator, TouchableOpacity} from 'react-native';
 
import { Text, View } from '../components/Themed';
import { getLoginData} from '../functions/Storage';

import {getLocation} from '../functions/Common';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
 

export default function Home({navigation}: StackScreenProps<RootStackParamList, 'NotFound'>) {
  const [name, setName] = React.useState<String>('');
  const [loggedin, setLoggedin] = React.useState<boolean>(false);
  const [longtitude, setLongtitude] = React.useState<Number>();
  const [latitude, setLatitude] = React.useState<Number>();
  const [fetching, setFetching] = useState<boolean>(false);


  React.useEffect(() => {
    const checkLogin = async () => await getLoginData();

    checkLogin().then((loginData) => {
      if (loginData) {
        setName(loginData.name);
        setLoggedin(true);
      }
    });
  }, [navigation.pop]);

  if(!!!loggedin){
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


      
      <Text style={styles.title}>Welcome {name}!</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      <Button
        title="Display Longtitude & Latitude"
        onPress={() => {
          setFetching(true);
          getLocation().then((location) => {
            setLongtitude(location?.longt);
            setLatitude(location?.lati);
            setFetching(false);
          });
        }}
      />

      {fetching ? (
        <View style={styles.subContainer}>
          <Text style={styles.title}>Fetching Location...</Text>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      ) : (
        false
      )}
      {longtitude && latitude ? (
        <View style={styles.subContainer}>
          <Text style={styles.title}>
            Longtitude: {'\n'}
            {longtitude}
          </Text>
          <Text style={styles.title}>
            Latitude: {'\n'}
            {latitude}
          </Text>
        </View>
      ) : (
        false
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
  subContainer: {
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
