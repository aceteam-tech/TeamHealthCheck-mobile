import { Storage } from 'aws-amplify'
import { API_URL } from 'babel-dotenv'
import { getSession } from './auth'

const makeRequest = async (resource, method, body) => {
    try {
        const session = await getSession()
        const headers = {
            Authorization: session.getIdToken().getJwtToken(),
            'Content-Type': 'application/json'
        }
        const params = {
            headers,
            method
        }
        if (body) {
            params.body = JSON.stringify(body)
        }
        const response = await fetch(API_URL + resource, params)
        return response.json()
    } catch (e) {
        console.error(e)
        return e
    }
}

export const getMyTeams = async () => makeRequest('my-teams', 'GET')

export const getHealthCheckStatus = async (teamId) => {
    console.log({ teamId })
    return makeRequest(`health-check/status?teamId=${teamId}`, 'GET')
}

export const getHealthChecks = async teamId => makeRequest(`health-checks?teamId=${teamId}`, 'GET')

export const getTeam = async teamId => makeRequest(`team?id=${teamId}`, 'GET')

export const addTeam = async teamName => makeRequest('my-teams', 'POST', { teamName })

export const joinTeam = async code => makeRequest('join-team', 'POST', { code })

export const createHealthCheck = async teamId => makeRequest('health-check', 'POST', { teamId })

export const endHealthCheck = async teamId => makeRequest('health-check/end', 'POST', { teamId })

export const uploadFile = async (filename, file) => Storage.put(filename, file, {
    customPrefix: {
        public: 'team-logos/'
    }
})
