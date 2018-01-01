import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, List, ListItem , Body, Text, Button } from 'native-base';

import { fetchBills } from '../actions';
import Loading from './Loading';

class BillsList extends Component {

  componentDidMount() {
    this.props.fetchBills();
  }
  
  renderBillsRow = bill => {
    return (
      <ListItem>
        <Body>
          <Text>{bill.title}</Text>
          <Text note>Teste teste teste</Text>
        </Body>
      </ListItem>
    );
  }

  renderBillsList = () => {
    const { bills } = this.props;
    if (bills.success === false) {
      return <Text>{bills.message}</Text>
    };
    return (
      <List dataArray={bills.data} renderRow={this.renderBillsRow} ></List>
    );
  }
  
  render() {
    const { bills } = this.props;
    const loading = bills.loading ? <Loading /> : null;
    return (
      <Container>
        <Button warning onPress={this.props.fetchBills}>
          <Text>Reload!</Text>
        </Button>
        {loading}
        {this.renderBillsList()}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const { bills } = state.billsReducer;
  const { online } = state.connectionReducer;
  return { bills, online };
};

export default connect(mapStateToProps, { fetchBills })(BillsList);