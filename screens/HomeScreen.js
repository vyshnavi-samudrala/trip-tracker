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
import "prop-types"; // 15.6.0
import firebase from './firebase'
import * as Progress from 'react-native-progress';
import LoginScreen from './LoginScreen'
import SignUpScreen from './SignUpScreen'
import MapScreen from './MapScreen'
import {
  StackNavigator,
} from 'react-navigation'

class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
  }
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios'
          ? <ScrollView style={styles.container} contentContainerStyle={styles.contentContainerIos}>
            <View style={styles.getStartedContainer}>
              <Text style={styles.getStartedText}>
                Oops! This project is available only in Android
            </Text>
            </View>
          </ScrollView>
          : <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.signUpContainer}>
              <Text style={styles.getStartedText}>
                Track your trip over google maps!
              </Text>
              <View style={styles.SignUpButtonView}>
                <TouchableOpacity onPress={() => navigate('SignUp')} style={styles.signUpTouchable}><Button style={styles.signUpButton} title="Sign Up!" color="steelblue" onPress={() => navigate('SignUp', { PageError: null })} /></TouchableOpacity>
              </View>
              <View style={styles.SignUpButtonView}>
                <TouchableOpacity onPress={() => navigate('Login')} style={styles.signUpTouchable}><Button style={styles.signUpButton} title="Login!" color="steelblue" onPress={() => navigate('Login', { PageError: null })} /></TouchableOpacity>
              </View>
              <Button title="map" onPress={() => navigate('MapScreen')} />
            </View>
          </ScrollView>}
      </View>
    );
  }
}

const HomeScreenNav = StackNavigator({
  Home: { screen: HomeScreen },
  SignUp: { screen: SignUpScreen },
  Login: { screen: LoginScreen },
  MapScreen: { screen: MapScreen }
}, { headerMode: 'none' });

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
  signUpContainer: {
    margin: 20,
    justifyContent: 'center',
    flex: 1
  },
  contentContainer: {
    paddingTop: 0,
    flex: 1
  },
  textInput: {
    width: 250,
    alignSelf: 'center',
    height: 45
  },
  SignUpButtonView: {
    margin: 20,
    width: 100,
    alignSelf: 'center'
  },
  errorText: {
    fontSize: 10,
    color: 'red',
    textAlign: 'center'
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
  }
});

export default HomeScreenNav
