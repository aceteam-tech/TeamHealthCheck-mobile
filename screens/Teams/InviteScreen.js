import React from 'react';
import teamStore from '../../model/team-store'
import {observer} from 'mobx-react/native'
import Page from '../../components/Page'

const InviteComponent = observer(({store, navigate}) => (
    <Page>

    </Page>
))

export default class InviteScreen extends React.Component {
    render () {
        return <InviteComponent
            store={teamStore}
            navigate={this.props.navigation.navigate}
        />
    }
}