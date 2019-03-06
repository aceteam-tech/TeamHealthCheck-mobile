import React from 'react'
import {View, TouchableOpacity} from "react-native"
import {Icon} from 'native-base'
import {Header, Page} from '../../../components/index'
import styled from 'styled-components/native'
import teamStore from '../../../model/team-store'
import {labelStyle} from "../../../constants/Style"
import colors from "../../../constants/Colors"

const CodeLabel = styled.Text`
    color: ${colors.air};
    font-size: 13px;
    margin: 0 0 10px 15px;
`

const Code = styled.Text`
    color: ${colors.air};
    font-size: 50px;
    letter-spacing: 12px;
    font-weight: bold;
    textAlign: center;
`
const HeaderWrapper = styled.View`
  margin-bottom: 130px;
`

export default class InviteScreen extends React.Component {
    render () {
        const {goBack} = this.props.navigation
        return (
            <Page>
                <HeaderWrapper>
                    <Header title='Invitation' left={
                        <TouchableOpacity onPress={() => goBack(null)}>
                            <Icon name='ios-arrow-back'
                                  type='Ionicons'
                                  style={{color: colors.air, fontSize: 30}}/>
                        </TouchableOpacity>
                    }/>
                </HeaderWrapper>
                <View>
                    <CodeLabel style={labelStyle}>Join your team code</CodeLabel>
                    <Code>{teamStore.team.code}</Code>
                </View>
            </Page>
        )
    }
}