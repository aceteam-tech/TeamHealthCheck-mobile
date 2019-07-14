import { observable, computed } from 'mobx'
import { getResults } from './current-results'

class TeamVotingsStore {
    @observable votings = {
        items: [],
        current: 0,
        compared: undefined,
        changingCurrent: false,
        changingCompared: false
    }

    @computed get currentVoting() {
        const currentItem = this.votings.items[this.votings.current - 1]
        const comparedItem = this.votings.items[this.votings.compared - 1]

        if(comparedItem && currentItem){
            return currentItem.getResults(comparedItem)
        } else if (currentItem) {
            return currentItem.categories
        }
    }

    setVotings(items) {
        this.votings = {
            ...this.votings,
            items: items.map(i => new Voting(i)),
            current: items.length,
            compared: items.length - 1
        }
    }

    votingFinished(voting) {
        this.votings.items.push(voting)
    }

    changeCurrentSprint = () => {
        this.votings = {
            ...this.votings,
            changingCurrent: true,
            changingCompared: false
        }
    }

    selectCurrentSprint = (sprintNumber) => {
        if (this.votings.compared > 0 && this.votings.compared < sprintNumber) {
            this.votings = {
                ...this.votings,
                current: sprintNumber,
                changingCurrent: false
            }
        } else {
            this.votings = {
                ...this.votings,
                current: sprintNumber,
                compared: sprintNumber - 1,
                changingCurrent: false
            }
        }
    }

    changeComparedSprint = () => {
        this.votings = {
            ...this.votings,
            changingCurrent: false,
            changingCompared: true
        }
    }

    selectComparedSprint = (sprintNumber) => {
        this.votings = {
            ...this.votings,
            compared: sprintNumber,
            changingCompared: false
        }
    }
}

class Voting {
    id = 0
    date = 0
    categories = []

    constructor(item){
        this.id = item.id
        this.date = item.date
        this.categories = item.categories
    }

    getResults(comparedVoting){
        return getResults(this.categories, comparedVoting.categories)
    }
}

export default new TeamVotingsStore()
