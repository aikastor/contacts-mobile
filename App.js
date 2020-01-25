import React, {Component} from 'react';
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleware from 'redux-thunk'
import {Provider} from "react-redux";
import contactsReducer from "./store/reducers/contactsReducer";
import { Container} from 'native-base';
import Contacts from "./containers/Contacts";
import {StyleSheet} from "react-native";
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

const rootReducer = combineReducers({
  contacts: contactsReducer,
});
const store = createStore(rootReducer,applyMiddleware(thunkMiddleware));

class App extends Component {

  state = {
    isReady: false,
  };
  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }
  render() {

    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
        <Provider store={store}>
          <Container>
            <Contacts/>
          </Container>
        </Provider>
    );
  }

}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
