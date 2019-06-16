import { observable, computed } from 'mobx'
import { lastResults } from '../logic/last-results'

class ObservableTeamStore {
    @observable teams = []

    @observable team = {
        name: '',
        users: []
    }

    @observable healthChecks = []

    @computed get lastResults() {
        return lastResults(this.healthChecks)
    }

    setTeam(team) {
        this.team = team
    }

    setHealthChecks(healthChecks) {
        this.healthChecks = healthChecks
    }

    votingFinished(voting){
        this.healthChecks.push(voting)
    }
}

export default new ObservableTeamStore()
