import React, { Component } from 'react';

import PhotoSending from '../components/PhotoSending';
import SplashScreen from './SplashScreen';
import LoginScreen from './LoginScreen'
import { createBottomTabNavigator, createSwitchNavigator } from 'react-navigation';


import Orientation from 'react-native-orientation';


import TabHistory from './TabHistory';
import TabMessage from './TabMessage';

import Icon from 'react-native-vector-icons/Entypo';

import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import configureStore from '../configureStore';
const { store, persistor } = configureStore()


const BottomNavigation = createBottomTabNavigator(
  {
    Photo: PhotoSending,
    History: TabHistory,
    Message: TabMessage
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Photo') {
          iconName = `image`;
        } else if (routeName === 'Message') {
          iconName = `message`;
        }
        else if (routeName === 'History') {
          iconName = `book`;
        }
        return <Icon name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'black',
      inactiveTintColor: 'gray',
      style: {
        backgroundColor: 'white'
      }
    },
  }
)
const SwitchNavigation = createSwitchNavigator({
  SplashScreen: SplashScreen,
  LoginScreen: LoginScreen,
  HomeScreen: BottomNavigation,
})
console.disableYellowBox = true;
class App extends Component {
  state = {}

 
  render() {
    Orientation.lockToPortrait()
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SwitchNavigation />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;