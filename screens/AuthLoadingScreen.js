import React from 'react'
import {
    ActivityIndicator,
    StatusBar,
    View,
} from 'react-native'
import authStore from '../services/connection/adapters/auth'
import socketStore from '../services/connection/adapters/socket.store'
import userStore from '../model/user-store'
import teamStore from '../model/team-store'
import teamsStore from '../model/teams-store'

export default class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props)
        this._bootstrapAsync()
    }

    // This is a naive implementation and definitely some technical debt is included
    async openRecentTeam(){
        const teams = await teamsStore.fetchTeams()
        const teamId = await teamStore.getTeamId()
        if(teamId){
            const team = teams.find(({id}) => id === teamId)
            if(!team) {
                teamStore.resetTeam()
                await socketStore.init()
                return this.props.navigation.navigate('TeamsFlow')
            }

            await teamStore.setTeam(team)
            await socketStore.init()
            const nextScreen = team.users.length > 1 ? 'TeamDashboard' : 'Team'
            this.props.navigation.navigate(nextScreen)
        } else {
            await socketStore.init()
            this.props.navigation.navigate('TeamsFlow')
        }
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        try {
            const user = await authStore.getUser()
            if(user){
                userStore.setUser(user.attributes)
                await this.openRecentTeam()
            }
        } catch (e) {
            this.props.navigation.navigate('AuthFlow')
        }
    };

    // Render any loading content that you like here
    render() {
        return (
            <View>
                <ActivityIndicator />
                <StatusBar barStyle="light-content" />
            </View>
        )
    }
}
