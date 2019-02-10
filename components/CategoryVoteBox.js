import React from 'react'
import styled from 'styled-components/native'

const CategoryWrapper = styled.TouchableOpacity`
  background-color: ${props => props.color};
  border-radius: 10px;
  margin: 10px 30px;
  padding: 20px;
  box-shadow: 0 2px 3px rgba(0,0,0,0.15);
`
const CategoryText = styled.Text`
  color: #fff;
  font-size: 16px;
`

const CategoryVoteBox = ({text, onPress, color}) =>(
    <CategoryWrapper onPress={() => onPress()} color={color}>
        <CategoryText>
            {text}
        </CategoryText>
    </CategoryWrapper>
)

export default CategoryVoteBox
