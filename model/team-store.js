import {observable} from 'mobx'

class ObservableTeamStore {
    @observable team = {
        name: '',
        users: [],
        invitationCode: 1010
    }

    setTeam (team) {
        this.team = team;
        this.team.invitationCode = 1010;
    }
}

export default new ObservableTeamStore()