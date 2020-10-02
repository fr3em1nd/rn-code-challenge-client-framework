import * as React from 'react';
import {
  StyleSheet,
  Platform,
  Alert,
  Button,
  ActivityIndicator,
} from 'react-native';
import { Text, View } from '../components/Themed';
import {Auth0Provider} from '@auth0/auth0-react';
import * as AuthSession from 'expo-auth-session';
import jwtDecode from 'jwt-decode';
import {auth0ClientId, authorizationEndpoint } from '../constants/ApiKeys';
import {storeLoginData, getLoginData, clearData} from '../functions/Storage';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

const useProxy = Platform.select({web: false, default: true});
const redirectUri = AuthSession.makeRedirectUri({useProxy});

interface AUTHRESP {
  name: string;
  nickname: string;
}

export default function Hello({navigation}: StackScreenProps<RootStackParamList, 'NotFound'>) {

   const [name, setName] = React.useState<String>('');
   const [request, result, promptAsync] = AuthSession.useAuthRequest(
     {
       redirectUri,
       clientId: auth0ClientId,
       responseType: 'id_token',
       scopes: ['openid', 'profile'],
       extraParams: {
         nonce: 'nonce',
       },
     },
     {authorizationEndpoint}
   );
  React.useEffect(() => {
    const checkLogin = async () => await getLoginData();
    checkLogin().then((loginData) => {
      console.log("loginData",loginData);
      setName(loginData?.name);
    });
  }, [result]);

  React.useEffect(() => {
    if (result) {
      if (result.type === 'success') {
        // Retrieve the JWT token and decode it
        const jwtToken = result.params.id_token;
        const decoded = jwtDecode<AUTHRESP>(jwtToken);
      //  console.log(decoded);
       storeLoginData(decoded);
         setName(decoded?.name);

         navigation.replace('Root');
      }else{
           Alert.alert(
             'Authentication error',
            'something went wrong'
           );
           return;
      }
    }
  }, [result]);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello, World!</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <View style={styles.subContainer}>
        {name ? (
          <View style={styles.subContainer}>
            <Text style={styles.title}>You are logged as {name}</Text>
            <Button
              title="Logout"
              onPress={() =>
                clearData().then(() => {
                  setName('');
                   navigation.replace('Root');
                })
              }
            />
          </View>
        ) : (
          <Button
            disabled={!request}
            title="Login using Auth0"
            onPress={() => promptAsync({useProxy})}
          />
        )}
      </View>
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
});
