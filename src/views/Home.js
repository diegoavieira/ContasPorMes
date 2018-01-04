import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NetInfo, View, Text } from 'react-native';

import { isConnected } from '../actions';
import BillsList from '../components/BillsList';

class Home extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: 'Month\'s Bills'
  });

  componentDidMount() {
    NetInfo.addEventListener('connectionChange', this._onConnectivityChange);
    NetInfo.getConnectionInfo().then(connectionInfo => {
      this.props.isConnected(connectionInfo);
    });
  }
  
  componentWillUnmount() {
    NetInfo.removeEventListener('connectionChange', this._onConnectivityChange);
  }
  
  _onConnectivityChange = connectionInfo => {
    this.props.isConnected(connectionInfo);
  }

  _toCreateBill = () => {
    const { navigation } = this.props;
    navigation.navigate('CreateBill');
  }

  render() {
    return (
      <BillsList />
    );
  }
}

const mapStateToProps = state => {
  const { connection } = state.connectionReducer;
  return { connection };
};

export default connect(mapStateToProps, { isConnected })(Home);