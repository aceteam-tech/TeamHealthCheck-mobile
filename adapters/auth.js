import Amplify, { Auth } from 'aws-amplify';

Amplify.configure({
    Auth: {
        region: 'eu-west-2',
        userPoolId: 'eu-west-2_iFqVx5R66',
        userPoolWebClientId: '4508nt753g645odnpv91p2c501',
        identityPoolId: 'eu-west-2:1a4f044b-e90c-48cc-9c11-a1b557c6367e'
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