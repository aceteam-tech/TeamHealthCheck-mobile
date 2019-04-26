import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity } from 'react-native'
import { Icon } from 'native-base'
import colors from '../../constants/Colors'

const ArrowBack = ({ onPress }) => (
    <TouchableOpacity onPress={onPress}>
        <Icon name='ios-arrow-back'
              type='Ionicons'
              style={{ color: colors.air, fontSize: 30, padding: 10 }}/>
    </TouchableOpacity>
)

ArrowBack.propTypes = {
    onPress: PropTypes.func
}

ArrowBack.defaultProps = {
    textStyle: {}
}

export default ArrowBack