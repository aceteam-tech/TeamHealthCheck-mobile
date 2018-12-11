import {userPool} from '../config/cognito'
import {CognitoUserAttribute, CognitoUser, AuthenticationDetails} from 'amazon-cognito-identity-js'

export const signUp = (email, password, name) => {
    var attributeName = new CognitoUserAttribute({
        Name : 'name',
        Value : name
    });
    const attributes = [attributeName]
    return new Promise((resolve, reject) => {
        userPool.signUp(email, password, attributes, null, function(err, result){
            if (err) {
                alert(err.message || JSON.stringify(err));
                reject(err)
            }
            var cognitoUser = result.user;
            resolve(cognitoUser)
        });
    })
}

export const verify = (username, code) => {
    var userData = {
        Username : username,
        Pool : userPool
    };
    var cognitoUser = new CognitoUser(userData);
    return new Promise((resolve, reject) => {
        cognitoUser.confirmRegistration(code, true, function (err, result) {
            if (err) {
                alert(err.message || JSON.stringify(err));
                reject(err)
            }
            resolve(result)
        });
    })
}

export const login = (username, password) => {
    var authenticationData = {
        Username : username,
        Password : password,
    };
    var authenticationDetails = new AuthenticationDetails(authenticationData);

    var userData = {
        Username : username,
        Pool : userPool
    };
    var cognitoUser = new CognitoUser(userData);
    return new Promise((resolve, reject) => {
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
                resolve(result.getAccessToken().getJwtToken())
            },
            onFailure: function(err) {
                alert(err.message || JSON.stringify(err))
                reject(err)
            },
        });
    })

}