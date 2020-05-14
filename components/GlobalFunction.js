import * as React from 'react';
import {Alert, View,  StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, Picker,Image } from 'react-native';
import { Header, Badge, Icon, withBadge, Tile, Avatar, ListItem, Button  } from 'react-native-elements';
import { TextLoader, DotsLoader } from 'react-native-indicator';
import GlobalSetting from './MyGlobalSetting';

export function getStar(count) {
    const items = [];
    let i = 0;
    while (i < count) {
      i++;
      items.push(
        <View  key={i}>
        <Icon name='star' type='font-awesome' color='#dea21b' size={13} />
        </View>
      );
    }
    return items;
}
export function currencyFormat(num) {
  return 'Rp ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
export function NumberFormat(num) {
  return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export function setMainColor(color) {
  mainColor(color);

}
export function mainColor(color) {
  if(color){
    return color;
  }else{
    return GlobalSetting.mainColor;

  }
}
export  function CustomAlertView(title) {
return (
  <View  style={{alignItems:'center', alignContent:'center',textAlign:'center'}}>
    <Image source={require('../assets/images/user_info.png')} style={{height:200,width:200, marginBottom:20}}/>  
    <Text  style={{   color:'#545454',fontSize:13, fontWeight:'bold',textAlign:'center'}}>{ title } </Text>
</View>
);

}

export function LoaderScreen() {
  return (
    <View style={{flex: 1, padding: 30, marginTop:200,alignItems:'center', alignContent:'center'}}>
      <DotsLoader color={mainColor()} size={15} betweenSpace={15} />
    </View>
  );
}
export function TextLoading() {
  return (
    <View style={{flex: 1, padding: 30,alignItems:'center', alignContent:'center'}}>
       <TextLoader text="Loading" textStyle={{color: mainColor()}}/>
    </View>
  );
}
