import healthCheckStore from '../../model/health-check-store'

export default {
    votingStarted: () => healthCheckStore.votingStarted(),
    userVoted: ({user}) => healthCheckStore.userVoted(user),
    votingFinished: () => healthCheckStore.votingFinished()
}