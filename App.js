import React from 'react';
import {Provider} from 'react-redux';
import configureStore from './src/store';
import {LogBox} from 'react-native';
import AppRouter from './src/router';

const {store, persistor} = configureStore();

LogBox.ignoreLogs(['Warning: ...']);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );
  }
}

export default App;
