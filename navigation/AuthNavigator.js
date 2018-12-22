import React from 'react';
import { createStackNavigator } from 'react-navigation';

import RegisterScreen from '../screens/Auth/RegisterScreen';
import VerifyCodeScreen from '../screens/Auth/VerifyCodeScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import WelcomeScreen from '../screens/Auth/WelcomeScreen';

export default createStackNavigator({
    Welcome: WelcomeScreen,
    Login: LoginScreen,
    Register: RegisterScreen,
    Verify: VerifyCodeScreen,
});
