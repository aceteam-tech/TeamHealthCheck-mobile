import { observable } from 'mobx'
import { addTeam, getMyTeams, joinTeam } from '../services/connection/adapters/http-api'
import teamStore from './team-store'

class ObservableTeamsStore {
    @observable teams = []

    async fetchTeams(){
        const teams = await getMyTeams()
        this.teams = teams
        return teams
    }

    async addTeam(name){
        const team = await addTeam(name)
        this.teams.push(team)
    }

    async joinTeam(code){
        try{
            const team = await joinTeam(code)
            this.teams.push(team)
            await teamStore.setTeam(team)
        } catch (e) {
            console.warn(e)
        }
    }
}

export default new ObservableTeamsStore()
