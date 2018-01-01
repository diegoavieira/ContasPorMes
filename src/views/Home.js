import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NetInfo } from 'react-native';
import { Container, Header, Button, Text } from 'native-base';

import { isConnected } from '../actions';
import HeaderRouter from '../components/HeaderRouter';
import quickMessage from '../helpers/quickMessage';
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
    this._renderNoConnection();
  }

  _toCreateBill = () => {
    const { navigation } = this.props;
    navigation.navigate('CreateBill');
  }

  _renderNoConnection = () => {
    const { connection } = this.props;
    if (connection.online === false) {
      return <Text style={{ textAlign: 'center', padding: 10, backgroundColor: '#ffffff' }}>{connection.message}</Text>;
    };
    return null;
  }

  render() {
    return (
      <Container>
        <HeaderRouter
          title="ContasPorMês"
          rightButton={{icon:'add', onPress: this._toCreateBill }}
        />
        {this._renderNoConnection()}
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