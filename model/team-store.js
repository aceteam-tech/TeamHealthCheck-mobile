import { observable, computed } from 'mobx'
import { AsyncStorage } from 'react-native'
import { lastResults } from '../logic/last-results'

class ObservableTeamStore {
    @observable team = {
        name: '',
        users: []
    }

    @observable healthChecks = []

    @computed get lastResults() {
        return lastResults(this.healthChecks)
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

    setHealthChecks(healthChecks) {
        this.healthChecks = healthChecks
    }

    votingFinished(voting){
        this.healthChecks.push(voting)
    }
}

export default new ObservableTeamStore()
