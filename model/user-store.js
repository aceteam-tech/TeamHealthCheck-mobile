import {observable} from 'mobx'

class ObservableUserStore {
    @observable user = {}

    setUser (user) {
        this.user = user
    }
}

export default new ObservableUserStore()