import React, { Fragment } from 'react';
import { Alert, TouchableHighlight, Platform,AsyncStorage,FlatList, ScrollView, Dimensions,
   SafeAreaView, StatusBar, Button, View, Text,StyleSheet,TouchableWithoutFeedback,TouchableOpacity,ImageBackground,ActivityIndicator,Image } from 'react-native';
import { createAppContainer,createDrawerNavigator,withNavigation  } from 'react-navigation';
import {  Icon } from 'react-native-elements';
import styles from "../components/Style";
import { Linking } from 'expo';
import { mainColor }  from '../components/GlobalFunction';

const stylesDef = StyleSheet.create({
    image: {
      width :175,
      marginRight :7,
      marginLeft :2,
      marginTop :5,
      padding: 20,
  
  
    },
    card: {
      backgroundColor: '#ffffff',
      padding: 20,
      borderRadius: 5,
      shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,  
        elevation: 1,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom :10,
      height:175
    },
    cardHeaderHome2: {
      backgroundColor: '#ffffff',
      padding: 15,
      borderRadius: 10,
      shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 3,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom :0,
      marginLeft:30,
      height:170
    },
  });
  
class Menu extends React.Component {
    constructor(props){
      super(props);
    }

    _openWA = () => {
      Linking.openURL('https://wa.me/+62856-9664-0323');
    };
    render() {
      const { navigation } =this.props;
    
        return (
        <TouchableOpacity    onPress={() => navigation.push(this.props.name)}> 
        <View    style={[stylesDef.cardHeaderHome2,stylesDef.image]}>
            <View style={{flex: 1, flexDirection: 'column'}}>
                <Icon
                    name={this.props.icon}
                    type='font-awesome'
                    size={40}
                    color={mainColor()} 
                    containerStyle={{marginLeft:2}} />
                <Text  style={[styles.tabBarInfoText, styles.textGray,{fontWeight:'bold', textAlign:'center',fontSize:14, marginTop:10}]}>
                {this.props.name}
                </Text>
            </View>
        </View>
      </TouchableOpacity>
      );
    }
  }
  export default withNavigation(Menu);