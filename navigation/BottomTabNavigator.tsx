import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import Hello from '../screens/Hello';
import Home from '../screens/Home';
import Weather from '../screens/Weather';
import { BottomTabParamList, HelloParamList, HomeParamList,WeatherParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Hello"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Hello"
        component={HelloNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Weather"
        component={WeatherNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HelloStack = createStackNavigator<HelloParamList>();

function HelloNavigator() {
  return (
    <HelloStack.Navigator>
      <HelloStack.Screen
        name="Hello"
        component={Hello}
        options={{ headerTitle: 'Hello' }}
      />
    </HelloStack.Navigator>
  );
}

const HomeStack = createStackNavigator<HomeParamList>();

function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{ headerTitle: 'Home' }}
      />
    </HomeStack.Navigator>
  );
}

const WeatherStack = createStackNavigator<WeatherParamList>();

function WeatherNavigator() {
  return (
    <WeatherStack.Navigator>
      <WeatherStack.Screen
        name="Weather"
        component={Weather}
        options={{ headerTitle: 'Weather' }}
      />
    </WeatherStack.Navigator>
  );
}
