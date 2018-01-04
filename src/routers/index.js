import React from 'react';
import { StackNavigator } from 'react-navigation';

import Home from '../views/Home';
import CreateBill from '../views/CreateBill';

const RouterNav = StackNavigator({
  Home: {
    screen: Home
  },
  CreateBill: {
    screen: CreateBill
  }
}, {
  navigationOptions: {
    headerStyle: {
      backgroundColor: 'slategray',
    },
    headerTintColor: 'snow'
  },
  
});

export default RouterNav;