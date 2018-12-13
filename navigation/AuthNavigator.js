import React from 'react';
import { createStackNavigator } from 'react-navigation';

import RegisterScreen from '../screens/RegisterScreen';
import VerifyCodeScreen from '../screens/VerifyCodeScreen';
import LoginScreen from '../screens/LoginScreen';
import WelcomeScreen from '../screens/WelcomeScreen';

export default createStackNavigator({
    Welcome: WelcomeScreen,
    Login: LoginScreen,
    Register: RegisterScreen,
    Verify: VerifyCodeScreen,
});
