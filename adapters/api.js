import {Storage} from 'aws-amplify'
import {getSession} from './auth';

const apiUrl = `https://z4evuu990j.execute-api.eu-west-2.amazonaws.com/dev/`

const makeRequest = async (resource, method, body) => {
    try{
        const session = await getSession()
        const headers = {
            Authorization: session.getIdToken().getJwtToken(),
            'Content-Type': 'application/json'
        }
        let params = {
            headers,
            method
        }
        if(body){
            params.body = JSON.stringify(body)
        }
        const response = await fetch(apiUrl+resource, params)
        return response.json()
    } catch(e) {
        console.error(e);
        return e
    }
}

export const myTeams = () => {
    return makeRequest('my-teams', 'GET')
}

export const addTeam = async (teamName) => {
    return makeRequest('my-teams', 'POST', {teamName})
}

export const uploadFile = (filename, file) => {
    return Storage.put(filename, file, {
        customPrefix: {
            public: 'team-logos/'
        }
    })
}