import {observable} from 'mobx'

class ObservableTeamStore {
    @observable team = {
        name: ''
    }

    setTeam (team) {
        this.team = team
    }
}

export default new ObservableTeamStore()