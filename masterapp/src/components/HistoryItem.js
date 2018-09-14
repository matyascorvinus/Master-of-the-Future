import React, { Component } from 'react';
import {
    Text,
    View, Image, TouchableOpacity, TextInput
} from 'react-native';
import firebase from 'react-native-firebase';
const currentTime = new Date().toString()
class HistoryItem extends Component {
    state = { histories: [] }
    onPress = () => {
        var joined = this.state.histories.concat({ time: currentTime, url: this.props.history.url, messageLine: this.state.content });
        //firebase.database().ref('/users').child(`${this.props.history.key}`).set(joined)
        if (joined === 0) return;
        const dataRef = firebase.database().ref('/users').child(`${this.props.history.key}`)

        //1. get array history from firebase

        dataRef.once('value', res => {
            //2. add order to array 
            
            //3. push array to firebase
            res._value !== null ? dataRef.set([...res._value,... joined]) : dataRef.set(joined)

        })
    }
    render() {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 20, color: 'black' }}>{this.props.history.email}</Text>
                <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={{ uri: `${this.props.history.url}`, width: 300, height: 500 }}></Image>
                    <View style={{ height: 100, width: 300, backgroundColor: 'red', color: 'white', borderRadius: 10, margin: 10 }}>
                        <Text style={{ fontSize: 20, color: 'white' }}>{this.props.history.messageLine}</Text>
                    </View>
                </View>
                <TextInput style={{
                    height: 300, width: 350, backgroundColor: 'red', borderRadius: 10,
                    alignItems: 'center', justifyContent: 'center'
                }}
                    placeholder='Hãy viết ra những gì bạn muốn biết' multiline={true}
                    onChangeText={(content) => this.setState({ content })}>
                </TextInput>
                <TouchableOpacity style={{
                    height: 50, width: 350, backgroundColor: 'red',
                    borderRadius: 10, alignItems: 'center', justifyContent: 'center'
                }}
                    onPress={this.onPress}
                >
                    <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>Gửi thư cho bạn đọc</Text>
                </TouchableOpacity>
            </View>
        );
    }
}


export default HistoryItem;