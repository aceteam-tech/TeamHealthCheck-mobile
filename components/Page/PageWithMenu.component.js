import React from 'react'
import styled from 'styled-components/native'
import BgBlueGradient from './bg-blue-gradient-2x.png'
import teamStore from '../../model/team-store'
import {Menu} from '../index'

const Page = styled.ImageBackground`
    flex: 1;
    padding-top: 40px;
`

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
        const {children, navigate} = this.props
        const {menuVisible} = this.state
        return (
            <Page source={BgBlueGradient}>
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
