import React from 'react'
import PropTypes from 'prop-types'
import {Button as NativeButton, Text} from 'native-base'
import colors from '../../constants/Colors';

const defaultTextStyle = {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
    color: colors.primary
}

const buttonStyle = {
    justifyContent: 'center',
    width: '90%',
    height: 50,
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 30,
    backgroundColor: colors.air
}
const Button = ({text, textStyle, onPress}) => (
    <NativeButton rounded style={buttonStyle} onPress={onPress}>
        <Text style={[defaultTextStyle, textStyle]}>{text.toUpperCase()}</Text>
    </NativeButton>
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