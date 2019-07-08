import Amplify, { Auth } from 'aws-amplify'
import { observable, autorun } from 'mobx'
import { CLIENT_ID, USER_POOL_ID } from 'babel-dotenv'
import appStore from '../../../model/app.store'

Amplify.configure({
    Auth: {
        region: 'eu-west-2',
        userPoolId: USER_POOL_ID,
        userPoolWebClientId: CLIENT_ID,
        authenticationFlowType: 'USER_PASSWORD_AUTH'
    },
    Storage: {
        bucket: 'squad-health-check',
        region: 'us-east-1'
    }
})

class AuthStore {
    @observable loggedIn = false
    
    constructor(){
        console.log('AuthStore loaded');
        autorun(() => {
            if(this.loggedIn === false){
                console.log('siema!')
            }
        })
    }

    signUp = (email, password, name) => appStore.apiRequestCalled(Auth.signUp({
        username: email,
        password,
        attributes: {
            name
        }
    }))

    verify = (username, code) => appStore.apiRequestCalled(Auth.confirmSignUp(username, code))

    resendCode = (username) => appStore.apiRequestCalled(Auth.resendSignUp(username))

    login = (username, password) => {
        return appStore.apiRequestCalled(Auth.signIn(username, password), ['UserNotConfirmedException'])
            .then(() => {
                console.log('auth 1')
                this.loggedIn = true
            })
    }

    forgotPassword = username => appStore.apiRequestCalled(Auth.forgotPassword(username))

    forgotPasswordSubmit = (username, code, newPassword) => appStore.apiRequestCalled(Auth.forgotPasswordSubmit(username, code, newPassword))

    getSession = async () => Auth.currentSession()

    getUser = async () => Auth.currentAuthenticatedUser()

    signOut = () => {
        console.log('auth 0')
        this.loggedIn = false
        return appStore.apiRequestCalled(Auth.signOut())
    }
}

export default new AuthStore()