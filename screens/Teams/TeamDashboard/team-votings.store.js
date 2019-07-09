import { observable, computed } from 'mobx'
import { lastResults } from './last-results'

class TeamVotingsStore {
    @observable votings = []
    @observable currentSprintIndex = 0
    @observable comparedSprintIndex = 0

    @computed get lastResults() {
        return lastResults(this.votings)
    }

    setVotings(votings) {
        this.votings = votings
        this.currentSprintIndex = votings.length - 1
        this.comparedSprintIndex = votings.length - 2
    }

    votingFinished(voting){
        this.votings.push(voting)
    }
}

export default new TeamVotingsStore()
