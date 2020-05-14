import React from 'react'
import { Icon } from 'react-native-elements'
import GlobalSetting from '../components/MyGlobalSetting';

const Chevron = () => (
  <Icon
    name="chevron-right"
    type="entypo"
    color={GlobalSetting.mainColor}
    containerStyle={{ marginLeft: -15, width: 20 }}
  />
)

export default Chevron
