import React from 'react'
import styled from 'styled-components/native'
import PropTypes from 'prop-types'
import colors from '../constants/Colors'

const ListItem = styled.View`
  border-bottom-width: 1px;
  border-color: rgba(255,255,255,.49);
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 10px;
  margin-left: 20px;
  margin-bottom: 20px;
`

const ListText = styled.Text`
  color: ${colors.air};
  font-size: 16px;
`

const ListValues = styled.View`
  flex: 1;
  flex-direction: row;
`

const ListName = styled.View`
  flex: 3;
`

const RelativeValue = styled.View`
  margin-left: 10px;
  padding: 2px 10px;
  border-radius: 5px;
  background-color: ${({ value }) => (value > 0 ? '#95e1d5' : '#f9a9a9')};
`

const getRelativeValue = (current, previous) => {
    if (previous && (current - previous) !== 0) {
        return current - previous
    }
    return ''
}

const CategoryListItem = ({ category }) => {
    const relativeValue = getRelativeValue(category.value, category.previousValue)
    return (
        <ListItem>
            <ListName>
                <ListText>{category.name}</ListText>
            </ListName>
            <ListValues>
                <ListText>{category.value}</ListText>
                {
                    !!relativeValue
                    && (
                        <RelativeValue value={relativeValue}>
                            <ListText>{relativeValue}</ListText>
                        </RelativeValue>
                    )
                }
            </ListValues>
        </ListItem>
    )
}

CategoryListItem.propTypes = {
    name: PropTypes.string
}

export default CategoryListItem
