import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NetInfo } from 'react-native';
import { Container, Header, Button, Text } from 'native-base';

import { isConnected } from '../actions';
import HeaderRouter from '../components/HeaderRouter';
import BillsList from '../components/BillsList';

class Home extends Component {
  
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
      <Container>
        <HeaderRouter
          title="ContasPorMês"
          rightButton={{icon:'add', onPress: this._toCreateBill }}
        />
        <BillsList />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const { connection } = state.connectionReducer;
  return { connection };
};

export default connect(mapStateToProps, { isConnected })(Home);