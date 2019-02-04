import { observable, computed } from 'mobx'
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

    setTeam(team) {
        this.team = team
    }

    setHealthChecks(healthChecks) {
        this.healthChecks = healthChecks
    }
}

export default new ObservableTeamStore()
