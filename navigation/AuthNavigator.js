import React from 'react';
import { createStackNavigator } from 'react-navigation';

import RegisterScreen from '../screens/RegisterScreen';
import VerifyCodeScreen from '../screens/VerifyCodeScreen';
import LoginScreen from '../screens/LoginScreen';

export default createStackNavigator({
    Login: LoginScreen,
    Register: RegisterScreen,
    Verify: VerifyCodeScreen,
});
