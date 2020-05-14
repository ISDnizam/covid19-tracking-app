import React, { Component } from 'react';
import {
  ActivityIndicator,Platform, Alert, Dimensions,View,  StyleSheet, Text, TextInput, TouchableOpacity, ScrollView,Picker,  AsyncStorage } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MyGlobalSetting from '../components/MyGlobalSetting';
import styles from "../components/Style";
import { Header, Badge, Icon, withBadge, Tile,Divider, Avatar, ListItem, Button, Card, Image  } from 'react-native-elements';
import { InfiniteListView } from "react-native-infinite-listview";
import RBSheet from "react-native-raw-bottom-sheet";
import { DatePicker, Form } from 'react-native-form-idable';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Chevron from '../components/Chevron';
import { LoaderScreen,mainColor,currencyFormat,NumberFormat,TextLoading,CustomAlertView }  from '../components/GlobalFunction';
import { Marker } from 'react-native-maps';
import MapView  from 'react-native-maps';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import AwesomeAlert from 'react-native-awesome-alerts';


const { width,height } = Dimensions.get('window');
console.disableYellowBox = true;

class App extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      isRefreshing: false,
      isLoadingMore: false,
      dataSource:'',
      mapsCase:'',
      current_lat: -7.150975,
      current_lng:  110.140259,
      lngDelta: 22.68,
      latDelta: 22.68,
      location: '',
      showAlert:false,
      textAlert:''

    }
  }
  static navigationOptions= ({navigation}) => {
    const {params = {}} = navigation.state;
    return {
    headerTitle: (
        <View>
        <Text style={{fontWeight:'bold', color:'white', fontSize:20}}>Affected Location</Text>
        </View>
    ),
    headerRight: (
        <View style={{marginTop:2,padding:15,marginRight:5}}>
        <Icon  type="ionicon"  size={27} color='#ffffff' name="md-bookmark" />
      </View>
    ),
    headerTitleStyle : {textAlign: 'center',alignSelf:'center'},

     headerStyle: {
      elevation : 0,
    backgroundColor: params.mainColor,
    },
    headerTintColor: '#fff',
    }
  };

  getTotal() {
    var countryCode =this.props.navigation.getParam('countryCode', '');
    console.log(countryCode);
    this.setState({
        isLoading: true,
      });
    const { navigation } =this.props;
    var  apiUrl= 'https://corona.lmao.ninja/v2/countries/Indonesia';
    return fetch(apiUrl)
     .then((response) => response.json())
     .then((responseJson) => {
       this.setState({
         isLoading: false,
         case: responseJson,
       }, function(){
       });

     })
     .catch((error) =>{
       console.error(error);
     });
   }
  getList() {
    const { navigation } =this.props;
    var  apiUrl=  'https://api.kawalcorona.com/indonesia/provinsi/';
    return fetch(apiUrl)
     .then((response) => response.json())
     .then((responseJson) => {
       this.setState({
         dataSource: responseJson,
         IdBgColor: '#1c91a3',
         IdTextColor: '#ffffff',

         GlobalBgColor: '#ffffff',
         GlobalTextColor: mainColor(),

         NearbyBgColor: '#ffffff',
         NearbyTextColor: mainColor(),

         lngDelta: 22.68,
         latDelta: 22.68,
       }, function(){
       });

     })
     .catch((error) =>{
       console.error(error);
     });
   }
   
   getGlobalMap(action) {
    if(action=='Indonesia'){
        this.setState({
            IdBgColor: '#1c91a3',
            IdTextColor: '#ffffff',
  
            GlobalBgColor: '#ffffff',
            GlobalTextColor: mainColor(),
  
            NearbyBgColor: '#ffffff',
            NearbyTextColor: mainColor(),

            lngDelta: 22.68,
            latDelta: 22.68,
        });
    var uri ='http://nizam.id/api2/covid_nasional';
    }else if(action=='Global'){
        this.setState({
            GlobalBgColor: '#1c91a3',
            GlobalTextColor: '#ffffff',
  
            IdBgColor: '#ffffff',
            IdTextColor: mainColor(),
  
            NearbyBgColor: '#ffffff',
            NearbyTextColor: mainColor(),

            lngDelta: 72.68,
            latDelta: 72.68,
        });
    var uri ='http://nizam.id/api2/covid_country_map';
    }else if(action=='Nearby'){
        this.setState({
            NearbyBgColor: '#1c91a3',
            NearbyTextColor: '#ffffff',
  
            IdBgColor: '#ffffff',
            IdTextColor: mainColor(),
  
            GlobalBgColor: '#ffffff',
            GlobalTextColor: mainColor(),
            
            lngDelta: 5.68,
            latDelta: 5.68,
        });
    var uri ='http://nizam.id/api2/covid_provinsi_map?offset=3&lat_at='+this.state.current_lat+'&lng_at='+this.state.current_lng;
    }
    return fetch(uri)
    .then((response) => response.json())
    .then((responseJson) => {
   
      this.setState({
        mapsCase: responseJson,
      }, function(){
      });

    })
    .catch((error) =>{
      console.error(error);
    });
  }
  
  hideAlert = () => {
    this.setState({
      showAlert: false,
    });
  };
 
  setAction(action){
    if(action=='Nearby'){
        if(this.state.location==''){
            this.setState({
                showAlert: true,
                textAlert: 'Please turn on your location on this device'
            });
        }else{
            this.setState({
                showAlert: true,
                textAlert: "Because data is limited. We can't display the latest data"
            });
            this.getGlobalMap(action);
        }
    }else{
        this.getGlobalMap(action);
    }

  }
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
    let location = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.High});
    this.setState({ location });
    if(location){
        this.setState({ current_lat: location.coords.latitude,current_lng: location.coords.longitude });
        this.getGlobalMap('Indonesia');
    }else{
      this.getGlobalMap('Indonesia');
    }
    console.log(this.state.location);
  };
  componentDidMount(){
    this.getTotal();
    this._getLocationAsync();
    this.props.navigation.setParams({mainColor: mainColor()});
  }

