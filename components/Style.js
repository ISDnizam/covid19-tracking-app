const {Platform,React,Dimensions} = require("react-native");
const win = Dimensions.get('window');
import { mainColor }  from '../components/GlobalFunction';

export default {
	   container: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
  },
  containerGray: {
    flexGrow: 1,
    backgroundColor: '#f7f5f5',
  },
  containerIb: {
    flexGrow: 1,
    backgroundColor: mainColor(),
    height: 140,
    width: win.width+40,
    marginTop: -30,
    borderRadius: 50,
    marginLeft: -20,
    marginRight: -20,
  },
  containerIb2: {
    flexGrow: 1,
    backgroundColor: mainColor(),
    height: 180,
    width: win.width+40,
    marginTop: -30,
    marginLeft: -20,
    marginRight: -20,
  },
  containerIbDefault: {
    flexGrow: 1,
    backgroundColor: mainColor(),
    width: win.width+40,
    marginTop: -30,
    borderRadius: 50,
    marginLeft: -20,
    marginRight: -20,
  },
  containerDefault: {
    flexGrow: 1,
    height: 140,
    width: win.width+40,
    marginTop: -30,
    borderRadius: 50,
    marginLeft: -20,
    marginRight: -20,
  },
   border: {
    borderRadius: 50,
  },
  

cardProfile2: {
	backgroundColor: '#ffffff',
	padding: 3,
	borderRadius: 10,
	shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 3,
	flexDirection: 'row',
	marginTop:7,
	marginBottom :3,
	marginLeft :15,
	marginRight :15,
},
  cardProfileHeader: {
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
	marginTop:-80,
	marginBottom :10,
	marginLeft :15,
  marginRight :15,
}, 
cardProfileHeader60: {
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
	marginTop:-60,
	marginBottom :10,
	marginLeft :15,
  marginRight :15,
},
cardHeaderHome: {
	padding: 15,
	marginTop:-140,
	marginBottom :10,
	marginLeft :15,
  marginRight :15,
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
	marginBottom :10,
	marginLeft :15,
  marginRight :15,
},
cardHome: {
	backgroundColor: '#ffffff',
	padding: 15,
	borderRadius: 5,
	shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 3,
	flexDirection: 'row',
  alignItems: 'center',
	marginBottom :10,
	marginLeft :15,
  marginRight :15,
},
cardProfile: {
	backgroundColor: '#ffffff',
	padding: 5,
	borderRadius: 5,
	shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 3,
	flexDirection: 'row',
	marginTop:5,
	marginBottom :5,
	marginLeft :15,
  marginRight :15,
},
cardProfileHeaderBlank: {
	padding: 5,
	flexDirection: 'row',
  alignItems: 'center',
	marginTop:-110,
	marginBottom :10,
	marginLeft :15,
	marginRight :15,
},

   formLogin : {
    textAlign: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },

  viewFlat:{
    borderColor: '#EEEEEE',
    borderBottomWidth: 1 ,
    marginTop: 5 ,
    marginBottom: 5 ,
  },
  title: {
    fontSize: 38,
    backgroundColor: 'transparent'
  },
  titleStyle: {
    fontWeight: 'bold', 
    color:'#4d4d4d', 
    fontSize:13,
  },
  titleStyle2:{
    fontWeight: '600',
    marginLeft: 10,
    fontSize: 12,
  },
  subtitleStyle: {
    fontSize:13,
  },
  subtitleStyle2: {
    color: '#9c9c9c',
    fontSize:12,
    marginLeft: 10,
  },
   TouchableOpacityStyle: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 0,
    bottom: 5,
  },
  FloatingButtonStyle: {
    resizeMode: 'contain',
    width: 60,
    height: 60,
    zIndex: 9999, position: 'absolute'
  },
  viewData:{
    flexDirection:'row',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  imageAvatar:{
    width:60,
    height:60,
    borderRadius:50
  },
  titleText:{
    fontWeight: '600',
    marginLeft: 20,
    marginTop:5,
    fontSize: 12,
  },
  textLink:{
    color: 'blue',
    fontSize:12,
    marginLeft:0,
    textAlign:'center',
    marginTop: 5
  },

  textNormal:{
    color: '#000000',
    fontSize:12,
    marginLeft: 20,
    marginTop: 5
  },

    textRight:{
    flex: 1,
    flexDirection: 'row', 
    justifyContent: 'flex-end'
  },
   textSmall:{
    color: '#9c9c9c',
    fontSize:9,
  },
  
  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#EEEEEE',
    height: 30,
    borderRadius: 10,
    width: '100%'
  },
 
  ImageStyle: {
    padding: 10,
    height:20,
    width: 20,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
 
  viewContent:{
    flex:1,
  },
  textInput:{
    height:40,
    paddingLeft :6
  },
    button: {

    width:300,

    backgroundColor:mainColor(),

    borderRadius: 25,

    marginVertical: 10,

    paddingVertical: 13

  },

  buttonText: {

    fontSize:16,

    fontWeight:'500',

    color:'#ffffff',

    textAlign:'center'

  },
  bottom: {
  flex: 1,
  justifyContent: 'flex-end',
  marginBottom: 36
},

  card: {
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
	marginBottom :10,
},
 card2: {
	backgroundColor: '#ffffff',
	padding: 15,
	height: 100,
	borderRadius: 10,
	shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 3,
	flexDirection: 'row',
	alignItems: 'center',
	marginBottom :10,
},
  icon: {
    paddingLeft: 10,
  },
  iconLeft: {
    paddingLeft: 10,
    paddingRight: -60,
  },
  cardSearch: {
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
    marginTop:10,
    marginBottom :10,
    marginLeft :15,
    marginRight :15,
  },
  
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: 120,
    color:'white'
  },
  textInput:{
    height:40,
    paddingLeft :6
  },
  imageCarousel: {
    width :150,
    height :65,
    marginRight :7,
    marginLeft :2,
    marginTop :5,

  },
  tabBarInfoContainer: {
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
        elevation: 2,
      },
    }),
  	flexDirection: 'row',

    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
    zIndex:-1,
  },
  tabBarInfoText: {
    fontSize: 13,
    marginLeft:0,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'left',
  },
  textGray: {
    color: '#9c9c9c',
  },
 
  boldFont: {
    fontWeight: 'bold',
    fontSize: 13,
  },
  textBlack: {
    color: '#686869',
  },
};