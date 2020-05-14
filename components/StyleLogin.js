
const React = require("react-native");

const { StyleSheet, Platform } = React;

export default {
    container: {
      flexGrow: 1,
      backgroundColor: '#128ce3',
    },
    formLogin : {
      textAlign: 'center',
      alignItems: 'center',
    },
   
    contentContainer: {
      paddingTop: 30,
    },
    welcomeContainer: {
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 20,
    },
    welcomeImage: {
      width: 100,
      height: 120,
      resizeMode: 'contain',
      marginTop: 9,
      marginLeft: -10,
    },
    getStartedContainer: {
      alignItems: 'center',
      marginHorizontal: 50,
    },
    homeScreenFilename: {
      marginVertical: 7,
    },
    codeHighlightText: {
      color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
      backgroundColor: 'rgba(0,0,0,0.05)',
      borderRadius: 3,
      paddingHorizontal: 4,
    },
    getStartedText: {
      fontSize: 17,
      color: '#ffffff',
      lineHeight: 24,
      textAlign: 'center',
    },
    tabBarInfoContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      ...Platform.select({
        ios: {
          shadowColor: 'black',
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
        },
        android: {
          elevation: 20,
        },
      }),
      alignItems: 'center',
      backgroundColor: '#fbfbfb',
      paddingVertical: 20,
    },
    tabBarInfoText: {
      fontSize: 17,
      color: 'rgba(96,100,109, 1)',
      textAlign: 'center',
    },
    navigationFilename: {
      marginTop: 5,
    },
    helpContainer: {
      marginTop: 15,
      alignItems: 'center',
    },
    helpLink: {
      paddingVertical: 15,
    },
    helpLinkText: {
      fontSize: 14,
      color: '#2e78b7',
    },
  
  
    inputBox: {
  
      width:300,
      height:40,
  
      backgroundColor:'rgba(255, 255,255,0.2)',
  
      borderRadius: 25,
  
      paddingHorizontal:16,
  
      fontSize:16,
  
      color:'#ffffff',
  
      marginVertical: 10
  
    },
  
    button: {
  
      width:300,
  
      backgroundColor:'#126eb0',
  
      borderRadius: 25,
  
      marginVertical: 10,
  
      paddingVertical: 13
  
    },
  
    buttonText: {
  
      fontSize:16,
  
      fontWeight:'500',
  
      color:'#ffffff',
  
      textAlign:'center'
  
    }
  
  
  };