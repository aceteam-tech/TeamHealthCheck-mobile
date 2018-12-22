import React from 'react';
import {Button, Text, Card, CardItem, Icon, Content} from 'native-base'
import styled from 'styled-components/native'
import colors from '../../constants/Colors'

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

const CategoriesList = styled.View`
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
    flex: 1,
    borderRadius: 10
}

export default class TeamDashboardScreen extends React.Component {
    render () {
        const team = this.props.navigation.getParam('team')
        return (
            <Page>
                {
                    !!team &&
                    <Content>
                        <Header>
                            <HeaderText>Team Dashboard</HeaderText>
                        </Header>
                        <CategoriesList>
                            {
                                team.categories.map(category => (
                                    <Card key={category.id} style={squadCardStyles}>
                                        <CardItem style={cardItemStyles}>
                                            {
                                                !!category.image &&
                                                <TeamIconWrapper>
                                                    <TeamIcon
                                                        source={{uri: category.image}}/>
                                                </TeamIconWrapper>
                                            }
                                            <Text style={[
                                                {
                                                    flex: 2,
                                                    color: colors.primary,
                                                    fontSize: 20
                                                },
                                                !category.image && {textAlign: 'center'}
                                            ]}>{category.name}</Text>
                                        </CardItem>
                                    </Card>
                                ))
                            }
                        </CategoriesList>
                    </Content>
                }
            </Page>
        )
    }
}