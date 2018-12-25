import React from 'react';
import {Button, Text, Card, CardItem, Icon, Content} from 'native-base'
import styled from 'styled-components/native'
import colors from '../../constants/Colors'
import teamStore from '../../model/team-store'
import {observer} from 'mobx-react/native'

const Page = styled.View`
    flex: 1;
    backgroundColor: ${colors.air};
    justifyContent: space-between;
`

const TeamIconWrapper = styled.View`
    flex: 1;
    marginRight: 20;
`

const TeamIcon = styled.Image`
    width: 50; 
    height: 50;
`

const Header = styled.View`
    backgroundColor: ${colors.primary};
    height: 150px;
    justifyContent: center;
    align-items: center;
`

const HeaderText = styled.Text`
  color: ${colors.air};
  font-size: 20px;
  font-weight: bold;
`

const TeamsList = styled.View`
  margin-top: -30px;
`

const squadCardStyles = {
    marginRight: 20,
    marginLeft: 20,
    borderRadius: 10,
    height: 120,
    justifyContent: 'center',
    marginBottom: 15
}

const buttonText = {
    color: colors.air,
    fontSize: 12,
    fontWeight: 'bold'
}

const button = {
    paddingLeft: '25%',
    paddingRight: '25%',
    backgroundColor: 'rgb(32,36,46)',
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 30,
}

const cardItemStyles = {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    borderRadius: 10
}

const TeamComponent = observer(({store}) => (
    <Page>
        {
            !!store.team &&
            <Content>
                <Header>
                    <HeaderText>Team</HeaderText>
                </Header>
                <TeamsList>
                    <Card style={squadCardStyles}>
                        <CardItem style={cardItemStyles}>
                            {
                                !!store.team.image &&
                                <TeamIconWrapper>
                                    <TeamIcon
                                        source={{uri: store.team.image}}/>
                                </TeamIconWrapper>
                            }
                            <Text style={[
                                {
                                    flex: 2,
                                    color: colors.primary,
                                    fontSize: 20
                                },
                                !store.team.image && {textAlign: 'center'}
                            ]}>{store.team.name}</Text>
                        </CardItem>
                    </Card>
                </TeamsList>
                <Button rounded onPress={() => {
                }} style={button}>
                    <Text style={buttonText}>{'Invite Members'.toUpperCase()}</Text>
                </Button>
            </Content>
        }
    </Page>
))

export default class TeamScreen extends React.Component {
    render () {
        return <TeamComponent
            store={teamStore}
        />
    }
}