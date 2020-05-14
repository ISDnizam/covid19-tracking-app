import React, { Component } from 'react';
import {
  ActivityIndicator,Platform, Alert, Dimensions,View,  StyleSheet, Text, TextInput, TouchableOpacity, ScrollView,Picker,  AsyncStorage,WebView } from 'react-native';
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
import AwesomeAlert from 'react-native-awesome-alerts';


const { width,height } = Dimensions.get('window');
console.disableYellowBox = true;

class App extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      dataSource:'',
      mapsCase:'',
      showAlert:false,
      textAlert:''

    }
  }
  static navigationOptions= ({navigation}) => {
    const {params = {}} = navigation.state;
    return {
    headerTitle: (
        <View>
        <Text style={{fontWeight:'bold', color:'white', fontSize:20}}>{params.province}</Text>
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
    var province =this.props.navigation.getParam('province', '');
    var cases =this.props.navigation.getParam('cases', '');
    var recovered =this.props.navigation.getParam('recovered', '');
    var deaths =this.props.navigation.getParam('deaths', '');
  
    if(province=='Jawa Tengah'){
      this.setState({
      mapUrl: '<iframe frameborder="0" marginheight="0" marginwidth="0" title="Data Visualization" allowtransparency="true" allowfullscreen="true" class="tableauViz" style="display: block; width: 100%; height: 100%; margin: 0px; padding: 0px; border: none;" src="https://public.tableau.com/views/PersebaranCOVID-19JawaTengahPerPerson/covid-19-jateng-cases?:embed=y&amp;:showVizHome=no&amp;:host_url=https%3A%2F%2Fpublic.tableau.com%2F&amp;:embed_code_version=3&amp;:tabs=no&amp;:toolbar=no&amp;:animate_transition=no&amp;:display_static_image=no&amp;:display_spinner=yes&amp;:display_overlay=yes&amp;:display_count=yes&amp;:origin=viz_share_link&amp;publish=yes&amp;:loadOrderID=0" __idm_frm__="175"></iframe>',
      });
    }else if(province=='Daerah Istimewa Yogyakarta'){
      this.setState({
      mapUrl: '<iframe frameborder="0" marginheight="0" marginwidth="0" title="Data Visualization" allowtransparency="true" allowfullscreen="true"  height="550" style="display: block; width: 109%;  margin-left: -18px;margin-top: -18px; padding: 0px; border: none;" class="tableauViz" __idm_frm__="205" src="https://public.tableau.com/shared/FHDX7694J?:embed=y&amp;:showVizHome=no&amp;:host_url=https%3A%2F%2Fpublic.tableau.com%2F&amp;:embed_code_version=3&amp;:toolbar=no&amp;:animate_transition=yes&amp;:display_static_image=no&amp;:display_spinner=yes&amp;:display_overlay=yes&amp;:display_count=yes&amp;publish=yes&amp;:loadOrderID=1"></iframe>',
      });
    }else if(province=='DKI Jakarta'){
      this.setState({
      mapUrl: '<iframe frameborder="0" marginheight="0" marginwidth="0" title="Data Visualization" allowtransparency="true" allowfullscreen="true" class="tableauViz" style="display: block; width: 100%; height: 100%; margin-left: 0px;margin-top: 0px; padding: 0px; border: none;" src="https://public.tableau.com/views/PetaPersebaranTes/Dashboard2?:embed=y&amp;:showVizHome=no&amp;:host_url=https%3A%2F%2Fpublic.tableau.com%2F&amp;:embed_code_version=3&amp;:tabs=no&amp;:toolbar=no&amp;:animate_transition=yes&amp;:display_static_image=no&amp;:display_spinner=yes&amp;:display_overlay=yes&amp;:display_count=yes&amp;publish=yes&amp;:loadOrderID=1" __idm_frm__="205"></iframe>',
      });
    }else if(province=='Jawa Barat'){
      this.setState({
      mapUrl: '<div class="tableauPlaceholder" id="viz1585589113030" style="position: relative"><noscript><a href="#"><img alt=" " src="https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Pe&#47;PetaSebaranODPPDP-BlueVersion&#47;DashboardMapAllCases&#47;1_rss.png" style="border: none" /></a></noscript><object class="tableauViz"  style="display:none;"><param name="host_url" value="https%3A%2F%2Fpublic.tableau.com%2F" /> <param name="embed_code_version" value="3" /> <param name="site_root" value="" /><param name="name" value="PetaSebaranODPPDP-BlueVersion&#47;DashboardMapAllCases" /><param name="tabs" value="no" /><param name="toolbar" value="no" /><param name="static_image" value="https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Pe&#47;PetaSebaranODPPDP-BlueVersion&#47;DashboardMapAllCases&#47;1.png" /> <param name="animate_transition" value="yes" /><param name="display_static_image" value="yes" /><param name="display_spinner" value="yes" /><param name="display_overlay" value="yes" /><param name="display_count" value="yes" /><param name="filter" value="amp;:origin=viz_share_link" /><param name="filter" value="amp;:toolbar=n" /><param name="filter" value="amp;:embed_code_version=3" /><param name="filter" value="amp;:loadOrderID=0" /><param name="filter" value="amp;showTabs=false" /><param name="filter" value="amp;:display_count=y" /><param name="filter" value="amp;:embed=y" /><param name="filter" value="amp;:showVizHome=n" /><param name="filter" value="amp;:bootstrapWhenNotified=y" /><param name="filter" value="amp;:tabs=n" /><param name="filter" value="amp;:toolbar=n" /><param name="filter" value="amp;showTabs=false" /><param name="filter" value="amp;:apiID=host0" /></object></div>                <script type="text/javascript">                    var divElement = document.getElementById("viz1585589113030");                    var vizElement = divElement.getElementsByTagName("object")[0];                    if ( divElement.offsetWidth > 800 ) { vizElement.style.width="100%";vizElement.style.height=(divElement.offsetWidth*0.75)+"px";} else if ( divElement.offsetWidth > 500 ) { vizElement.style.width="100%";vizElement.style.height="1200px";} else { vizElement.style.width="100%";vizElement.style.height="1400px";}                     var scriptElement = document.createElement("script");                    scriptElement.src = "https://public.tableau.com/javascripts/api/viz_v1.js";                    vizElement.parentNode.insertBefore(scriptElement, vizElement);                </script>',
      });
    }
    this.setState({
      cases: cases,
      recovered: recovered,
      deaths: deaths,
      isLoading: false,
      });
   }
  hideAlert = () => {
    this.setState({
      showAlert: false,
    });
  };
 
 
  componentDidMount(){
    this.getTotal();
    var province =this.props.navigation.getParam('province', '');
    this.props.navigation.setParams({mainColor: mainColor(), province:province});
  }

renderHeader() {
  const { onFocus, onBlur, otherProps, navigation } =this.props;
  return (

  <View>
       <View style={{flexGrow: 1, flexDirection:'row',backgroundColor: mainColor(), padding: 14,marginTop:-10, justifyContent:'center'}}>
        <Button
          title={"Cases : "+ NumberFormat(this.state.cases)}
          buttonStyle={{borderRadius:7,backgroundColor:'#fff'}}
          containerStyle={{marginRight :8}}
          titleStyle={{color:mainColor(),fontSize:11}}
        />
       
       <Button
          title={"Recovered : "+ NumberFormat(this.state.recovered)}
          buttonStyle={{borderRadius:7,backgroundColor:'#fff'}}
          containerStyle={{marginRight :8}}
          titleStyle={{color:'#1d8212',fontSize:11}}
        />
         <Button
          title={"Deaths : "+ NumberFormat(this.state.deaths)}
          buttonStyle={{borderRadius:7,backgroundColor:'#fff'}}
          containerStyle={{marginRight :8}}
          titleStyle={{color:'red',fontSize:11}}
        />
        
       
       {/* <Button
          title={"Jawa Tengah"}
          buttonStyle={{borderRadius:7,backgroundColor:this.state.GlobalBgColor}}
          containerStyle={{marginRight :8}}
          onPress={() => this.setAction('Global')}
          titleStyle={{color:this.state.GlobalTextColor,fontSize:11}}
        />
        <Button
          title={"Jawa Barat"}
          buttonStyle={{borderRadius:7,backgroundColor:this.state.IdBgColor}}
          containerStyle={{marginRight :8}}
          onPress={() => this.setAction('Indonesia')}
          titleStyle={{color:this.state.IdTextColor,fontSize:11}}
        />
       
         <Button
          title={"Yogyakarta"}
          buttonStyle={{borderRadius:7,backgroundColor:this.state.NearbyBgColor}}
          containerStyle={{marginRight :8}}
          onPress={() => this.setAction('Nearby')}
          titleStyle={{color:this.state.NearbyTextColor,fontSize:11}}
        /> */}
        
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
    {this.renderHeader()}
   {/* Jateng */}
   <WebView
        originWhitelist={['*']}
        scrollEnabled={false}
        source={{html: this.state.mapUrl}}
      />


{/* Jawa Barat */}
        {/* <WebView
        originWhitelist={['*']}
        scrollEnabled={false}
        source={{html: ''}}
      />
 */}

    </View>
    )
  }
}


export default App;  
