import { observable, computed } from 'mobx'
import { validations, validator } from './register.helpers';

class RegisterFormStore {
    @observable form = {}

    fieldChange(key, value) {
        this.form[key] = value
    }

    clear() {
        this.form = {}
    }

    @computed get errors() {
        return Object.keys(this.form).map(key => ({
            key,
            value: validator(validations[key], this.form[key])
        })).reduce((acc, curr) => {
            acc[curr.key] = curr.value
            return acc
        }, {})
    }

    @computed get formValidated() {
        return Object.keys(this.form).length === 3 &&
            !this.errors.name &&
            !this.errors.email &&
            !this.errors.password
    }
}

export default new RegisterFormStore()
