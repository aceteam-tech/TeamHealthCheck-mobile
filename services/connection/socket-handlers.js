import healthCheckStore from '../../model/health-check-store'
import teamStore from '../../model/team-store'

const socketHandlers = {
    votingStarted: ({voting}) => healthCheckStore.votingStarted(voting),
    userVoted: ({user}) => healthCheckStore.userVoted(user),
    votingFinished: ({voting}) => {
        healthCheckStore.votingFinished()

        // If the health check finished without any votes, categories property will be undefined.
        if(voting.categories){
            teamStore.votingFinished(voting)
        }
    },
    userRemoved: ({removedUserId}) => teamStore.removeUser(removedUserId)
}

export default function handleSocketCallback(event){
    if(event.teamId === teamStore.team.id){
        socketHandlers[event.action](event)
    }
}