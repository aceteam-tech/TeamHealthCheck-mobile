import {Storage} from 'aws-amplify'
import {getSession} from './auth';

const apiUrl = `https://7kl9tiowqe.execute-api.eu-west-2.amazonaws.com/dev/`

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

export const getMyTeams = async () => {
    return makeRequest('my-teams', 'GET')
}

export const getHealthCheckStatus = async (teamId) => {
    console.log({'teamId': teamId});
    return makeRequest(`health-check/status?teamId=${teamId}`, 'GET')
}

export const getTeam = async (teamId) => {
    return makeRequest(`team?id=${teamId}`, 'GET')
}

export const addTeam = async (teamName) => {
    return makeRequest('my-teams', 'POST', {teamName})
}

export const createHealthCheck = async (teamId) => {
    return makeRequest('health-check', 'POST', {teamId})
}

export const endHealthCheck = async (teamId) => {
    return makeRequest('health-check/end', 'POST', {teamId})
}

export const uploadFile = async (filename, file) => {
    return Storage.put(filename, file, {
        customPrefix: {
            public: 'team-logos/'
        }
    })
}