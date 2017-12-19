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

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  signUpUser = (email, password) => {
    this.setState({ loading: true })
    // try {
    //   await firebase.database().ref('messages').push(email);
    // } catch (error) {
    //   console.log(error.toString())
    // }
    // try {
    //   firebase.auth().signInWithEmailAndPassword(email, password)
    //     .then((data) => {
    //       console.log(data)
    //       this.setState({ error: '', loading: false });
    //     })
    //     .catch(() => {
    //       //Login was not successful, let's create a new account
    //       firebase.auth().createUserWithEmailAndPassword(email, password)
    //         .then(() => { this.setState({ error: '', loading: false }); })
    //         .catch(() => {
    //           this.setState({ error: 'Authentication failed.', loading: false });
    //         });
    //     });
    // } catch (error) {
    //   console.log(error.toString())
    // }

    try {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((data) => {
          console.log(data)
          this.setState({ error: '', loading: false });
        })
        .catch((err) => {
          console.log(err)
          this.setState({ error: 'Authentication failed.', loading: false });
        });
    } catch (error) {
      console.log(error.toString())
    }

  }

  SignUpSubmit = () => {
    console.log('sign up button clicked')
    this.signUpUser(this.state.email, this.state.password)
  }
  validateEmail = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (reg.test(this.state.email) === false) this.setState({ emailError: true })
    else this.setState({ emailError: false })
  }
  validatePassword = () => {
    if (this.state.password) this.setState({ passwordError: false })
    else this.setState({ passwordError: true })
  }

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
            <View style={styles.signUpContainer}>
              <Text style={styles.getStartedText}>
                Track your trip over google maps!
              </Text>
              <TouchableOpacity onPress={this.startTrip} style={styles.signUpTouchable}>
                <View style={styles.textInputView}><TextInput style={styles.textInput} editable={!this.state.loading} onBlur={this.validateEmail} placeholder="Email" onChangeText={(email) => this.setState({ email })} keyboardType="email-address" value={this.state.email} />
                  {this.state.emailError && <Text style={styles.errorText}>Enter Valid Email</Text>}
                </View>
                <View style={styles.textInputView}><TextInput style={styles.textInput} editable={!this.state.loading} placeholder="Password" onChangeText={(password) => this.setState({ password })} onBlur={this.validatePassword} secureTextEntry={true} value={this.state.password} />
                  {this.state.passwordError && <Text style={styles.errorText}>Password is Required</Text>}
                </View>
                {this.state.loading && <Progress.Circle style={{ position: 'absolute', flex: 1, alignSelf: 'center', margin: 'auto' }} size={30} indeterminate={true} />}
                <View style={styles.SignUpButtonView}><Button style={styles.signUpButton} title="Sign up!" color="steelblue" onPress={this.SignUpSubmit} /></View>
              </TouchableOpacity>
            </View>
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