import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import FaIcon from '@expo/vector-icons/FontAwesome';

import Colors from '../constants/Colors';

export default function TabBarIcon(props) {
  return (
    <FaIcon
      name={props.name} 
      size={props.size}
      style={{ marginBottom: -3 }}
      color={props.focused ? '#d42f3c': Colors.tabIconDefault}
    />
  );
}