import { observable, computed } from 'mobx'
import votingStore from './voting-store'

class VoteStore {
    @observable vote
    @observable currentCategoryIndex

    constructor() {
        this.restartVote(this.voting.id)
    }

    restartVote(votingId) {
        this.vote = {
            votingId,
            categories: []
        }
        this.currentCategoryIndex = 0
    }

    @computed get categories() {
        return this.vote.categories.filter(category => category.value !== undefined)
    }

    @computed get voting() {
        return votingStore.healthCheck
    }

    @computed get lastCategory() {
        return this.currentCategoryIndex === this.voting.categories.length - 1
    }

    @computed get currentCategory() {
        return this.voting.categories[this.currentCategoryIndex]
    }

    @computed get currentCategoryVote() {
        if (this.vote.categories.length > this.currentCategoryIndex) {
            return this.vote.categories[this.currentCategoryIndex]
        }
    }

    @computed get categoriesCount() {
        return this.voting.categories.length
    }

    nextCategory = () => {
        this.currentCategoryIndex++
    }

    previousCategory = () => {
        this.currentCategoryIndex--
    }

    updateCategory = (value) => {
        this.vote.categories[this.currentCategoryIndex] = {
            id: this.currentCategory.id,
            value
        }
    }
}

export default new VoteStore()
