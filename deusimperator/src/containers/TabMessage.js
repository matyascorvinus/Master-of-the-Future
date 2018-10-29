import React, { Component } from 'react';
import {
  Text,
  View, FlatList
} from 'react-native';
import firebase from 'react-native-firebase';

class TabMessage extends Component {
  state = { messages: [] }

  componentDidMount() {
    this.loadHistoriesByUsers()
  }
  loadHistoriesByUsers = () => {
    firebase.database().ref(`users`).child(firebase.auth().currentUser.uid).on('value', res => this.setState({ messages: res._value }))
  }
 // renderItem = ({ item }) => <HistoryItem history={item} />
  render() {
    return (
      <View style={{backgroundColor:'black'}}>
        {/* <FlatList
          style={{ flexGrow: 0 }}
          data={this.state.messages}
          keyExtractor={(item) => item.key}
          renderItem={this.renderItem}
        /> */}
      </View>
    );
  }
}

export default TabMessage;