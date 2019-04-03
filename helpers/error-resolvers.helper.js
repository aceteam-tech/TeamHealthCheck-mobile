export const resolveError = (e, navigation, cb) => {
    switch(e.code){
        case 'UserNotFoundException':
            return {
                description: e.message,
                actionText: 'Register instead',
                action: () => {
                    navigation.navigate('Register')
                    cb()
                }
            }
        case 'NotAuthorizedException':
            return {
                description: e.message,
                actionText: 'Reset your password',
                action: () => {
                    navigation.navigate('ForgotPassword')
                    cb()
                }
            }
        default:
            return {
                description: e.message
            }
    }
}