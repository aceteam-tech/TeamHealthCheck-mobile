import React from 'react';
import {TouchableOpacity,} from 'react-native';
import {Button, Text, Card, CardItem, Icon, Content} from 'native-base'
import styled from 'styled-components/native'

const Page = styled.View`
    flex: 1;
    backgroundColor: white;
    justifyContent: space-between;
`

const TeamIcon = styled.Image`
    width: 50; 
    height: 50;
    marginRight: 20;
`

const Header = styled.View`
    backgroundColor: #0CAADC;
    height: 150px;
    justifyContent: center;
    align-items: center;
`

const HeaderText = styled.Text`
  color: #fff;
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

const cardItemStyles = {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10
}

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    render () {
        return (
            <Page>
                <Content>
                    <Header>
                        <HeaderText>Teams</HeaderText>
                    </Header>
                    <TeamsList>
                        {
                            [{
                                id: 1,
                                description: 'Ace Team',
                                image: 'https://s3.amazonaws.com/squad-health-check/AceTeam-Logo-05a.png'
                            }, {
                                "description": "Cloud Ops",
                                "id": "e118e8f0-90b6-4b55-b0be-9b0386772c6b",
                                "image": "http://w-files.pl/wp-content/uploads/2016/04/Simple-Cloud-Icon.png"
                            }].map(group => (
                                <Card key={group.id} style={squadCardStyles}>
                                    <TouchableOpacity
                                        onPress={() => this.props.navigation.navigate('Team', {
                                            id: group.id,
                                            title: group.description
                                        })}>
                                        <CardItem style={cardItemStyles}>
                                            {
                                                !!group.image &&
                                                <TeamIcon
                                                    source={{uri: group.image}}/>
                                            }
                                            <Text style={{flex: 1}}>{group.description}</Text>
                                            <Icon name='ios-arrow-forward'
                                                  type='Ionicons'
                                                  style={{color: '#0CAADC', fontSize: 30}}/>
                                        </CardItem>

                                    </TouchableOpacity>
                                </Card>
                            ))
                        }
                    </TeamsList>
                </Content>
                <Button full style={{backgroundColor: '#0CAADC'}}
                        onPress={() => this.props.navigation.navigate('AddTeam')}>
                    <Text>Create new team</Text>
                </Button>
            </Page>
        )
    }
}