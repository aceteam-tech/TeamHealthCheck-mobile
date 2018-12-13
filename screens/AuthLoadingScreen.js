import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    View,
} from 'react-native';
import {getUser} from '../adapters/auth'

export default class AuthLoadingScreen extends React.Component {
    constructor (props) {
        super(props);
        this._bootstrapAsync();
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        try {
            const user = await getUser()
            this.props.navigation.navigate('Main');
        } catch (e) {
            this.props.navigation.navigate('Auth');
        }
    };

    // Render any loading content that you like here
    render () {
        return (
            <View>
                <ActivityIndicator/>
                <StatusBar barStyle="default"/>
            </View>
        );
    }
}