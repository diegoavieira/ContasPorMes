import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import { Header, Body, Icon, Left, Right, Button, Title, Subtitle } from 'native-base';

import { clearFetchBills, fetchBills } from '../actions';

class HeaderRouter extends Component {
  
  _renderLeftButton = () => {
    const { leftButton } = this.props;
    if (leftButton) {
      return (
        <Left>
          <Button transparent onPress={leftButton.onPress}>
            <Icon name={leftButton.icon} />
          </Button>
        </Left>
      ); 
    } else {
      return null;
    };
  }

  _renderRightButton = () => {
    const { rightButton } = this.props;
    if (rightButton) {
      return (
        <Right>
          <Button transparent onPress={rightButton.onPress}>
            <Icon name={rightButton.icon} />
          </Button>
        </Right>
      ); 
    } else {
      return <Right />;
    };
  }

  render() {
    const { title, rightButton } = this.props;
    return (
      <Header>
        {this._renderLeftButton()}
        <Body>
          <Title>{title}</Title>
        </Body>
        {this._renderRightButton()}
      </Header>
    );
  }
}

const styles = StyleSheet.create({

});

const mapStateToProps = state => {
  const { connection } = state.connectionReducer;
  return { connection };
}

export default connect(mapStateToProps, { clearFetchBills, fetchBills })(HeaderRouter);