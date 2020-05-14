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
import { LoaderScreen,mainColor,currencyFormat,NumberFormat,TextLoading }  from '../components/GlobalFunction';

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
    }
  }
  static navigationOptions= ({navigation}) => {
    const {params = {}} = navigation.state;
    return {
    headerTitle: (
        <View>
        <Text style={{fontWeight:'bold', color:'white', fontSize:20}}>Indonesia</Text>
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
        this.getList();
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
       }, function(){

       });

     })
     .catch((error) =>{
       console.error(error);
     });
   }
   
  
   componentDidMount(){
    this.getTotal();
    this.props.navigation.setParams({mainColor: mainColor()});
  }



renderHeader() {
  const { onFocus, onBlur, otherProps, navigation } =this.props;
  return (

  <View>
       <View style={{flexGrow: 1, flexDirection:'row',backgroundColor: mainColor(), padding: 14,marginTop:-10, justifyContent:'center'}}>
        <Button
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
        
      </View>

          <View style={[styles.cardHeaderHome2,{marginTop:10}]} >
          <View style={{flex:1, flexDirectio:'row'}}>
            <ListItem
            title={this.state.case.country}
            titleStyle={{ fontWeight: 'bold', color:'#4d4d4d' }}
            containerStyle={{marginTop:-15, marginLeft:-15,backgroundColor:'rgba(0,0,0,0)'}}
            subtitle={'Last Update '+ new Date().toLocaleString()}
            leftIcon={
              <Icon
              name='flag'
              type='font-awesome'
              color={mainColor()}
              size={22} />
            }
            />
          </View>
          <Divider style={{ backgroundColor: '#9c9c9c' }} />
          <View style={{flex: 1, flexDirection: 'row', marginTop:10}}>
            <View style={{flex: 2, flexDirection: 'column'}}>
              <Text style={{fontWeight :'600', fontSize:12, color:'#3b3a3a'}} >
              {'Today Cases'}
              </Text>
            </View>
            <View style={{flex: 4, flexDirection: 'column'}}>
              <Text style={{fontWeight :'600', fontSize:12, textAlign:'right', color:'#3b3a3a'}} >
              {NumberFormat(this.state.case.todayCases)}
              </Text>
            </View>
          </View>

          <View style={{flex: 1, flexDirection: 'row', marginTop:8}}>
            <View style={{flex: 2, flexDirection: 'column'}}>
              <Text style={{fontWeight :'600', fontSize:12, color:'#3b3a3a'}} >
              {'Today Deaths'}
              </Text>
            </View>
            <View style={{flex: 4, flexDirection: 'column'}}>
              <Text style={{fontWeight :'600', fontSize:12, textAlign:'right',  color :'red'}} >
              {NumberFormat(this.state.case.todayDeaths)}
              </Text>
            </View>
          </View>

          <View style={{flex: 1, flexDirection: 'row', marginTop:10}}>
            <View style={{flex: 2, flexDirection: 'column'}}>
              <Text style={{fontWeight :'600', fontSize:12, color:'#3b3a3a'}} >
              {'Currently Patients'}
              </Text>
            </View>
            <View style={{flex: 4, flexDirection: 'column'}}>
              <Text style={{fontWeight :'300', textAlign:'right', color:'#3b3a3a'}} >
              <Text style={{fontWeight :'600', fontSize:12,color:'#1d8212'}} >
              {NumberFormat(this.state.case.active)}
                </Text>
           
              </Text>
            </View>
          </View>

        </View>

  </View>
  )
}


renderList() {
  const { onFocus, onBlur, otherProps, navigation } =this.props;
  return (
  <View>
      {this.state.dataSource ? this.state.dataSource.map((ro ,index)=> (
          <View style={styles.cardProfile2}   key={index} >
            <View style={{flex:1, flexDirectio:'row',}}>
          {ro.attributes.Provinsi== 'Jawa Tengah' || ro.attributes.Provinsi== 'Daerah Istimewa Yogyakarta' ? <ListItem
              title={ro.attributes.Provinsi}
              subtitle={() => (
                <View>
                <Text style={{ fontSize:11, color:'#3b3a3a'}} >
              {ro.attributes.Kasus_Posi} {'Cases | '}
              {ro.attributes.Kasus_Semb} {'Covered | '}
              {ro.attributes.Kasus_Meni} {'Deaths'}
              </Text>
              </View>
            
              )}
              titleStyle={{ fontWeight: 'bold', color:'#4d4d4d' }}
              containerStyle={styles.listItemContainerNoBorder}
              rightIcon={<Chevron />}
              badge={{  status:'warning', value: 'Detail', textStyle: { color: 'white' }, badgeStyle: { backgroundColor:mainColor(), marginTop: 0 } }}
              onPress={() => this.props.navigation.push('MapNasional', { province :ro.attributes.Provinsi, cases:ro.attributes.Kasus_Posi,recovered:ro.attributes.Kasus_Semb,deaths:ro.attributes.Kasus_Meni })}
              leftAvatar={<Avatar rounded large  overlayContainerStyle={{backgroundColor: mainColor()}} icon={{name: 'users', color: 'white', type: 'font-awesome'}} />}
              />: <ListItem
              title={ro.attributes.Provinsi}
              subtitle={() => (
                <View>
                <Text style={{ fontSize:11, color:'#3b3a3a'}} >
              {ro.attributes.Kasus_Posi} {'Cases | '}
              {ro.attributes.Kasus_Semb} {'Covered | '}
              {ro.attributes.Kasus_Meni} {'Deaths'}
              </Text>
              </View>
            
              )}
              titleStyle={{ fontWeight: 'bold', color:'#4d4d4d' }}
              containerStyle={styles.listItemContainerNoBorder}
              leftAvatar={<Avatar rounded large  overlayContainerStyle={{backgroundColor: mainColor()}} icon={{name: 'users', color: 'white', type: 'font-awesome'}} />}
              /> }

              
            </View>
          </View> 
        )): <TextLoading/> }

      
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
    {this.renderList()}
    </ScrollView>
    </View>
    )
  }
}


export default App;  
