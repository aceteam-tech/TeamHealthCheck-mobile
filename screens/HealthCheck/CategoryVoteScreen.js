import React from 'react';
import {Text, Icon} from 'native-base'
import {View, TouchableOpacity} from 'react-native'
import styled from 'styled-components/native'
import colors from '../../constants/Colors'
import Page from '../../components/Page'

const Header = styled.View`
    margin-top: 40px;
    height: 150px;
    justifyContent: space-around;
    align-items: center;
    flex: 2;
`

const HeaderText = styled.Text`
  color: ${colors.air};
  font-size: 20px;
  font-weight: bold;
`

const Footer = styled.View`
    flex: 2;
    justify-content: center;
`

const CategoryVoteComponent = ({goBack}) => {
    return (
        <Page>
            <TouchableOpacity onPress={()=>goBack(null)}>
                <Icon name='ios-arrow-back'
                      type='Ionicons'
                      style={{color: '#FFF', fontSize: 30, marginLeft: 20, marginBottom: 20}}/>
            </TouchableOpacity>
            <Header>
                <HeaderText>Health Check</HeaderText>
            </Header>
            <Text>
                Category
            </Text>
            <Footer>

            </Footer>
        </Page>
    )
}

export default class CategoryVoteScreen extends React.Component {
    render () {
        return <CategoryVoteComponent
            goBack={this.props.navigation.goBack}
        />
    }
}