import {CognitoUserPool} from 'amazon-cognito-identity-js'

var poolData = {
    UserPoolId : 'eu-west-2_yHlHtMIYI',
    ClientId : '7p91oe8imidq26nptcuja7n532'
};
export const userPool = new CognitoUserPool(poolData);

