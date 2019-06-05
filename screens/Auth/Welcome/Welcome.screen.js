import React from 'react'
import styled from 'styled-components/native'
import { Image } from 'react-native'

import { Loader, Button, Page } from '../../../components'
import { login } from '../../../services/connection/adapters/auth'
import colors from '../../../constants/Colors'

const iconUser = require('./fun-3x.png')


const Header = styled.View`
  justify-content: center;
`

const Welcome = styled.View`
  justify-content: center;
  align-items: center;
`

const Content = styled.View`
    justify-content: space-around;
    flex: 1;
`

const WelcomeTitle = styled.Text`
  color: ${colors.air};
  font-size: 36px;
  margin-bottom: 20px;
`

const WelcomeSubtitle = styled.Text`
  color: ${colors.air};
  font-size: 18px;
`

const Footer = styled.View`
    justify-content: flex-start;
`

export default class WelcomeScreen extends React.Component {
    login = async () => {
        await login(this.state.email, this.state.password)
        this.props.navigation.navigate('AuthLoading', { email: this.state.email })
    }

    render() {
        return (
            <Loader assetsToLoad={[iconUser]}>
                <Page version={2}>
                    <Content>
                        <Header>
                            <Image source={iconUser}
                                   resizeMode='contain'
                                   style={{ height: 140, alignSelf: 'center' }}/>
                        </Header>
                        <Welcome>
                            <WelcomeTitle>Welcome!</WelcomeTitle>
                            <WelcomeSubtitle>Now let's get the team rolling...</WelcomeSubtitle>
                        </Welcome>
                        <Footer>
                            <Button version='secondary'
                                    text='Sign In'
                                    onPress={() => this.props.navigation.navigate('Login')}/>
                            <Button version='secondary'
                                    text='Sign Up'
                                    onPress={() => this.props.navigation.navigate('Register')}/>
                        </Footer>
                    </Content>
                </Page>
            </Loader>
        )
    }
}