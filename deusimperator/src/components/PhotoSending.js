import React, { Component } from 'react';
import {
    Text, TouchableOpacity,
    View, StyleSheet, Image, Dimensions, TextInput, Platform,
    KeyboardAvoidingView, ImageBackground
} from 'react-native';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';

import { addHistory } from '../actions'

//const sessionID = new Date().getTime()
var ImagePicker = require('react-native-image-picker');
var options = {
    title: 'Upload Photo',
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};
const currentTime = new Date().toString()
class PhotoSending extends Component {
    state = { haveImage: false, haveWord: true, histories: [] }

    makeid(numberOfString) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < numberOfString; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    onCamera = () => {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
            const Random = this.makeid(20)
            const imageRef = firebase.storage().ref('/Pictures/Destiny').child(firebase.auth().currentUser.uid).child(`Picture+${Random}`);
            const currentUser = firebase.auth().currentUser.uid;
            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source, haveImage: true, haveWord: false
                });
                imageRef.put(response.uri, { contentType: 'image/jpg' })
                var firebaseUrl = "https://firebasestorage.googleapis.com/v0/b/deusimperator-e9d95.appspot.com/o/"
                var finalUrl = firebaseUrl + 'Pictures%2FDestiny%2F' + `${currentUser}%2F` + `Picture%2B${Random}` + "?alt=media";

                console.log(finalUrl)
                this.setState({ downURL: finalUrl })
                // firebase.auth().currentUser.getIdToken().then((token) => {
                //     fetch(finalUrl, {headers: {'Authorization' : 'Firebase ' + token}})
                //     .then((response) => response.json())
                //     .then((responseJson) => {
                //       var downloadURL = finalUrl + "?alt=media&token=" + responseJson.downloadTokens

                //     })

                //     })
                //console.log("Photo: ")   
                //imageRef.getDownloadURL()

                //https://firebasestorage.googleapis.com/v0/b/deusimperator-e9d95.appspot.com/o/Pictures%2FDestiny%2FFqzG2xpxQSVwaZjVmtmtaUHmhzh2%2FPicture%2B1536856768706?alt=media&token=d62a5aef-d592-4ca6-bff1-d32c40c1154b

            }
        });
    }


    onSending = () => {
        var joined = this.state.histories.concat({ key: firebase.auth().currentUser.uid,
            time: currentTime, url: this.state.downURL, messageLine: this.state.content,
            email: firebase.auth().currentUser.email });
        this.setState({ haveImage: false, histories: joined })

        //console.log("Object PPP" + joined)
        //this.props.addHistory(joined)
        firebase.database().ref('/users').child('/history').set(joined)


    }


    render() {
        return (
            <KeyboardAvoidingView style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : null}
                enabled>
                <ImageBackground source={require('../Images/EternalRecurrence.jpg')}
                    style={{ width: Dimensions.get('screen').width, height: Dimensions.get('screen').height, justifyContent: 'flex-end', alignItems: 'center' }}>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Image source={this.state.haveImage === false ? <View /> : this.state.avatarSource} style={{ width: 200, height: 200 }} />
                        <TouchableOpacity style={[styles.button, { backgroundColor: 'white', margin: 30, width: 250, height: 40, }]} onPress={this.onCamera}>
                            <Text style={{ color: 'black', justifyContent: 'center' }}>Please take a selfie</Text>
                        </TouchableOpacity>
                    </View>


                    <TextInput style={{ height: 100, width: 250, backgroundColor: 'white', color: 'black', borderRadius: 10, marginBottom: 50, }} autoCorrect={false}
                        placeholder='What have you wondered in your future?' multiline={true} maxLength={50} numberOfLines={10} 
                        placeholderTextColor='black'
                        onChangeText={(content) => this.setState({ content })}

                    />
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={[styles.buttonMaster, { backgroundColor: 'white',height: 50, marginBottom: 70, }]} onPress={this.onSending}>
                            <Text style={{ color: 'black', fontSize: 14 }}>Send</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ justifyContent: 'center', 
                        alignContent: 'center', flex: 1, height: 50, backgroundColor: 'white', borderRadius: 10, }}
                            onPress={() => {
                                firebase.auth().signOut().then(() => this.props.navigation.navigate('LoginScreen'))
                            }}>
                            <Text style={{
                                fontSize: 15, color: 'black',
                                marginLeft: 10, justifyContent: 'center', alignContent: 'center'
                            }}>             Log out</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </KeyboardAvoidingView>

        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'

    },
    button: {
        borderRadius: 10,
        height: 40,
        width: 200,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,

    },
    buttonMaster: {
        borderRadius: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,

    }
})

const mapStateToProps = ({ history }) => ({ history })
export default connect(mapStateToProps, { addHistory })(PhotoSending);