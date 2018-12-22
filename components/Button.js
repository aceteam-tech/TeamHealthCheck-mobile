import React from 'react'
import PropTypes from 'prop-types'
import {Button as NativeButton, Text} from 'native-base'
import colors from '../constants/Colors';

const textStyle = {
    default: {
        fontSize: 14,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    primary: {
        color: colors.air
    },
    secondary: {
        color: colors.primary
    }
}

const buttonStyle = {
    default: {
        justifyContent: 'center',
        width: '90%',
        textAlign: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 30,
    },
    primary: {
        backgroundColor: colors.primary
    },
    secondary: {
        backgroundColor: colors.air,
        borderWidth: 2,
        borderColor: colors.primary
    }
}

const Button = ({text, onPress, version}) => (
    <NativeButton rounded style={[buttonStyle.default, buttonStyle[version]]} onPress={onPress}>
        <Text style={[textStyle.default, textStyle[version]]}>{text.toUpperCase()}</Text>
    </NativeButton>
)

Button.propTypes = {
    text: PropTypes.string,
    onPress: PropTypes.func,
    version: PropTypes.oneOf([
        'primary',
        'secondary'
    ])
}

export default Button