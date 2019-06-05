import healthCheckStore from '../../model/health-check-store'

export default {
    userVoted: ({user}) => healthCheckStore.userVoted(user)
}