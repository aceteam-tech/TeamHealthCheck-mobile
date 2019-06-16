import healthCheckStore from '../../model/health-check-store'
import teamStore from '../../model/team-store'

export default {
    votingStarted: ({voting}) => healthCheckStore.votingStarted(voting),
    userVoted: ({user}) => healthCheckStore.userVoted(user),
    votingFinished: ({voting}) => {
        healthCheckStore.votingFinished()
        teamStore.votingFinished(voting)
    }
}