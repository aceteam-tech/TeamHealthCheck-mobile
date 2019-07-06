import { Storage } from 'aws-amplify'
import { API_URL } from 'babel-dotenv'
import { getSession } from './auth'
import { pathname } from 'join-url'
import appStore from '../../../model/app.store'

const makeRequest = async (resource, method, body, loading = true) => {
    try {
        const session = await getSession()
        const headers = {
            Authorization: 'Bearer ' + session.getIdToken().getJwtToken(),
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
        if(loading){
            appStore.apiRequestCalled(promise)
        }

        return promise.then(response => response.json())
    } catch (e) {
        console.warn({'e': e});
        return e
    }
}

export const getMyTeams = async () => makeRequest('teams', 'GET')
export const addTeam = async teamName => makeRequest('teams', 'POST', { teamName })
export const joinTeam = async code => makeRequest('teams/members', 'POST', { code })
export const removeFromTeam = async (teamId, removedUserId) => makeRequest(`teams/${teamId}/members`, 'DELETE', {
    removedUserId
}, false)

export const createHealthCheck = async teamId => makeRequest('votings', 'POST', { teamId })
export const getHealthCheckStatus = async teamId => makeRequest(`votings/${teamId}`, 'GET')
export const endHealthCheck = async teamId => makeRequest(`votings/${teamId}`, 'PUT' )
export const getHealthChecks = async teamId => makeRequest(`votings/${teamId}/finished`, 'GET')
export const sendStatus = async (teamId, categories) => makeRequest(`votings/${teamId}/vote`, 'POST', {
    categories
})

export const getTeam = async teamId => makeRequest(`team?id=${teamId}`, 'GET')

export const uploadFile = async (filename, file) => Storage.put(filename, file, {
    customPrefix: {
        public: 'team-logos/'
    }
})

export const registerForPushNotifications = async token => makeRequest('push-tokens', 'POST', { token })
