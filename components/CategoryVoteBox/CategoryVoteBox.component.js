import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import colors from '../../constants/Colors'
import happyFace from './happy-face.png'
import pokerFace from './poker-face.png'
import sadFace from './sad-face.png'

const faces = {
    happy: happyFace,
    poker: pokerFace,
    sad: sadFace
}

const CategoryWrapper = styled.TouchableOpacity`
  padding: 10px 20px;
  flex: 1;
  box-shadow: 0 2px 3px rgba(0,0,0,0.15);
  flex-direction: row;
  align-items: center;
  ${({ selected }) => selected && 'background-color: rgba(255, 255, 255, .4)'}
`
const CategoryFace = styled.Image`
  width: 64.7px;
  height: 74px;
  margin-right: 20px;
`
const TextWrapper = styled.View`
  background-color: #fff;
  min-height: 74px;
  justify-content: center;
  flex: 1;
  border-bottom-right-radius: 40px;
  border-top-right-radius: 40px;
  border-top-left-radius: 40px;
`
const CategoryText = styled.Text`
  margin: 10px 30px;
  color: #0b7aee;
  font-size: 14px;
  font-weight: 200;
`

const CategoryVoteBox = ({ text, onPress, face, selected }) => (
    <CategoryWrapper onPress={() => onPress()} selected={selected} >
        <CategoryFace source={faces[face]}/>
        <TextWrapper>
            <CategoryText>
                {text}
            </CategoryText>
        </TextWrapper>
    </CategoryWrapper>
)

CategoryVoteBox.propTypes = {
    face: PropTypes.oneOf([
        'happy', 'poker', 'sad'
    ])
}

export default CategoryVoteBox
