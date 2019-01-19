import React from 'react'
import PropTypes from 'prop-types'
import {Button as NativeButton, Text} from 'native-base'
import colors from '../../constants/Colors';

const textStyle = {
    fontSize: 32,
    textAlign: 'center',
    color: colors.primary,
    fontWeight: '300'
}

const buttonStyle = {
    width: 50,
    height: 50,
    backgroundColor: colors.air
}

const Button = ({onPress}) => (
    <NativeButton rounded style={buttonStyle} onPress={onPress}>
        <Text style={textStyle}>+</Text>
    </NativeButton>
)

Button.propTypes = {
    text: PropTypes.string,
    onPress: PropTypes.func
}

export default Button