import React, { Component } from 'react';
import {
    Text,
    View, Image
} from 'react-native';
import uri from 'rn-fetch-blob/utils/uri';

class HistoryItem extends Component {
    state = {}
    render() {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 20, color: 'white' }}>{this.props.history.time}</Text>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <Image source={{ uri: `${this.props.history.url}`, width: 200, height: 200 }}></Image>
                    <View style={{ height: 100, width: 300, backgroundColor: 'red', color: 'white', borderRadius: 10, margin: 10 }}>
                        <Text style={{ fontSize: 20, color: 'white' }}>{this.props.history.messageLine}</Text>
                    </View>
                </View>
               
            </View>
        );
    }
}


export default HistoryItem;