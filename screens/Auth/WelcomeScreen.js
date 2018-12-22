import React from 'react';
import {Button, Text, View} from 'native-base'
import {Image} from 'react-native'
import styled from 'styled-components/native'
import {login} from '../../adapters/auth'
import colors from '../../constants/Colors'
import IconUser from '../../assets/images/icon-user-2x.png'
import WelcomeBG from '../../assets/images/welcome-bg.jpg'

const Page = styled.ImageBackground`
    flex: 1;
    backgroundColor: ${colors.primary};
    align-items: center;
`

const Header = styled.View`
  flex: 2;
  justify-content: center;
`

const Body = styled.View`
  align-items: center;
  flex: 1;
`

const Content = styled.View`
    margin-top: 40px;
    justifyContent: space-around;
    align-items: center;
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
    flex: 2;
    justify-content: flex-start;
`

const button = {
    paddingLeft: '25%',
    paddingRight: '25%',
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 30,
}

const buttonText = {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '900'
}

export default class WelcomeScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    login = async () => {
        await login(this.state.email, this.state.password)
        this.props.navigation.navigate('AuthLoading', {email: this.state.email})
    }

    render () {
        return (
            <Page source={WelcomeBG}>
                <Content>
                    <Header>
                        <Image source={IconUser}
                               resizeMode='contain'
                               style={{height: 150}}/>
                    </Header>
                    <Body>
                        <WelcomeTitle>Welcome!</WelcomeTitle>
                        <WelcomeSubtitle>Now let's get the team rolling...</WelcomeSubtitle>
                    </Body>
                    <Footer>
                        <Button rounded
                                light
                                onPress={()=>this.props.navigation.navigate('Login')}
                                style={button}>
                            <Text style={buttonText}>Sign In</Text>
                        </Button>
                        <Button rounded
                                light
                                onPress={()=>this.props.navigation.navigate('Register')}
                                style={button}>
                            <Text style={buttonText}>Sign Up</Text>
                        </Button>
                    </Footer>
                </Content>
            </Page>
        )
    }
}