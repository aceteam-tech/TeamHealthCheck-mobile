import { createStackNavigator } from 'react-navigation'

import RegisterScreen from '../screens/Auth/RegisterScreen'
import VerifyCodeScreen from '../screens/Auth/VerifyCodeScreen'
import LoginScreen from '../screens/Auth/LoginScreen'
import ForgotPasswordScreen from '../screens/Auth/ForgotPasswordScreen'
import WelcomeScreen from '../screens/Auth/WelcomeScreen'
import NewPasswordScreen from '../screens/Auth/NewPasswordScreen'

export default createStackNavigator({
    Welcome: WelcomeScreen,
    Login: LoginScreen,
    ForgotPassword: ForgotPasswordScreen,
    NewPassword: NewPasswordScreen,
    Register: RegisterScreen,
    Verify: VerifyCodeScreen,
}, {
    headerMode: 'none'
})
