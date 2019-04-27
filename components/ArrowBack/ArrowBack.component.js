import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { Icon } from 'native-base'
import colors from '../../constants/Colors'

const ArrowBackButton = styled.TouchableOpacity`
  padding: 10px 20px;
`

const ArrowBack = ({ onPress }) => (
    <ArrowBackButton onPress={onPress}>
        <Icon name='ios-arrow-back'
              type='Ionicons'
              style={{ color: colors.air, fontSize: 30 }}/>
    </ArrowBackButton>
)

ArrowBack.propTypes = {
    onPress: PropTypes.func
}

ArrowBack.defaultProps = {
    textStyle: {}
}

export default ArrowBack