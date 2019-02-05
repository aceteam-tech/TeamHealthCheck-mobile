import { observable, computed } from 'mobx'

class ObservableHealthCheckStore {
    @observable healthCheck = {}

    @observable currentCategoryIndex = 0

    @observable categoriesToSend = []

    @computed get lastCategory() {
        return this.currentCategoryIndex === this.healthCheck.categories.length - 1
    }

    @computed get currentCategory() {
        return this.healthCheck.categories[this.currentCategoryIndex]
    }

    setHealthCheck(healthCheck) {
        this.healthCheck = healthCheck
        this.currentCategoryIndex = 0
        this.categoriesToSend = []
    }

    updateCategory = (value) => {
        this.categoriesToSend.push({
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
