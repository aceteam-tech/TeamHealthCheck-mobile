import React from 'react'
import styled from 'styled-components/native'
import colors from '../../constants/Colors'

const PinInput = styled.TextInput`
    background-color: ${colors.air};
    width: 40px;
    height: 50px;
    border-radius: 5px;
    margin: 5px;
    fontSize: 36;
    color: ${colors.primary};
    textAlign: center
`

export default ({ autoFocus, value, handle, onKeyPress, index }) => (
    <PinInput
        key={index}
        autoCorrect={false}
        keyboardType='decimal-pad'
        value={value}
        maxLength={1}
        ref={ref => handle(ref)}
        onKeyPress={e => onKeyPress(index, e.nativeEvent.key)}
    />
)
