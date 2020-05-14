import React, { Component } from 'react';
import {
  ActivityIndicator,Platform, Alert, Dimensions,View,  StyleSheet, Text, TextInput, TouchableOpacity, ScrollView,Picker,  AsyncStorage } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MyGlobalSetting from '../components/MyGlobalSetting';
import styles from "../components/Style";
import { Header, Badge, Icon, withBadge, Tile,Divider, Avatar, ListItem, Button, Card, Image  } from 'react-native-elements';
import { InfiniteListView } from "react-native-infinite-listview";
import Chevron from '../components/Chevron';
import { LoaderScreen,mainColor,currencyFormat,NumberFormat }  from '../components/GlobalFunction';

const { width,height } = Dimensions.get('window');
console.disableYellowBox = true;

class App extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      isRefreshing: false,
      isLoadingMore: false,
    }
  }
  static navigationOptions= ({navigation}) => {
    const {params = {}} = navigation.state;
    return {
    headerTitle: (
        <View>
        <Text style={{fontWeight:'bold', color:'white', fontSize:20}}>All Country</Text>
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
    var  apiUrl= 'https://corona.lmao.ninja/v2/all';
    return fetch(apiUrl)
     .then((response) => response.json())
     .then((responseJson) => {
       this.setState({
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
    var  apiUrl=  'http://nizam.id/covid_country';
    return fetch(apiUrl)
     .then((response) => response.json())
     .then((responseJson) => {
       this.setState({
         isLoading: false,
         dataSource: responseJson,
       }, function(){

       });

     })
     .catch((error) =>{
       console.error(error);
     });
   }
   
   selectCountry(countryName,countryCode){
    let data = {  
        countryName: countryName,
        countryCode: countryCode,
    }
    AsyncStorage.setItem('country', JSON.stringify(data));
    this.props.navigation.push('App');
   }
   componentDidMount(){
    this.getTotal();
    this.props.navigation.setParams({mainColor: mainColor()});
  }

  onRefresh = () => {
    this.setState({ isRefreshing: true });
    setTimeout( () => {
      this.setState({ isRefreshing: false });
    }, 3000);
  };

  canLoadMoreContent = () => {
    return this.state.dataSource.length < 2 && !this.state.isLoadingMore;
  };
  
  onLoadMore = () => {
    console.log('start loading more');
    this.setState({ isLoadingMore: true });
    setTimeout( () => {
      console.log('stop loading more');
      this.setState({
        isLoadingMore: false,
        dataSource: [...this.state.dataSource]
      });
    }, 3000);
  };
  renderRow = (ro, sectionID, rowID) => {
  const { onFocus, onBlur, otherProps, navigation } =this.props;
    return (
      <TouchableOpacity>
        <View style={styles.cardProfile2}  >
          <View style={{flex:1, flexDirectio:'row',}}>
              <ListItem
              title={ro.countryregion}
              subtitle={ NumberFormat(ro.confirmed) +' Total Cases '}
              titleStyle={{ fontWeight: 'bold', color:'#4d4d4d' }}
              onPress={() => this.selectCountry(ro.countryregion,ro.iso2)}
              containerStyle={styles.listItemContainerNoBorder}
              leftAvatar={<Avatar rounded large  overlayContainerStyle={{backgroundColor: mainColor()}} icon={{name: 'flag', color: 'white', type: 'font-awesome'}} />}
              rightIcon={<Chevron />}
              />
          </View>
        </View> 
        </TouchableOpacity>
    );
  };

renderList() {
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
      <View style={{height:height-140}}>
    

        <InfiniteListView
        dataArray={this.state.dataSource}
        renderRow={this.renderRow}
        onRefresh={this.onRefresh}
        isRefreshing={this.state.isRefreshing}
        canLoadMore={this.canLoadMoreContent}
        isLoadingMore={this.state.isLoadingMore}
        /*renderLoadMoreRow={this.renderLoadMoreRow}*/
        onLoadMore={this.onLoadMore}/>   
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
    {this.renderList()}
    </ScrollView>
    </View>
    )
  }
}


export default App;  
