import Amplify, { Auth } from 'aws-amplify';
import {CLIENT_ID, IDENTITY_POOL_ID, USER_POOL_ID} from 'babel-dotenv'

Amplify.configure({
    Auth: {
        region: 'eu-west-2',
        userPoolId: USER_POOL_ID,
        userPoolWebClientId: CLIENT_ID,
        identityPoolId: IDENTITY_POOL_ID
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