import React from 'react';
import {Button, Text, View} from 'native-base'
import {Image} from 'react-native'
import styled from 'styled-components/native'
import {login} from '../../adapters/auth'
import colors from '../../constants/Colors'
import {buttonStyle, buttonTextStyle} from '../../constants/Style'
import IconUser from '../../assets/images-large/icon-user-2x.png'
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
                                style={buttonStyle}>
                            <Text style={buttonTextStyle}>Sign In</Text>
                        </Button>
                        <Button rounded
                                light
                                onPress={()=>this.props.navigation.navigate('Register')}
                                style={buttonStyle}>
                            <Text style={buttonTextStyle}>Sign Up</Text>
                        </Button>
                    </Footer>
                </Content>
            </Page>
        )
    }
}