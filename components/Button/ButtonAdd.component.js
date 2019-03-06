import React from 'react'
import PropTypes from 'prop-types'
import {Button as NativeButton, Text} from 'native-base'
import IconPlus from './icon-plus-3x.png'
import colors from '../../constants/Colors';
import {Image} from "react-native"

const buttonStyle = {
    width: 50,
    height: 50,
    backgroundColor: colors.air,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}

const Button = ({onPress}) => (
    <NativeButton rounded style={buttonStyle} onPress={onPress}>
        <Image source={IconPlus}
               resizeMode='contain'
               style={{height: 18}}/>
    </NativeButton>
)

Button.propTypes = {
    text: PropTypes.string,
    onPress: PropTypes.func
}

export default Button
