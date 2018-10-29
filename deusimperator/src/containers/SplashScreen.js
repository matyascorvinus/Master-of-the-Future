import React, { Component } from 'react';
import {
    ImageBackground,Dimensions
} from 'react-native';
import firebase, { Firebase } from 'react-native-firebase';

class Splash extends Component {
    state = {}
    componentDidMount() {

        firebase.auth().onAuthStateChanged(res => res !== null ? setTimeout(() => this.props.navigation.navigate('HomeScreen'), 2000)
            : setTimeout(() => this.props.navigation.navigate('LoginScreen')), 2000)
    }
    render() {
        
        return (
            
            <ImageBackground source={require('../Images/EternalRecurrence.jpg')}
                style={{ width: Dimensions.get('screen').width, height: Dimensions.get('screen').height }} />
        );
    }
}

export default Splash;