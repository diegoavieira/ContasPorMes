import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NetInfo } from 'react-native';
import { Container, Header, Button, Text } from 'native-base';

import { isConnected } from '../actions';
import HeaderRouter from '../components/HeaderRouter';
import BillsList from '../components/BillsList';

class Home extends Component {
  
  componentDidMount() {
    NetInfo.addEventListener('connectionChange', this.onConnectivityChange);
    NetInfo.getConnectionInfo().then(connectionInfo => {
      this.props.isConnected(connectionInfo);
    });
  }
  
  componentWillUnmount() {
    NetInfo.removeEventListener('connectionChange', this.onConnectivityChange);
  }
  
  onConnectivityChange = connectionInfo => {
    this.props.isConnected(connectionInfo);
  }

  toCreateBill = () => {
    const { navigation } = this.props;
    navigation.navigate('CreateBill');
  }

  notNetwork = () => {
    const { online } = this.props;
    if (online === false) {
      return (
        <Text>No internet!</Text>
      );
    } else {
      null;
    }
  }

  render() {
    const { online } = this.props;
    return (
      <Container>
        <HeaderRouter
          title="ContasPorMês"
          rightButton={{icon:'add', onPress: this.toCreateBill }}
        />
        {this.notNetwork()}
        <BillsList />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const { online } = state.connectionReducer;
  return { online };
};

export default connect(mapStateToProps, { isConnected })(Home);