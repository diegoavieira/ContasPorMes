import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, List } from 'native-base';
import { RefreshControl } from 'react-native';

import { fetchBills, clearFetchBills } from '../actions';
import quickMessage from '../helpers/quickMessage';
import BillsListItem from './BillsListItem';

class BillsList extends Component {
  
  componentDidMount() {
    this.props.fetchBills();
  }
  
  componentDidUpdate() {
    const { bills, connection } = this.props;
    if (bills.success  && connection.online) {
      quickMessage({ text: bills.message, type: 'success' });
    };
    if (bills.success === false && connection.online) {
      quickMessage({ text: bills.message, type: 'danger' });
    };
    if (bills.success === false && connection.online === false) {
      quickMessage({ text: connection.message });
    };
  }

  componentWillUnmount() {
    console.log('willUnmount')
    this.props.clearFetchBills();
  }

  _refreshBillsList = () => {
    this.props.clearFetchBills();
    this.props.fetchBills();
  }

  _renderBillsList = () => {
    const { bills } = this.props;
    if (bills.data) {
      return (
        <List
          dataArray={bills.data}
          renderRow={bill =>
            <BillsListItem bill={bill} />
          }
          refreshControl={
            <RefreshControl
              refreshing={bills.loading}
              onRefresh={this._refreshBillsList}
            />
          }
        >
        </List>
      );
    } else {
      return null;
    };
  }

  render() {
    return (
      <Container>
        {this._renderBillsList()}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const { bills } = state.billsReducer;
  const { connection } = state.connectionReducer;
  return { bills, connection };
};

export default connect(mapStateToProps, { fetchBills, clearFetchBills })(BillsList);