import { Permissions, Notifications } from 'expo'
import {registerForPushNotifications} from '../adapters/api'

export async function register() {
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS)

    if (status !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)

        if (status !== 'granted') {
            console.log('User did not grant a permission')
        } else {
            let token = await Notifications.getExpoPushTokenAsync()
            return registerForPushNotifications(token)
        }
    }
}