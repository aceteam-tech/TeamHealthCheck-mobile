import votingStore from '../../model/voting-store'
import teamStore from '../../model/team-store'
import teamVotingsStore from '../../screens/Teams/TeamDashboard/team-votings.store'
import voteStore from '../../model/vote-store'

const socketHandlers = {
    votingStarted: ({voting}) => {
        votingStore.votingStarted(voting)
        voteStore.restartVote(voting.id)
    },
    userVoted: ({user}) => votingStore.userVoted(user),
    votingFinished: ({voting}) => {
        votingStore.votingFinished()

        // If the health check finished without any votes, categories property will be undefined.
        if(voting.categories){
            teamVotingsStore.votingFinished(voting)
        }
    },
    userRemoved: ({removedUserId}) => teamStore.removeUser(removedUserId),
    newUser: ({user}) => teamStore.newUser(user)
}

export default function handleSocketCallback(event){
    if(event.teamId === teamStore.team.id){
        socketHandlers[event.action](event)
    }
}