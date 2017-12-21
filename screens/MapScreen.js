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
import { error } from '@firebase/database/dist/esm/src/core/util/util';
const { width, height } = Dimensions.get('window')
import Expo from 'expo';
import { Constants, Location, Permissions } from 'expo';

const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

async function getLocationAsync() {
    const { Location, Permissions } = Expo;
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === 'granted') {
        return Location.getCurrentPositionAsync({ enableHighAccuracy: true });
    } else {
        throw new Error('Location permission not granted');
    }
}

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isMapReady: false,
            mapRegion: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0,
                longitudeDelta: 0
            }
        }
    }

    componentWillMount() {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            console.log('Err')
            this.setState({
                errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
        } else {
            console.log(Platform)
            this._getLocationAsync();
        }
    }
    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }

        let location = await Location.getCurrentPositionAsync({});
        let region = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.00922 * 1.5,
            longitudeDelta: 0.00421 * 1.5
        }
        this.setState({ mapRegion: region });
    };

    startTrip = () => {
        console.log('event')
    }

    onMapLayout = () => {
        this.setState({ isMapReady: true });
    }

    SignUpSubmit = () => {
        console.log('sign up button clicked')
    }

    onRegionChange = (mapRegion) => {
        this.setState({ mapRegion });
    };
    static navigationOptions = ({ navigation }) => {
        return { header: null }
    }


    render() {
        const arrMap = [
            { latitude: this.state.mapRegion.latitude + 0.000003, longitude: this.state.mapRegion.longitude + 0.000003 },
            { latitude: this.state.mapRegion.latitude + 0.000033, longitude: this.state.mapRegion.longitude + 0.000033 },
            { latitude: this.state.mapRegion.latitude + 0.000036, longitude: this.state.mapRegion.longitude + 0.000036 }
        ]
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
                            pointerEvents="none"
                            initialRegion={this.state.mapRegion}
                            onRegionChange={this.onRegionChange}
                        >
                            {this.state.isMapReady && <MapView.Marker
                                coordinate={{ latitude: this.state.mapRegion.latitude, longitude: this.state.mapRegion.longitude }}
                                title={'test'}
                                description={'description'}
                            />}
                            <MapView.Polyline coordinates={arrMap} strokeColor={'steelblue'} />
                        </MapView>
                    </ScrollView>}
            </View>
        );
    }
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