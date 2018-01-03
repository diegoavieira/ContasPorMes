import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RefreshControl } from 'react-native';
import { Container, List } from 'native-base';

import { fetchBills, clearFetchBills } from '../actions';
import BillsListItem from './BillsListItem';
import QuickNotification from './QuickNotification';

class BillsList extends Component {
  
  componentDidMount() {
    this.props.fetchBills();
  }
  
  componentDidUpdate() {
    this._renderQuickNotification();
  }

  _renderQuickNotification = () => {
    const { bills, connection } = this.props;
    if (bills.success === false && connection.online) {
      return <QuickNotification message={bills.message} />
    };
    if (bills.success === false && connection.online === false) {
      return <QuickNotification message={connection.message} onCloseButton />
    };
    return null;
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
        {this._renderQuickNotification()}
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