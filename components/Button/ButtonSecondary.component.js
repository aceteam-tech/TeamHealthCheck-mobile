import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'native-base'
import styled from 'styled-components/native'
import colors from '../../constants/Colors'

const defaultTextStyle = {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
    color: colors.primary
}

const ButtonWrapper = styled.View`
    height: 50px;
    width: 90%;
    align-self: center;
    margin-bottom: 30px;
`

const ButtonStyle = styled.TouchableOpacity`
    border-radius: 30px;
    justify-content: center;
    flex: 1;
    text-align: center;
    background-color: ${colors.air};
`

const Button = ({ text, textStyle, onPress }) => (
    <ButtonWrapper>
        <ButtonStyle onPress={onPress}>
            <Text style={[defaultTextStyle, textStyle]}>{text.toUpperCase()}</Text>
        </ButtonStyle>
    </ButtonWrapper>
)

Button.propTypes = {
    text: PropTypes.string,
    textStyle: PropTypes.object,
    onPress: PropTypes.func
}

Button.defaultProps = {
    textStyle: {}
}

export default Button