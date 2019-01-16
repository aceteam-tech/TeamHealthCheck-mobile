import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    View,
} from 'react-native';
import {getUser} from '../adapters/auth'
import userStore from '../model/user-store'

export default class AuthLoadingScreen extends React.Component {
    constructor (props) {
        super(props);
        this._bootstrapAsync();
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        try {
            const user = await getUser()
            userStore.setUser(user.attributes)
            this.props.navigation.navigate('TeamsFlow');
        } catch (e) {
            this.props.navigation.navigate('AuthFlow');
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