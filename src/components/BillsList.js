import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RefreshControl, FlatList, View } from 'react-native';

import { fetchBills, clearFetchBills } from '../actions';
import BillsListItem from './BillsListItem';
import QuickNotification from './QuickNotification';

class BillsList extends Component {
  
  componentDidMount() {
    this.props.fetchBills();
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
    this._renderQuickNotification();
  }

  _renderBillsList = () => {
    const { bills } = this.props;
    if (bills.data) {
      return (
        <FlatList
          data={bills.data}
          keyExtractor={(item, index) => item.id}
          renderItem={
            ({ item }) => <BillsListItem bill={item} />
          }
          refreshControl={
            <RefreshControl
              refreshing={bills.loading}
              onRefresh={this._refreshBillsList}
              progressBackgroundColor='snow'
              colors={['slategray']}
            />
          }
        />
      );
    } else {
      return null;
    };
  }

  render() {
    const { bills } = this.props;
    return (
      <View style={{ backgroundColor: 'snow', flex: 1, justifyContent: 'space-between' }}>
        {this._renderBillsList()}
        {this._renderQuickNotification()}
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { bills } = state.billsReducer;
  const { connection } = state.connectionReducer;
  return { bills, connection };
};

export default connect(mapStateToProps, { fetchBills, clearFetchBills })(BillsList);