import { observable } from 'mobx'

class ObservableAppStore {
    @observable loading = false

    apiRequestCalled = (promise) => {
        this.loading = true
        return promise.finally(res => {
            this.loading = false
            return res
        })
    }
}

export default new ObservableAppStore()
