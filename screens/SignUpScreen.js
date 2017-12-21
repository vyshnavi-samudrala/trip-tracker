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

export default class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false
        }
    }
    static navigationOptions = ({ navigation }) => {
        const { goBack } = navigation;
        let headerLeft = <Text style={{ color: '#000', fontSize: 20, marginLeft: 20 }} onPress={() => goBack()}>&larr;</Text>
        let title = 'Sign Up'
        return { headerLeft, title }
    }

    signUpUser = (email, password) => {
        this.setState({ loading: true })
        try {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(() => {
                    this.setState({ loading: false });
                    const { navigate } = this.props.navigation
                    navigate('Login', { PageError: 'Successfully Registered, Please login!' })
                })
                .catch((error) => {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    if (errorCode == 'auth/weak-password') {
                        this.setState({ loading: false }, alert(errorMessage));
                    } else if (errorCode == 'auth/email-already-in-use') {
                        const { navigate } = this.props.navigation
                        navigate('Login', { PageError: 'Email already exists, Please login!' })
                    } else {
                        this.setState({ loading: false, email: '', password: '' }, alert(errorMessage));
                    }
                    console.log(error)
                })
        } catch (error) {
            console.log(error)
        }

    }

    SignUpSubmit = () => {
        if (this.validateEmail() && this.validatePassword()) {
            this.signUpUser(this.state.email, this.state.password)
        }
    }
    validateEmail = () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (reg.test(this.state.email) === false) {
            this.setState({ emailError: true })
            return false
        }
        else {
            this.setState({ emailError: false })
            return true
        }
    }
    validatePassword = () => {
        if (this.state.password) {
            this.setState({ passwordError: false })
            return true
        }
        else {
            this.setState({ passwordError: true })
            return false
        }
    }

    render() {
        const { state } = this.props.navigation;
        const PageError = state.params.PageError
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
                            {PageError && <Text style={styles.pageErrorText}>{PageError}</Text>}
                            <View style={styles.textInputView}><TextInput style={styles.textInput} editable={!this.state.loading} onBlur={this.validateEmail} placeholder="Email" onChangeText={(email) => this.setState({ email })} keyboardType="email-address" value={this.state.email} />
                                {this.state.emailError && <Text style={styles.errorText}>Enter Valid Email</Text>}
                            </View>
                            <View style={styles.textInputView}><TextInput style={styles.textInput} editable={!this.state.loading} placeholder="Password" onChangeText={(password) => this.setState({ password })} onBlur={this.validatePassword} secureTextEntry={true} value={this.state.password} />
                                {this.state.passwordError && <Text style={styles.errorText}>Password is Required</Text>}
                            </View>
                            {this.state.loading && <Progress.Circle style={{ position: 'absolute', flex: 1, alignSelf: 'center', margin: 'auto' }} size={30} indeterminate={true} />}
                            <View style={styles.SignUpButtonView}>
                                <TouchableOpacity onPress={this.startTrip} style={styles.signUpTouchable}><Button style={styles.signUpButton} title="Sign up!" color="steelblue" onPress={this.SignUpSubmit} /></TouchableOpacity>
                            </View>
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
    pageErrorText: {
        fontSize: 10,
        color: 'red',
        lineHeight: 24,
        margin: 12,
        textAlign: 'center',
    },
    helpContainer: {
        marginTop: 15,
        alignItems: 'center',
    }
});