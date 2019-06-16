import { observable, computed } from 'mobx'

class ObservableHealthCheckStore {
    @observable healthCheck = {
        usersSubmitted: [],
        ended: true
    }

    @observable currentCategoryIndex = 0

    @observable categoriesToSend = []

    @computed get lastCategory() {
        return this.currentCategoryIndex === this.healthCheck.categories.length - 1
    }

    @computed get currentCategory() {
        return this.healthCheck.categories[this.currentCategoryIndex]
    }

    @computed get categoriesCount() {
        return this.healthCheck.categories.length
    }

    setHealthCheck(healthCheck) {
        this.healthCheck = healthCheck
        this.currentCategoryIndex = 0
        this.categoriesToSend = []
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

    updateCategory = (value) => {
        this.categoriesToSend?.push({
            id: this.currentCategory.id,
            value
        })
    }

    nextCategory = () => {
        this.currentCategoryIndex += 1
    }

    previousCategory() {
        this.currentCategoryIndex -= 1
    }
}

export default new ObservableHealthCheckStore()
