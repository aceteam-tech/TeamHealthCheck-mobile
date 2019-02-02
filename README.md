# Requirements
1. node >= v9.8.0
2. yarn
3. expo-cli

# Development
1.  Create `.env` file in the root folder with app parameters

    - IDENTITY_POOL_ID - aws identity pool id
    - CLIENT_ID - aws 'userPoolWebClientId'
    - USER_POOL_ID - aws user pool id
    - API_URL - aws api gateway address

    example of .env file with staging environment parameters :
    ```
    IDENTITY_POOL_ID=eu-west-2:cc96b0d1-0936-4d46-a611-bf8a419970aa
    CLIENT_ID=4leqo5a5ren073iheq7g7qilms
    USER_POOL_ID=eu-west-2_8sD6F0I5L

    API_URL=https://dx7x1182ad.execute-api.eu-west-2.amazonaws.com/staging/
    ```

2. You are ready to go! type `yarn start`