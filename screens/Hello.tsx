import * as React from 'react';
import {StyleSheet, Platform, Alert, Button} from 'react-native';

 
import { Text, View } from '../components/Themed';
import {Auth0Provider} from '@auth0/auth0-react';
 
import * as AuthSession from 'expo-auth-session';
import jwtDecode from 'jwt-decode';

const auth0ClientId = 'uAB4inH4WISz2uMxIsBvd6yFNxoXBwlX';
const authorizationEndpoint = 'https://dev-9757j7km.us.auth0.com/authorize';

const useProxy = Platform.select({web: false, default: true});
const redirectUri = AuthSession.makeRedirectUri({useProxy});


import {storeLoginData, getLoginData} from '../functions/Storage';



export default function Hello() {

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
  console.log(`Redirect URL: ${redirectUri}`);


  React.useEffect(() => {
    const checkLoginData = async () => await getLoginData();
    checkLoginData().then((loginData)=>{
      setName(loginData.name);
    })
    
 

  }, []);


  React.useEffect(() => {
    if (result) {
      if (result.type === 'success') {
        // Retrieve the JWT token and decode it
        const jwtToken = result.params.id_token;
        const decoded = jwtDecode(jwtToken);
       console.log(decoded);
       storeLoginData(decoded);
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
      <Text style={styles.title}>Hello</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <View style={styles.container}>
        {name ? (
          <Text style={styles.title}>You are logged in! {name}</Text>
        ) : (
          <Button
            disabled={!request}
            title="Loging using Auth0"
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
