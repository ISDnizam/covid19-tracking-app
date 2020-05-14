import React from 'react';
import { Alert } from 'react-native';
import { createAppContainer, createSwitchNavigator,createStackNavigator } from 'react-navigation';
import styles from "../components/Style";
import { Header, Icon } from 'react-native-elements';

import MainTabNavigator from './MainTabNavigator';
import AppNavigator from './MainTabNavigator';
import HomeScreen from '../screens/HomeScreen';
import CountryScreen from '../screens/CountryScreen';
import DetailCountryScreen from '../screens/DetailCountryScreen';
import ChangeColorScreen from '../screens/ChangeColorScreen';
import MapScreen from '../screens/MapScreen';
import MapNasionalScreen from '../screens/MapNasionalScreen';
const AppStack = createStackNavigator({
  App: {
    screen: MainTabNavigator,
    navigationOptions: ({ navigation }) => ({
    header :null,
    }),
  },
  Home: HomeScreen, 
  Country: CountryScreen, 
  DetailCountry: DetailCountryScreen, 
  ChangeColor: ChangeColorScreen, 
  MapCases: MapScreen, 
  MapNasional: MapNasionalScreen, 
  });

export default createAppContainer(
  createSwitchNavigator(
    {
      Main: MainTabNavigator,
      App: AppStack,
    },
    {
      initialRouteName: 'Main',
    }
  )
);