import React from 'react';
import {  Button, View, Text,StyleSheet,TouchableOpacity } from 'react-native';
import FaIcon from '@expo/vector-icons/FontAwesome';
import styles from "../components/Style";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import ChangeColorScreen from '../screens/ChangeColorScreen';
import { Icon } from 'react-native-elements'

  const Chevron = ({navigation}) => (
      
    <TouchableOpacity
    activeOpacity={0.7}
    onPress={() => this.props.navigation.push('ChangeColor')}
    style={styles.TouchableOpacityStyle}>
      <View style={styles.FloatingButtonStyle}>
      <Icon
    name="colours"
    type="entypo"
    color='#000000'
    containerStyle={{  width: 20 }}
  />
    </View>
    </TouchableOpacity>
  )
  
  export default Chevron