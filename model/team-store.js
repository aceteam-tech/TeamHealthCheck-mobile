import {observable, computed} from 'mobx'

class ObservableTeamStore {
    @observable team = {
        name: '',
        users: []
    }
    @observable healthChecks = []

    @computed get lastHealthCheck() {
        if(this.healthChecks.length){
            let {categories} = this.healthChecks[this.healthChecks.length - 1]
            if(this.healthChecks.length > 1){
                categories = categories.map(category => {
                    const previousCategories = this.healthChecks[this.healthChecks.length - 2].categories
                    const previousValue = (previousCategories.find((prev) => prev.id === category.id)).value
                    return {
                        ...category,
                        previousValue
                    }
                })
                return this.sortCategories(categories)
            }
            return this.sortCategories(this.healthChecks[this.healthChecks.length - 1].categories)
        }
    }

    sortCategories(categories){
        return categories.slice().sort((a, b) => a.value - b.value)
    }

    setTeam (team) {
        this.team = team
    }

    setHealthChecks (healthChecks) {
        this.healthChecks = healthChecks
    }
}

export default new ObservableTeamStore()