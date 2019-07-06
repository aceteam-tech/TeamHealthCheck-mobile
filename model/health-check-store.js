import { observable } from 'mobx'

class ObservableHealthCheckStore {
    @observable healthCheck = {
        usersSubmitted: [],
        ended: true
    }

    setHealthCheck(healthCheck) {
        this.healthCheck = healthCheck
    }

    userVoted = (user) => {
        this.healthCheck?.usersSubmitted?.push(user)
    }

    votingFinished = () => {
        this.healthCheck = {
            ended: true
        }
    }

    votingStarted = (voting) => {
        this.healthCheck = voting
    }
}

export default new ObservableHealthCheckStore()
