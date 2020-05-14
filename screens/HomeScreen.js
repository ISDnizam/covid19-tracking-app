import React, { Fragment } from 'react';
import { Alert, TouchableHighlight, Platform,AsyncStorage,FlatList, ScrollView, Dimensions,
   SafeAreaView, StatusBar, Button, View, Text,StyleSheet,TouchableWithoutFeedback,TouchableOpacity,ImageBackground,ActivityIndicator,Image } from 'react-native';
import { createAppContainer,createDrawerNavigator,withNavigation  } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Header, Badge, Icon, withBadge, Tile, Avatar, ListItem,Divider  } from 'react-native-elements';
import styles from "../components/Style";
import StickyButton from "../components/StickyButton";
import MyGlobalSetting from '../components/MyGlobalSetting';
import { LoaderScreen,mainColor,currencyFormat,NumberFormat,TextLoading }  from '../components/GlobalFunction';
import Chevron from '../components/Chevron';
import PureChart from 'react-native-pure-chart';
import { Notifications  } from 'expo';
import * as Permissions from 'expo-permissions';
// import MapView from 'react-native-map-clustering';

import { Marker } from 'react-native-maps';
import MapView  from 'react-native-maps';

console.disableYellowBox = true;
const { width } = Dimensions.get('window');
const height = width * 0.8;
class HomeScreen extends React.Component {
  static navigationOptions= ({navigation}) => {
    const {params = {}} = navigation.state;
    return {
    headerTitle: (
      <Image source={require('../assets/images/logo-title.png')} style={{width:169,height:39,marginLeft:10}}/>
    ),
     headerLeft: null,
    headerRight: (
      <View style={styles.iconContainer}>
        <Icon  containerStyle={{marginLeft:65}}  onPress={() => alert('Under Development !')}  type="ionicon" color='#ffffff' name={Platform.OS === "ios" ? "ios-more" : "md-more"} />
      </View>
    ),
     headerStyle: {
      elevation : 0,
    backgroundColor: params.mainColor,
    },
    headerTintColor: '#fff',
    }
  };
  constructor(props){
    AsyncStorage.getItem('country', (error, result) => {
      if (result) {
         let resultParsed = JSON.parse(result)
         this.setState({
            countryName: resultParsed.countryName,
            countryCode: resultParsed.countryCode,
          });
          this.getData();
      }else{
        this.getData();
      }
    });
    super(props);
    this.state ={ 
      isLoading: true,
      isLoadingCases: true,
      isLoadingCasesProvince: true,
      isLoadingRecoveredDeath: true,
      vs : '',
      countryName : 'Indonesia',
      countryCode : 'ID',
      confirmed : '',
      provinceConfirmed : '',
      death : '',
      recovered : '',
      provinceDeath:'',
      mapsCase:'',
      isAuthenticated :false,
    }
  }
  _handleNotification = notification => {
    // do whatever you want to do with the notification
    // this.setState({ notification: notification });
    console.log(notification);
    if(notification){
      this.props.navigation.push(notification.data.redirect);
    }
  };
async saveExpoToken(){ 
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  let token = await Notifications.getExpoPushTokenAsync();
  fetch('http://api.nizam.id/api/v1/auth/save_expo', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization' : 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImQwNWRlMGJmODJlZWQwMGFkMTJjNTY3MzJhNWU1YThmMjYyNWNmZTJhN2NlMDljZTVkOGNiYWYwMWE1MTFlNWUzZGRiNjFhNWVhZGMzMzkzIn0.eyJhdWQiOiIxIiwianRpIjoiZDA1ZGUwYmY4MmVlZDAwYWQxMmM1NjczMmE1ZTVhOGYyNjI1Y2ZlMmE3Y2UwOWNlNWQ4Y2JhZjAxYTUxMWU1ZTNkZGI2MWE1ZWFkYzMzOTMiLCJpYXQiOjE1NjI4MjYwNDcsIm5iZiI6MTU2MjgyNjA0NywiZXhwIjoxNTk0NDQ4NDQ3LCJzdWIiOiI0NSIsInNjb3BlcyI6W119.BOMTDbLX8_5de6fn396MCWqc6MID7d8M30I0z5Ow3LZFXpfMrjnMMr22KyRWSKcprmqJ5QyuZbMgNdwjaSwArbs9W76QG0y3CVjAGuZGj7mb2Wdw6Pf5_vRMAlgvR48jIN7QZyoTPaBBmJ8n8nklYKKuP1Co--bLjdeYuTJOGzeef_i1d61yaRUDrG06i_-LFLr41cKYGJfw44Ubm75lUI2XHT5wqY1cje6orHBqgmps0EgH-8yYGlnMEFDVQGuMHhnZl3fOawZ466QE0qZ08AZmc4G60U87Jqy-VAKu_Prjges2YfsXVfBBt-Zs60JS2NG6bnz5F1l5Q5lz89K0nN304u87tUv7_CjAp9nrpka6WaNh4XrrUMUozT_ze-6EU2WWJlEswHbjcJZK12RmmG8N_yrJXZ08q5Bpy5xpH5QA9VmDCrBcqmbggOgzbtmBbPrLIvTmF1mpi__HKGdcCi-tSg1h0VdOWznWliEH6pg7IklwX5xHhw-nIVCP8zuYpOO-vWskF7X_lNNUeGHDu7BwtyyUD7R1sJ56LzA6rQDyQCMt3xErgJRal6Dqj7EegK0RLsSwJc31K2Gc6Bf1tReZ4gxuu_gyNRkbo7WAuOjPzufjnL34xqqtU0XdBTqxWiH6GtlYHZopNHcfmgFuYye1ZI4ZIasDtXGA8Y49U0k',
  },
  body: JSON.stringify({
    expo_token : token,
  })
  }).then((response) => response.json())
      .then((responseJson) => {
          if(responseJson.code==200){
            let data = {  
              expo_token: token
            }
            AsyncStorage.setItem('expo_token', JSON.stringify(data));
          }
      });
}

    componentDidMount(){
      this._notificationSubscription = Notifications.addListener(this._handleNotification);
      this.props.navigation.setParams({mainColor: mainColor()});
      this.saveExpoToken();
    }

    getData() {
      this.setState({
        isLoading: true,
     });
    
      return fetch('https://corona.lmao.ninja/v2/countries/'+this.state.countryName)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataSource: responseJson,
          isLoading: false,
        }, function(){
          this.getCasesConfirmed();
        });
  
      })
      .catch((error) =>{
        console.error(error);
      });
    }
    getGlobalMap() {
      return fetch('http://nizam.id/api2/covid_nasional')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoadingCases: false,
          mapsCase: responseJson,
        }, function(){
          if(this.state.countryName!='World'){
          this.getCasesConfirmed();
          }
        });
  
      })
      .catch((error) =>{
        console.error(error);
      });
    }
    getCasesConfirmed() {
      return fetch('http://nizam.id/covid_cases?iso2='+this.state.countryCode+'&cases=confirmed')
      .then((response) => response.json())
      .then((responseJson) => {
  
        this.setState({
          confirmed: responseJson.confirmed,
        }, function(){
          if(this.state.dataSource.country=='Indonesia'){
            this.getCasesConfirmedProvince();
          }else{
          this.getCasesRecovered();
          }
        

        });
  
      })
      .catch((error) =>{
        console.error(error);
      });
    }
    getCasesConfirmedProvince() {
      return fetch('http://nizam.id/api2/covid_province?cases=Kasus_Posi')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoadingCasesProvince: false,
          provinceConfirmed: responseJson,
        }, function(){
          this.getCasesDeathProvince();

        });
  
      })
      .catch((error) =>{
        console.error(error);
      });
    }

    getCasesDeathProvince() {
      return fetch('http://nizam.id/api2/covid_province?cases=Kasus_Meni')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          provinceDeath: responseJson,
        }, function(){
          this.getCasesRecovered();

        });
  
      })
      .catch((error) =>{
        console.error(error);
      });
    }

    getCasesRecovered() {
      return fetch('http://nizam.id/covid_cases?iso2='+this.state.countryCode+'&cases=recovered')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          recovered: responseJson.recovered,
        }, function(){
          this.getCasesDeath();

        });
  
      })
      .catch((error) =>{
        console.error(error);
      });
    }



    getCasesDeath() {
    
      return fetch('http://nizam.id/covid_cases?iso2='+this.state.countryCode+'&cases=deaths')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoadingRecoveredDeath: false,
          death: responseJson.deaths,
          vs:  [
            {
              seriesName: 'Recovered',
              data:this.state.recovered,
              color: '#71bf73'
            },
            {
              seriesName: 'Deaths',
              data:responseJson.deaths,
              color: '#de7062'
            }
          ],
        }, function(){

        });
      })
      .catch((error) =>{
        console.error(error);
      });
    }
  
    
    renderGlobalMap(){
      return(
        <View>
        <View style={styles.cardHome}>
        <View style={{flex:1, flexDirectio:'row'}}>
          <View style={{flex: 2, flexDirection: 'column'}}>
          <Text  style={{color:'#3b3a3a',fontSize:12, fontWeight:'bold'}}>{'Cases by Province'}</Text>
          </View>
          <View style={{flex: 4, flexDirection: 'column', marginTop:-15}} >
          {this.state.dataSource.country== 'Indonesia'? <Text  style={{color:'#4f70c2',fontSize:11, fontWeight:'bold',  textAlign:'right'}}   onPress={() => this.props.navigation.push('DetailCountry')}>Detail</Text>: null }
          </View>
          <View style={{marginTop:20,justifyContent:'center',textAlign:'center'}}>
          {this.state.mapsCase ?      <MapView style={{height:200}}  region={{
      latitude: -7.15097499999999985931253831950016319751739501953125,
      longitude: 110.1402590000000003556124283932149410247802734375,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }} > 
    {this.state.mapsCase.map(marker => (
    <Marker
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
        </View>
      )
    }

    renderCases(){
      return(
        <View style={{marginTop:10}}>
        <View style={styles.cardHome}>
        <View style={{flex:1, flexDirectio:'row'}}>
          <View style={{flex: 2, flexDirection: 'column'}}>
          <Text  style={{color:'#3b3a3a',fontSize:12, fontWeight:'bold'}}>{ 'Cases by Date'}</Text>
          </View>
          <View style={{flex: 4, flexDirection: 'column', marginTop:-15}} >
          {this.state.dataSource.country== 'Indonesia'? <Text  style={{color:'#4f70c2',fontSize:11, fontWeight:'bold',  textAlign:'right'}}   onPress={() => this.props.navigation.push('DetailCountry')}>Detail</Text>: null }
          </View>
          <View style={{marginTop:20,justifyContent:'center',textAlign:'center'}}>
          {this.state.confirmed ? <PureChart data={this.state.confirmed} type='line' />: <TextLoading/> }
          </View>
        </View>
        </View>
        </View>
      )
    }

    renderCasesProvince(){
      return(
        <View>
        <View style={styles.cardHome}>
        <View style={{flex:1, flexDirectio:'row'}}>
          <View style={{flex: 2, flexDirection: 'column'}}>
          <Text  style={{color:'#3b3a3a',fontSize:12, fontWeight:'bold'}}>{ 'Cases by Province'}</Text>
          </View>
          <View style={{flex: 4, flexDirection: 'column', marginTop:-15}} >
          {this.state.dataSource.country== 'Indonesia'? <Text  style={{color:'#4f70c2',fontSize:11, fontWeight:'bold',  textAlign:'right'}}   onPress={() => this.props.navigation.push('DetailCountry')}>Detail</Text>: null }
          </View>
          <View style={{marginTop:20,justifyContent:'center',textAlign:'center'}}>
          {this.state.provinceConfirmed ? <PureChart data={this.state.provinceConfirmed} type='line' />: <TextLoading/> }
          </View>
        </View>
        </View>

        </View>
      )
    }
   
    renderCasesDeath(){
      return(
        <View>
        <View style={styles.cardHome}>
        <View style={{flex:1, flexDirectio:'row'}}>
          <View style={{flex: 2, flexDirection: 'column'}}>
          <Text  style={{color:'#3b3a3a',fontSize:12, fontWeight:'bold'}}>{ 'Cases Death by Province'}</Text>
          </View>
          <View style={{flex: 4, flexDirection: 'column', marginTop:-15}} >
          {this.state.dataSource.country== 'Indonesia'? <Text  style={{color:'#4f70c2',fontSize:11, fontWeight:'bold',  textAlign:'right'}}   onPress={() => this.props.navigation.push('DetailCountry')}>Detail</Text>: null }
          </View>
          <View style={{marginTop:20,justifyContent:'center',textAlign:'center'}}>
          {this.state.provinceDeath ? <PureChart data={this.state.provinceDeath} type='line' />: <TextLoading/> }
          </View>
        </View>
        </View>

        </View>
      )
    }
   
    renderRecoveredDeath(){
     
      return(
        <View>
        <View style={styles.cardHome}>
          <View style={{flex:1, flexDirectio:'row'}}>
        <View style={{position: 'relative'}}>
          <Text  style={{marginBottom: 5,marginLeft: 0,marginTop: 0,color:'#3b3a3a',fontSize:12, fontWeight:'bold'}}>{'Recovered'} Vs {'Deaths'}</Text>
        </View>
        <View style={{flex: 4, flexDirection: 'column', marginTop:-15}} >
          {this.state.countryName== 'Indonesia'? <Text  style={{color:'#4f70c2',fontSize:11, fontWeight:'bold',  textAlign:'right'}}   onPress={() => this.props.navigation.push('DetailCountry', {countryName: this.state.countryName,countryCode: this.state.countryCode})}>Detail</Text>: null }
          </View>
        <View style={{marginTop:20}}>
        {this.state.vs ? <PureChart data={this.state.vs} type='bar' />: <TextLoading/> }
        </View>
        </View>
        </View>
        </View>
    
      )
    }
 

  render() {
    const { width } = Dimensions.get('window');
    const height = width * 0.8;
    const { navigation } =this.props;
     if(this.state.isLoading){
      return(
        <LoaderScreen/>
      )
    }
    
    return (
      <View style={[styles.container, {height:'100%'}]}>
      <ScrollView>

          <View style={[styles.containerIb2,{backgroundColor:mainColor()}]}>
          </View>
   
          <View style={styles.cardHeaderHome} >
            <View style={{flex: 1, flexDirectio:'column',justifyContent:'center'}}>
              <Text style={{  color:'#fff', fontSize:12, textAlign:'center' }}>
              Last Update
              </Text>
              <Text style={{  color:'#fff', fontSize:12, textAlign:'center', marginTop:10 }}>
              {new Date().toLocaleString()}
              </Text>
            </View>
          </View>

          <View style={styles.cardHeaderHome2} >
          <View style={{flex:1, flexDirectio:'row'}}>
            <ListItem
            title={this.state.dataSource.country}
            titleStyle={{ fontWeight: 'bold', color:'#4d4d4d' }}
            onPress={() => this.props.navigation.push('Country', { countryCode: 'XXX'})}
            containerStyle={{marginTop:-15, marginLeft:-15,backgroundColor:'rgba(0,0,0,0)'}}
            subtitle={'Click to view by country'}
            leftIcon={
              <Icon
              name='edit'
              type='font-awesome'
              color={mainColor()}
              size={22} />
            }
            rightIcon={<Chevron />}
            />
          </View>
          <Divider style={{ backgroundColor: '#9c9c9c' }} />
          <View style={{flex: 1, flexDirection: 'row', marginTop:10}}>
            <View style={{flex: 2, flexDirection: 'column'}}>
              <Text style={{fontWeight :'600', fontSize:12, color:'#3b3a3a'}} >
              {'Cases'}
              </Text>
            </View>
            <View style={{flex: 4, flexDirection: 'column'}}>
              <Text style={{fontWeight :'600', fontSize:12, textAlign:'right', color:'#3b3a3a'}} >
              {NumberFormat(this.state.dataSource.cases)}
              </Text>
            </View>
          </View>

          <View style={{flex: 1, flexDirection: 'row', marginTop:8}}>
            <View style={{flex: 2, flexDirection: 'column'}}>
              <Text style={{fontWeight :'600', fontSize:12, color:'#3b3a3a'}} >
              {'Recovered'}
              </Text>
            </View>
            <View style={{flex: 4, flexDirection: 'column'}}>
              <Text style={{fontWeight :'600', fontSize:12, textAlign:'right', color:'#1d8212'}} >
              {NumberFormat(this.state.dataSource.recovered)}
              </Text>
            </View>
          </View>

          <View style={{flex: 1, flexDirection: 'row', marginTop:10}}>
            <View style={{flex: 2, flexDirection: 'column'}}>
              <Text style={{fontWeight :'600', fontSize:12, color:'#3b3a3a'}} >
              {'Deaths'}
              </Text>
            </View>
            <View style={{flex: 4, flexDirection: 'column'}}>
              <Text style={{fontWeight :'300', textAlign:'right', color:'#3b3a3a'}} >
              <Text style={{fontWeight :'600', fontSize:12, color :'red'}} >
              {NumberFormat(this.state.dataSource.deaths)}
                </Text>
           
              </Text>
            </View>
          </View>

        </View>
      
        <View style={styles.cardProfile} >
          <View style={{flex:1, flexDirectio:'row',}}>
              <ListItem
              title={'Affected Location'}
              titleStyle={styles.titleStyle}
              subtitleStyle={styles.subtitleStyle}
              onPress={() => this.props.navigation.push('MapCases')}
              containerStyle={styles.listItemContainerNoBorder}
              subtitle={'View Map by nearby location'}
              leftIcon={
                <Icon
                name='map-marker'
                type='font-awesome'
                color={mainColor()}
                size={22} />
              }
              rightIcon={<Chevron />}
              badge={{  status:'warning', value: 'New', textStyle: { color: 'white' }, badgeStyle: { backgroundColor:mainColor(), marginTop: 0 } }}
            />
          </View>
        </View> 
      {/* {this.renderGlobalMap()} */}
      {this.state.countryName!= 'World'? this.renderCases(): null }
      {this.state.dataSource.country== 'Indonesia'? this.renderCasesProvince(): null }
      {this.state.dataSource.country== 'Indonesia'? this.renderCasesDeath(): null }
      {this.state.countryName!= 'World'? this.renderRecoveredDeath(): null }
      </ScrollView>
      <TouchableOpacity
    activeOpacity={0.7}
    onPress={() => this.props.navigation.push('ChangeColor')}
    style={[styles.TouchableOpacityStyle,{marginRight:12,marginBottom:10}]}>
      <View style={styles.FloatingButtonStyle}>
      <Icon
      reverse
    name="colours"
    type="entypo"
    color={mainColor()}
    containerStyle={{  width: 20 }}
  />
    </View>
    </TouchableOpacity>
      </View>

    );
  }
}


const RootStack = createStackNavigator({
  Home: HomeScreen,
},
  {
    initialRouteName: 'Home',
  });

export default createAppContainer(RootStack);