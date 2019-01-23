import React from 'react';
import styled from 'styled-components/native'
import colors from '../constants/Colors';

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

export default ({autoFocus, value, handle, onChange, onEnd, index}) => (
    <PinInput 
              autoCorrect={false}
              autoFocus={autoFocus || false}
              keyboardType='default'
              value={value}
              maxLength={1}
              caretHidden={true}
              ref={ref => handle(ref)}
              onKeyPress={(e) => onChange(index, e.nativeEvent.key)}/>
)