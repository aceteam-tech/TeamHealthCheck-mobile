import { Storage } from 'aws-amplify'
import { API_URL } from 'babel-dotenv'
import { getSession } from './auth'
import { pathname } from 'join-url'
import appStore from '../model/app.store'
import teamStore from '../model/team-store'

const makeRequest = async (resource, method, body) => {
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
        appStore.apiRequestCalled(promise)
        return promise.then(response => {
            return response.json()
        })
    } catch (e) {
        console.error(e)
        return e
    }
}

// const actionHandlers = {
//     getMyTeams: (teams) => teamStore.teams = teams
// }

function initWs() {
    return getSession().then(session => {
        const token = session.getIdToken().getJwtToken()
        const ws = new WebSocket('wss://8zdr8v22dd.execute-api.eu-west-2.amazonaws.com/ws?Authorization=' + token)

        return new Promise((resolve, reject) => {
            ws.onopen = () => {
                console.log('Connection opened!')
                resolve(ws)
            }

            ws.onmessage = (message) => {
                const { action, body } = JSON.parse(message.data)
                console.log({'action': action})
                // actionHandlers[action](body)
            }

            ws.onerror = (e) => {
                // an error occurred
                console.log('error in connection man')
                console.log(e.message)
                reject(ws)
            }
        })
    })
}

// initWs()

export const getMyTeams = async () => makeRequest('teams', 'GET')
export const addTeam = async teamName => makeRequest('teams', 'POST', { teamName })
export const joinTeam = async code => makeRequest('teams/members', 'POST', { code })
export const removeFromTeam = async (teamId, removedUserId) => makeRequest(`teams/${teamId}/members`, 'DELETE', {
    removedUserId
})

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
