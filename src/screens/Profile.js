import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    AsyncStorage,
    Image,
    StyleSheet,
    Alert,
} from 'react-native';
import { Icon } from 'native-base';
import BottomTab from '../components/bottomTab';
import { NavigationEvents } from 'react-navigation';
import Geocoder from 'react-native-geocoder';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Database, Auth } from '../publics/firebase/index'


export default class Home extends Component {
    state = {
        name: '',
        userid: '',
        email: '',
        telp: '',
        photo: '',
        latitude: '',
        longitude: '',
        address: null,
    };
    constructor(props) {
        super(props);
        AsyncStorage.getItem('email').then(value => {
            this.setState({ email: value });
        });
        AsyncStorage.getItem('userid').then(value => {
            this.setState({ userid: value });
        });
        AsyncStorage.getItem('name').then(value => {
            this.setState({ name: value });
        });
        AsyncStorage.getItem('latitude').then(value => {
            this.setState({ latitude: value });
        });
        AsyncStorage.getItem('longitude').then(value => {
            this.setState({ longitude: value });
        });
        AsyncStorage.getItem('telp').then(value => {
            this.setState({ telp: value });
        });
        AsyncStorage.getItem('photo').then(value => {
            this.setState({ photo: value });
        });
    }

    LOG_OUT = async () => {
        const userToken = await AsyncStorage.getItem('id_firebase');
        Database.ref('/Pembeli/' + userToken).update({ status: "offline" })
        AsyncStorage.removeItem('userid');
        AsyncStorage.removeItem('jwToken');
        AsyncStorage.removeItem('role_id')
        Auth.signOut().then(() => {
            this.setState({ isLogin: false });
            this.setState({ data: [] });
            Alert.alert('Logout', 'Logout success', [
                {
                    text: 'OK',
                    onPress: () => this.props.navigation.navigate('Auth'),
                },
            ]);
        }).catch(error => { alert(error.message) })
    };
    EditProfile = () => {
        Alert.alert('Still Development');
    };

    render() {
        var lat = -7.7584928
        var lng = 110.3781484
        var Location = { lat, lng };
        Geocoder.geocodePosition(Location).then(res => {
            this.setState({
                address: res[0].formattedAddress,
            });
        });
        return (
            <View style={{ flex: 1, backgroundColor: '#eee' }}>
                <NavigationEvents
                    onWillFocus={() =>
                        AsyncStorage.getItem('email').then(value => {
                            this.setState({ email: value });
                        })
                    }
                />
                <NavigationEvents
                    onWillFocus={() =>
                        AsyncStorage.getItem('name').then(value => {
                            this.setState({ name: value });
                        })
                    }
                />
                <NavigationEvents
                    onWillFocus={() =>
                        AsyncStorage.getItem('telp').then(value => {
                            this.setState({ telp: value });
                        })
                    }
                />
                <NavigationEvents
                    onWillFocus={() =>
                        AsyncStorage.getItem('photo').then(value => {
                            this.setState({ photo: value });
                        })
                    }
                />
                <View style={styles.linearGradient}>
                    <View style={{ marginLeft: '85%', marginTop: '4%' }}>
                        <TouchableOpacity onPress={this.LOG_OUT}>
                            <Icon name="exit" type="Ionicons" color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ flex: 3, alignItems: 'center' }}>
                            <Image
                                style={{
                                    width: 130,
                                    height: 130,
                                    borderRadius: 65,
                                    marginBottom: 15,
                                    backgroundColor: '#fff',
                                    marginTop: 20,
                                }}
                                source={{ uri: this.state.photo }}
                            />
                            <Text
                                style={{
                                    color: '#fff',
                                    fontSize: 25,
                                    fontWeight: 'bold',
                                    marginTop: 20,
                                }}>
                                {this.state.name}
                            </Text>
                            <Text
                                style={{
                                    color: '#fff',
                                    fontSize: 15,
                                    marginTop: 25,
                                    justifyContent: 'center',
                                    textAlign: 'center',
                                }}>
                                {this.state.address}
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={{ flex: 1, alignItems: 'center' }}>
                    <View
                        style={styles.linearGradientB}>
                        <View style={{}}>
                            <Text style={{ alignSelf: 'center', marginBottom: 10, color: 'white', fontSize: 20 }}>Contact</Text>
                            <Text style={{ color: 'white', width: '100%', borderTopWidth: 1, padding: 10 }}>Email : {this.state.email}</Text>
                            <Text style={{ color: 'white', width: '100%', borderTopWidth: 1, padding: 10 }}>Handphone : {this.state.telp}</Text>
                        </View>
                    </View>
                    <TouchableHighlight onPress={this.EditProfile} style={styles.linearGradientB}>
                        <View>
                            <Text style={{ alignSelf: 'center', marginBottom: 10, color: 'white', fontSize: 20 }}>Edit Profile</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <BottomTab />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        backgroundColor: '#008000',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    linearGradientB: {
        marginTop: 30,
        borderRadius: 9,
        elevation: 1,
        padding: 15,
        backgroundColor: '#008000',
    },
});
