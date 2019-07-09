import { observable, autorun } from 'mobx'
import { WEBSOCKET_URL } from 'babel-dotenv'
import handleSocketCallback from '../socket-handlers'
import authStore from './auth'

class SocketStore {
    @observable handle = null
    @observable opened = false

    async init() {
        const session = await authStore.getSession()
        const token = session.getIdToken().getJwtToken()
        this.handle = new WebSocket(`${WEBSOCKET_URL}?Authorization=${token}`)
        this.mountEvents()
    }

    mountEvents() {
        this.handle.onopen = () => {
            console.log('Connection opened!')
            this.opened = true
        }

        this.handle.onmessage = (message) => {
            const data = JSON.parse(message.data)
            console.log({ 'incoming data': data })
            handleSocketCallback(data)
        }

        this.handle.onerror = (e) => {
            console.log('error in connection man')
            console.log(e.message)
            this.opened = false
        }

        this.handle.onclose = async () => {
            console.log('closed. Reconnecting...')
            await this.init()
        }
    }

    close() {
        this.handle.onclose = () => console.log('Connection closed (user logged out)')
        this.handle.close()
        this.opened = false
    }
}

export default new SocketStore()
