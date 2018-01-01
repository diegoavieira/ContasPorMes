import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Spinner } from 'native-base';

class Loading extends Component {
  render() {
    return (
      <Container style={styles.loading}>
        <Spinner />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  loading: {
    zIndex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
});

export default Loading;