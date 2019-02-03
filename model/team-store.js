import {observable} from 'mobx'

class ObservableTeamStore {
    @observable team = {
        name: '',
        users: [],
        invitationCode: 101010
    }

    setTeam (team) {
        this.team = team
        this.team.invitationCode = 101010
    }
}

export default new ObservableTeamStore()