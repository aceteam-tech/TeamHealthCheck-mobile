import { observable } from 'mobx'

class ObservableHealthCheckStore {
    @observable healthCheck = {}

    setHealthCheck(healthCheck) {
        this.healthCheck = healthCheck
    }
}

export default new ObservableHealthCheckStore()