renderHeader() {
  const { onFocus, onBlur, otherProps, navigation } =this.props;
  return (

  <View>
       <View style={{flexGrow: 1, flexDirection:'row',backgroundColor: mainColor(), padding: 14,marginTop:-10, justifyContent:'center'}}>
        {/* <Button
          title={"Cases : "+ NumberFormat(this.state.case.cases)}
          buttonStyle={{borderRadius:7,backgroundColor:'#fff'}}
          containerStyle={{marginRight :8}}
          titleStyle={{color:mainColor(),fontSize:11}}
        />
       
       <Button
          title={"Recovered : "+ NumberFormat(this.state.case.recovered)}
          buttonStyle={{borderRadius:7,backgroundColor:'#fff'}}
          containerStyle={{marginRight :8}}
          titleStyle={{color:'#1d8212',fontSize:11}}
        />
         <Button
          title={"Deaths : "+ NumberFormat(this.state.case.deaths)}
          buttonStyle={{borderRadius:7,backgroundColor:'#fff'}}
          containerStyle={{marginRight :8}}
          titleStyle={{color:'red',fontSize:11}}
        />
         */}
       
       <Button
          title={"Global Cases"}
          buttonStyle={{borderRadius:7,backgroundColor:this.state.GlobalBgColor}}
          containerStyle={{marginRight :8}}
          onPress={() => this.setAction('Global')}
          titleStyle={{color:this.state.GlobalTextColor,fontSize:11}}
        />
        <Button
          title={"Indonesia"}
          buttonStyle={{borderRadius:7,backgroundColor:this.state.IdBgColor}}
          containerStyle={{marginRight :8}}
          onPress={() => this.setAction('Indonesia')}
          titleStyle={{color:this.state.IdTextColor,fontSize:11}}
        />
       
         <Button
          title={"Nearby Location"}
          buttonStyle={{borderRadius:7,backgroundColor:this.state.NearbyBgColor}}
          containerStyle={{marginRight :8}}
          onPress={() => this.setAction('Nearby')}
          titleStyle={{color:this.state.NearbyTextColor,fontSize:11}}
        />
        
      </View>
  </View>
  )
}

renderGlobalMap(){
    return(
      <View>
      <View style={{flex:1, flexDirectio:'row'}}>
        <View style={{justifyContent:'center',textAlign:'center'}}>
        {this.state.mapsCase ?      <MapView style={styles.mapStyle}  region={{
    latitude: this.state.current_lat,
    longitude: this.state.current_lng,
    latitudeDelta: this.state.latDelta,
    longitudeDelta: this.state.lngDelta,
  }} 
  loadingEnabled={true}
 > 
  <Marker
  coordinate={{latitude:this.state.current_lat, longitude: this.state.current_lng}}
  title={'Your Location'}
  description={''}
  pinColor={mainColor()}
/>
  {this.state.mapsCase.map(marker => (
      marker.distance ?  <Marker
      coordinate={{latitude:marker.center.lat, longitude: marker.center.lng}}
      title={marker.provinsi}
      description={'Distance :'+ marker.distance +'km | Cases :'+ marker.positif +' Recovered :'+ marker.sembuh +' Deaths :'+ marker.meninggal}
    />:  <Marker
    coordinate={{latitude:marker.center.lat, longitude: marker.center.lng}}
    title={marker.provinsi}
    description={'Cases :'+ marker.positif +' Recovered :'+ marker.sembuh +' Deaths :'+ marker.meninggal}
  />
 
))}
</MapView>
  
: <TextLoading/> }
        </View>
      </View>
      </View>
    )
  }

  render() {
    const { onFocus, onBlur, otherProps, navigation } =this.props;
    if(this.state.isLoading){
      return(
        <LoaderScreen />
      )
    }
  
    return (
    <View style={styles.container}>
      <ScrollView>
    {this.renderHeader()}
    {this.renderGlobalMap()}

    <AwesomeAlert
            show={this.state.showAlert}
            alertContainerStyle={{zIndex:9999,  height:Dimensions.get('window').height-150}}
            overlayStyle={{ flex: 1,
              position: 'absolute',
              opacity: 0.8,
              backgroundColor: 'black'}}
            contentContainerStyle={{width:300}}
            showProgress={false}
            customView={CustomAlertView(this.state.textAlert)}
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={true}
            showCancelButton={false}
            showConfirmButton={true}
            confirmText={'Confirm '}
            confirmButtonColor={mainColor()}
            onConfirmPressed={() => {
              this.hideAlert();
            }}
          />
    </ScrollView>
    </View>
    )
  }
}


export default App;  
