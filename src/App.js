import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { AsyncStorage } from 'react-native';
import { Root, Toast } from 'native-base';
import { persistStore, autoRehydrate } from 'redux-persist';

import Routers from './routers';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);
const store = autoRehydrate()(createStoreWithMiddleware)(reducers);

persistStore(store, { storage: AsyncStorage });

class App extends Component {
  
  componentWillUnmount() {
    Toast.toastInstance = null;
  }

  render() {
    return (
      <Provider store={store}>
        <Root>
          <Routers />
        </Root>
      </Provider>
    );
  }
}

export default App;