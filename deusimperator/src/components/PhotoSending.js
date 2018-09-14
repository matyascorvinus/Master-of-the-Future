import React, { Component } from 'react';
import {
    Text, TouchableOpacity,
    View, StyleSheet, Image, Dimensions, TextInput, Platform,
    KeyboardAvoidingView, ActivityIndicator, ImageBackground
} from 'react-native';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';

import { addHistory } from '../actions'
import RNFetchBlob from 'rn-fetch-blob';
const Blob = RNFetchBlob.polyfill.Blob
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

const sessionID = new Date().getTime()
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
    onCamera = () => {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
            //const sessionID = new Date().getTime()
            const imageRef = firebase.storage().ref('/Pictures/Destiny').child(firebase.auth().currentUser.uid).child(`Picture+${sessionID}`);
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
                var finalUrl = firebaseUrl + 'Pictures%2FDestiny%2F' + `${currentUser}%2F` + `Picture%2B${sessionID}` + "?alt=media";
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
        var joined = this.state.histories.concat({ key: firebase.auth().currentUser.uid, time: currentTime, url: this.state.downURL, messageLine: this.state.content, email: firebase.auth().currentUser.email });
        this.setState({ haveImage: false, histories: joined })

        console.log("Object PPP" + joined)
        //this.props.addHistory(joined)
        firebase.database().ref('/users').child('/history').set(joined)


    }


    render() {
        return (
            <KeyboardAvoidingView style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : null}
                enabled>
                <ImageBackground source={require('../Images/Emperor.jpg')}
                    style={{ width: Dimensions.get('screen').width, height: Dimensions.get('screen').height, justifyContent: 'flex-end', alignItems: 'center' }}>
                    <View style={styles.container}>
                        <Image source={this.state.haveImage === false ? <View /> : this.state.avatarSource} style={{ width: 200, height: 200 }} />
                        <TouchableOpacity style={[styles.button, { backgroundColor: 'orange', margin: 30, width: 250, height: 40 }]} onPress={this.onCamera}>
                            <Text style={{ color: 'white' }}>Chụp ảnh khuôn mặt hoặc chỉ tay</Text>
                        </TouchableOpacity>
                    </View>


                    <TextInput style={{ height: 100, width: 250, backgroundColor: 'orange', color: 'white', borderRadius: 10, marginBottom: 50 }} autoCorrect={false}
                        placeholder='Hãy viết ra những gì bạn muốn biết' multiline={true} maxLength={50} numberOfLines={10}
                        onChangeText={(content) => this.setState({ content })}

                    />
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={[styles.buttonMaster, { backgroundColor: 'orange', marginBottom: 70 }]} onPress={this.onSending}>
                            <Text style={{ color: 'white', fontSize: 32, fontWeight: 'bold' }}>Thỉnh thầy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ justifyContent: 'center', alignContent: 'center', flex: 1, height: 50, backgroundColor: 'orange', borderRadius: 10 }}
                            onPress={() => {
                                firebase.auth().signOut().then(() => this.props.navigation.navigate('LoginScreen'))
                            }}>
                            <Text style={{ fontSize: 15, color: 'white', marginLeft: 10 }}>Đăng xuất</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </KeyboardAvoidingView>

        );
    }
}
const styles = StyleSheet.create({
    container: {

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
        height: 50,
        width: 250,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,

    }
})

const mapStateToProps = ({ history }) => ({ history })
export default connect(mapStateToProps, { addHistory })(PhotoSending);