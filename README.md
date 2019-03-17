# Requirements
1. node >= v9.8.0
2. yarn
3. expo-cli

# Development
1.  Create `.env` file in the root folder with app parameters

    - CLIENT_ID - aws 'userPoolWebClientId'
    - USER_POOL_ID - aws user pool id
    - API_URL - aws api gateway address

    example of .env file with staging environment parameters :
    ```
    CLIENT_ID=7j048gs5jnvh1b2oe6sighllvd
    USER_POOL_ID=eu-west-2_wZIIzNgND

    API_URL=https://mi9640dq32.execute-api.eu-west-2.amazonaws.com/staging
    ```

2. You are ready to go! type `yarn start`