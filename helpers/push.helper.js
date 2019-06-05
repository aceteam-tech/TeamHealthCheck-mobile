import { Permissions, Notifications } from 'expo'
import {registerForPushNotifications} from '../services/connection/adapters/http-api'

export async function register() {
    let { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS)

    if (status !== 'granted') {
        try{
            await Permissions.askAsync(Permissions.NOTIFICATIONS)
            let token = await Notifications.getExpoPushTokenAsync()
            return registerForPushNotifications(token)
        }
        catch(e){
            console.log({'e': e})
        }
    }
}