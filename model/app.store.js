import { observable } from 'mobx'
import {resolveError} from '../helpers/error-resolvers.helper'

class ObservableAppStore {
    @observable loading = false
    @observable error = false
    @observable navigation

    apiRequestCalled = (promise, ignoredExceptions = []) => {
        this.loading = true

        promise.catch(e => {
            if(!ignoredExceptions.includes(e.code)){
                this.error = resolveError(e, this.navigation, () => {
                    this.error = false
                })
            }
        })

        promise.finally(res => {
            this.loading = false
            return res
        })

        return promise
    }
}

export default new ObservableAppStore()
