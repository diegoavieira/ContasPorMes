import React, { Component } from 'react';
import { ListItem, Body, Text } from 'native-base';

class BillsListItem extends Component {
  render() {
    const { bill } = this.props;
    return (
      <ListItem style={{ backgroundColor: 'transparent' }}>
        <Body>
          <Text>{bill.title}</Text>
          <Text note>Teste teste teste</Text>
        </Body>
      </ListItem>
    );
  }
}

export default BillsListItem;