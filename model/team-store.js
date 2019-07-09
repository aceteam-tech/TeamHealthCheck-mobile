import { observable } from 'mobx'
import { AsyncStorage } from 'react-native'

class ObservableTeamStore {
    @observable team = {
        name: '',
        users: []
    }

    async getTeamId(){
        return this.team.id || AsyncStorage.getItem('teamId')
    }

    async setTeam(team) {
        this.team = team
        await AsyncStorage.setItem('teamId', team.id)
    }

    async resetTeam() {
        this.team = undefined
        await AsyncStorage.removeItem('teamId')
    }

    removeUser(removedUserId){
        this.team = {
            ...this.team,
            users: this.team.users.filter(({id}) => id !== removedUserId)
        }
    }

    rollbackUsers(users){
        this.team.users = users
    }

    newUser(user){
        this.team.users.push(user)
    }
}

export default new ObservableTeamStore()
