import { observable } from 'mobx'

class ObservableAppStore {
    @observable loading = false

    apiRequestCalled = (promise) => {
        this.loading = true
        promise.finally(res => {
            this.loading = false
        })
    }
}

export default new ObservableAppStore()
