import { observable } from 'mobx'
import { getMyTeams } from '../services/connection/adapters/http-api'

class ObservableTeamsStore {
    @observable teams = []

    async fetchTeams(){
        const teams = await getMyTeams()
        this.teams = teams
        return teams
    }
}

export default new ObservableTeamsStore()
