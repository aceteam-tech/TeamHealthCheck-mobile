import Amplify, { Auth } from 'aws-amplify';

Amplify.configure({
    Auth: {
        region: 'eu-west-2',
        userPoolId: 'eu-west-2_8sD6F0I5L',
        userPoolWebClientId: '4leqo5a5ren073iheq7g7qilms',
        identityPoolId: 'eu-west-2:cc96b0d1-0936-4d46-a611-bf8a419970aa'
    },
    Storage: {
        bucket: 'squad-health-check',
        region: 'us-east-1'
    }
});

export const signUp = (email, password, name) => {
    return Auth.signUp({
        username: email,
        password,
        attributes: {
            name
        }
    })
}

export const verify = (username, code) => {
    return Auth.confirmSignUp(username, code)
}

export const login = (username, password) => {
    return Auth.signIn(username, password)
}

export const forgotPassword = (username) => {
    return  Auth.forgotPassword(username)
}

export const forgotPasswordSubmit = (username, code, newPassword) => {
    return  Auth.forgotPasswordSubmit(username, code, newPassword)
}

export const getSession = async () => {
    return Auth.currentSession()
}

export const getUser = async () => {
    return Auth.currentAuthenticatedUser()
}

export const signOut = () => {
    return Auth.signOut()
}