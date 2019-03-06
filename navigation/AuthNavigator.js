import { createStackNavigator } from 'react-navigation'

import {Welcome, Login, ForgotPassword, NewPassword, Register, VerifyCode} from '../screens/auth'

export default createStackNavigator({
    Welcome,
    Login,
    ForgotPassword,
    NewPassword,
    Register,
    Verify: VerifyCode,
}, {
    headerMode: 'none'
})
