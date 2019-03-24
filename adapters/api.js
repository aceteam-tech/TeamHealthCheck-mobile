import { Storage } from 'aws-amplify'
import { API_URL } from 'babel-dotenv'
import { getSession } from './auth'
import { pathname } from 'join-url'
import appStore from '../model/app.store'

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

        const url = pathname(API_URL, resource)
        const promise = fetch(url, params)
        appStore.apiRequestCalled(promise)
        return promise.then(response => {
            return response.json()
        })
    } catch (e) {
        console.error(e)
        return e
    }
}

export const getMyTeams = async () => makeRequest('my-teams', 'GET')

export const getHealthCheckStatus = async teamId => makeRequest(`health-check/status?teamId=${teamId}`, 'GET')

export const getHealthChecks = async teamId => makeRequest(`health-checks?teamId=${teamId}`, 'GET')

export const getTeam = async teamId => makeRequest(`team?id=${teamId}`, 'GET')

export const addTeam = async teamName => makeRequest('my-teams', 'POST', { teamName })

export const sendStatus = async (healthCheckId, categories) => makeRequest('health-status', 'POST', {
    healthCheckId,
    categories
})

export const joinTeam = async code => makeRequest('join-team', 'POST', { code })

export const createHealthCheck = async teamId => makeRequest('health-check', 'POST', { teamId })

export const endHealthCheck = async teamId => makeRequest('health-check/end', 'POST', { teamId })

export const uploadFile = async (filename, file) => Storage.put(filename, file, {
    customPrefix: {
        public: 'team-logos/'
    }
})
