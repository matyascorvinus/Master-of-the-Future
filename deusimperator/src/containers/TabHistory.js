import React, { Component } from 'react';
import {
  Text,
  View,FlatList
} from 'react-native';
import HistoryItem from '../components/HistoryItem';
//import { connect } from 'react-redux';

class TabHistory extends Component {
  state = { history:[
    {
      time: "29/10/2018",
      messageLine: "pLEASE Go"

    },
    {
      time: "30/10/2018",
      messageLine: "pLEASE Go AWAY"
    }
  ] }
  render() {
    renderItem =({item}) =><HistoryItem history={item}/>
    return (
        <View style={{backgroundColor:'#9d262b',justifyContent:'flex-start',alignItems:'center'}}>
        <FlatList
          data={this.state.history}
          keyExtractor={(item) => item.key.toString()}
          renderItem={this.renderItem}
       />
        </View>
    );
  }
}
//const mapStateToProps = ({ history }) => ({ history })
//export default connect(mapStateToProps,null) (TabHistory);
export default TabHistory;