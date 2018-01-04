import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';

class Screen extends Component {
  render() {
    const { children, styles } = this.props;
    return (
      <View style={[{ flex: 1 }, styles ]}>
        <StatusBar backgroundColor='#63707c' />
        {children}
      </View>
    );
  }
}

export default Screen;