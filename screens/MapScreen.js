import React from 'react';
import {
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    Button,
    TouchableOpacity,
    View,
    Dimensions,
    TextInput,
} from 'react-native';
import MapView from 'react-native-maps' // 0.19.0
import "prop-types"; // 15.6.0
// import * as firebase from "firebase"

// firebase.initializeApp({
//   apiKey: "AIzaSyDbbjoIMP9zKELfLx2SE4_yuAT1Xfv2oKg",
//   authDomain: "trip-tracking-4da82.firebaseapp.com",
//   databaseURL: "https://trip-tracking-4da82.firebaseio.com",
//   storageBucket: "trip-tracking-4da82.appspot.com",
//   messagingSenderId: "893836079567",
//   projectId: "trip-tracking-4da82"
// });

// async function signUpUser(email, pass) {
//   try {
//     await firebase.auth()
//       .createUserWithEmailAndPassword(email, pass);

//     console.log("Account created");

//     // Navigate to the Home page, the user is auto logged in

//   } catch (error) {
//     console.log(error.toString())
//   }
// }


export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isMapReady: false,
            mapRegion: { latitude: 13.0827, longitude: 80.2707, latitudeDelta: 0.4, longitudeDelta: 0.3 }
        }
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latDelta = Number(position.coords.latitude) - Number(position.coords.latitude)
                const lngDelta = Number(position.coords.longitude) - Number(position.coords.longitude)
                this.setState({
                    mapRegion: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: latDelta,
                        longitudeDelta: lngDelta
                    }
                });
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
    }

    startTrip = () => {
        console.log('event')
    }

    onMapLayout = () => {
        this.setState({ isMapReady: true });
    }

    SignUpSubmit = () => {
        console.log('sign up button clicked')
    }

    _handleMapRegionChange = mapRegion => {
        console.log(mapRegion)
        this.setState({ mapRegion });
        // this.getMaps
    };

    render() {
        return (
            <View style={styles.container}>
                {Platform.OS === 'ios'
                    ? <ScrollView style={styles.container} contentContainerStyle={styles.contentContainerIos}>
                        <View style={styles.getStartedContainer}>
                            <Text style={styles.getStartedText}>
                                Oops this project is available only in Android
            </Text>
                        </View>
                    </ScrollView>
                    : <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                        <View style={styles.getStartedContainer}>
                            <Text style={styles.getStartedText}>
                                Track your trip over google maps!
              </Text>
                        </View>

                        <View style={styles.SignUpContainer}>
                            <TouchableOpacity onPress={this.startTrip} style={styles.helpLink}>
                                <View style={styles.textInputView}><TextInput style={styles.textInput} placeholder="Email" editable={true} onChangeText={(email) => this.setState({ email })} value={this.state.email} /></View>
                                <View style={styles.textInputView}><TextInput style={styles.textInput} placeholder="Password" editable={true} onChangeText={(password) => this.setState({ password })} value={this.state.password} /></View>
                                <View style={styles.signUpButtonView}><Button style={styles.signUpButton} title="Sign up!" color="#ddd" onPress={this.SignUpSubmit} /></View>
                            </TouchableOpacity>
                        </View>

                        <MapView
                            style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
                            region={this.state.mapRegion}
                            pinColor={'green'}
                            onLayout={this.onMapLayout}
                            initialRegion={this.state.mapRegion}
                            onRegionChange={this._handleMapRegionChange}
                        >
                            {this.state.isMapReady && <MapView.Marker
                                coordinate={{ latitude: this.state.mapRegion.latitude, longitude: this.state.mapRegion.longitude }}
                                title={'test'}
                                description={'description'}
                            />}
                        </MapView>
                    </ScrollView>}
            </View>
        );
    }

    _maybeRenderDevelopmentModeWarning() {
        if (__DEV__) {
            const learnMoreButton = (
                <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
                    Learn more
        </Text>
            );

            return (
                <Text style={styles.developmentModeText}>
                    Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
                </Text>
            );
        } else {
            return (
                <Text style={styles.developmentModeText}>
                    You are not in development mode, your app will run at full speed.
        </Text>
            );
        }
    }

    // _handleLearnMorePress = () => {
    //   WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
    // };

    // _handleHelpPress = () => {
    //   WebBrowser.openBrowserAsync(
    //     'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    //   );
    // };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    developmentModeText: {
        marginBottom: 20,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
    contentContainer: {
        paddingTop: 0,
        flex: 1
    },
    textInput: {
        width: 300,
        height: 40
    },
    SignUpContainer: {
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'column'
    },
    signUpButton: {
        margin: 'auto',
        position: 'absolute',
        alignSelf: 'center',
        width: 100
    },
    contentContainerIos: {
        paddingTop: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    getStartedText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        margin: 12,
        textAlign: 'center',
    },
    helpContainer: {
        marginTop: 15,
        alignItems: 'center',
    },
    helpLink: {
        paddingVertical: 25,
    },
    helpLinkText: {
        fontSize: 14,
        color: '#2e78b7',
    },
});