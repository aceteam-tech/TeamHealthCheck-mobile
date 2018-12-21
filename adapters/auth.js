import Amplify, { Auth } from 'aws-amplify';

Amplify.configure({
    Auth: {
        region: 'eu-west-2',
        userPoolId: 'eu-west-2_yHlHtMIYI',
        userPoolWebClientId: '7p91oe8imidq26nptcuja7n532',
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
        .then(data => console.log(data))
        .catch(err => console.log(err));
}

export const verify = (username, code) => {
    return Auth.confirmSignUp(username, code)
        .then(data => console.log(data))
        .catch(err => console.log(err));
}

export const login = (username, password) => {
    return Auth.signIn(username, password)
        .then(user => console.log(user))
        .catch(err => console.log(err));
}

export const getSession = () => {
    return Auth.currentSession()
}

export const getUser = () => {
    return Auth.currentAuthenticatedUser()
}

export const signOut = () => {
    return Auth.signOut()
}