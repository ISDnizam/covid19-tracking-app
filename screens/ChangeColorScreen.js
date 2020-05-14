import * as React from 'react';
import { Alert, Platform,AsyncStorage,FlatList, ScrollView, Dimensions,ActivityIndicator, Image, StatusBar, View, Text,StyleSheet,TouchableOpacity } from 'react-native';
import { createAppContainer,createDrawerNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MyGlobalSetting from '../components/MyGlobalSetting';
import { setMainColor, mainColor, currencyFormat }  from '../components/GlobalFunction';
import { Avatar, Header , Icon, Divider,ListItem,Button} from 'react-native-elements';
import styles from "../components/Style";
import RNRestart from 'react-native-restart';
import {
  SlidersColorPicker,
  HueGradient,
  SaturationGradient,
  LightnessGradient,
  HueSlider,
  SaturationSlider,
  LightnessSlider
} from 'react-native-color';
import tinycolor from 'tinycolor2';
import { Updates } from 'expo';
const { width } = Dimensions.get('window');
const height = width * 0.8;
class App extends React.Component {
    static navigationOptions= ({navigation}) => {
        const {params = {}} = navigation.state;
        return {
        title: 'Change Color',
        headerStyle: {
          elevation : 0,
        backgroundColor: params.mainColor,
        },
        headerTintColor: '#fff',
        }
      };
  constructor(props){
    super(props);
    this.state ={ 
      isLoading: false,
      modalVisible: false,
      recents: ['#247ba0', '#70c1b3', '#b2dbbf', '#f3ffbd', '#ff1654'],
      color: tinycolor(mainColor()).toHsl()
    }
  }
 
  updateHue = h => this.setState({ color: { ...this.state.color, h } });
  updateSaturation = s => this.setState({ color: { ...this.state.color, s } });
  updateLightness = l => this.setState({ color: { ...this.state.color, l } });

    componentDidMount() {
    this.props.navigation.setParams({mainColor: tinycolor(this.state.color).toHslString()});
    }

  setColor = () => {
    AsyncStorage.setItem('mainColor', tinycolor(this.state.color).toHexString());
    Updates.reload();
      this.props.navigation.push('App');
    };

  render() {
    const overlayTextColor = tinycolor(this.state.color).isDark()
      ? '#FAFAFA'
      : '#222';
    const { width } = Dimensions.get('window');
    const height = width * 0.8;
     if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator color={mainColor()}/>
        </View>
      )
    }
    return (
      <View style={[styles.container, {height:'100%'}]}>
        <ScrollView>

        <TouchableOpacity
            onPress={() => this.setState({ modalVisible: true })}
            style={[
              styles.colorPreview,
              { backgroundColor: tinycolor(this.state.color).toHslString() }
            ]}
          >
          <View style={[styles.containerIb2,{ backgroundColor: tinycolor(this.state.color).toHslString()}]}>
          </View>
   
      
        <View style={[styles.cardHeaderHome,{marginTop:-120}]} >
            <View style={{flex: 1, flexDirectio:'column',justifyContent:'center'}}>
            <Text style={{  color:'#fff', fontSize:12, textAlign:'center' }}>
            {'Change Color'}
            </Text>
                <Text style={{  color:'#fff', fontSize:12, textAlign:'center', marginTop:10 }}>
            {'Click here to see this color in more detail'}

                </Text>
            </View>
        </View>
          </TouchableOpacity>
       

            
          <View style={styles.cardHeaderHome2} >
          <View style={{flex:1, flexDirectio:'row'}}>
          
         
          <HueSlider
            style={styles.sliderRow}
            gradientSteps={40}
            value={this.state.color.h}
            onValueChange={this.updateHue}
          />
        </View>
        </View>
       
       
  <View style={styles.cardHome} >
      <View style={{flex:1, flexDirectio:'row'}}>
      <Text style={{color:'#bdbbbb', textAlign:'left'}}>
      {'Color Code'}
        </Text>
        
        <Text  style={{color:'#e2e2e2', textAlign:'left', fontSize:13, marginTop:10, marginBottom:10, marginLeft:10}}>
        {tinycolor(this.state.color).toHexString()} 
        </Text>
        
       
      
      <Divider style={{ backgroundColor: '#999797',marginTop:0, marginBottom:20 }} />

       <Button 
        title={'Update'}
        buttonStyle={{borderRadius:7,backgroundColor:tinycolor(this.state.color).toHexString()}}
        containerStyle={{marginRight :0, marginTop:15}}
        titleStyle={{color:'#fff'}}
        onPress={() => this.setColor()}
        loading={this.state.isLoading}
      />
             {/* {this.renderButton()} */}
       
      </View>
      </View>
      

          <SlidersColorPicker
            visible={this.state.modalVisible}
            color={this.state.color}
            returnMode={'hex'}
            onCancel={() => this.setState({ modalVisible: false })}
            onOk={colorHex => {
              this.setState({
                modalVisible: false,
                color: tinycolor(colorHex).toHsl()
              });
              this.setState({
                recents: [
                  colorHex,
                  ...this.state.recents.filter(c => c !== colorHex).slice(0, 4)
                ]
              });
            }}
            swatches={this.state.recents}
            swatchesLabel="RECENTS"
            okLabel="Done"
            cancelLabel="Cancel"
          />
    </ScrollView>
      {/* <TouchableOpacity
          activeOpacity={0.7}
           onPress={() => this.props.navigation.push('AddTx')}
          style={styles.TouchableOpacityStyle}>
            <View style={styles.FloatingButtonStyle}>
          <FaIcon name="plus-circle" size={44} color="#128ce3"/>
          </View>
        </TouchableOpacity> */}
      </View>
    );
  }
}

export default App;  
