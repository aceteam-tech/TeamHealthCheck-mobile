import React from 'react'
import BgBlueGradient from './background.png'
import teamStore from '../../model/team-store'
import Menu from '../Menu/Menu.component'
import Page from './Page.component'

export default class PageWithMenu extends React.Component {
    state = {
        menuVisible: false
    }
    onToggleMenu = () => {
        this.setState(({menuVisible}) => ({
            menuVisible: !menuVisible
        }))
    }
    render() {
        const {children, navigate, version} = this.props
        const {menuVisible} = this.state
        return (
            <Page version={version} >
                <Menu team={teamStore.team}
                      visible={menuVisible}
                      onToggleVisible={this.onToggleMenu}
                      navigate={navigate}/>
                {
                    children({onToggleMenu: this.onToggleMenu})
                }
            </Page>
        )
    }
}
