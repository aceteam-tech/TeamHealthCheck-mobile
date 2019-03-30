import { observable } from 'mobx'

class ObservableAppStore {
    @observable loading = false

    apiRequestCalled = (promise) => {
        this.loading = true
        return promise.then(res => {
            this.loading = false
            return res
        }).catch(e => {
            this.loading = false
            throw new Error(e)
        })
    }
}

export default new ObservableAppStore()
