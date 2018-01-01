import React, { Component } from 'react';
import { Container, Text } from 'native-base';

import HeaderRouter from '../components/HeaderRouter';

class CreateBill extends Component {
  
  toBackScreen = () => {
    const { navigation } = this.props;
    navigation.goBack();
  }

  render() {
    return (
      <Container>
        <HeaderRouter
          title="Nova Conta"
          leftButton={{ icon:'arrow-back', onPress: this.toBackScreen }}
        />
        <Text>Nova Conta</Text>
      </Container>
    );
  }
}

export default CreateBill;