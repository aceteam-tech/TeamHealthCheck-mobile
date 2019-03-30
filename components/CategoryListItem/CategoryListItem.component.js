import React from 'react'
import styled from 'styled-components/native'
import PropTypes from 'prop-types'
import colors from '../../constants/Colors'

const ListItem = styled.View`
  border-bottom-width: 1px;
  border-color: rgba(255,255,255,.49);
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 20px;
  margin-left: 20px;
  margin-bottom: 20px;
`

const ListText = styled.Text`
  color: ${colors.air};
  font-size: 16px;
`

const ListValues = styled.View`
  flex-direction: row;
  margin-right: 10px;
`

const ListName = styled.View`
  flex: 1;
`

const RelativeValuePlaceholder = styled.View`
  margin-left: 10px;
  width: 50px;
`

const RelativeValue = styled.View`
  align-items: center;
  border-radius: 5px;
  background-color: ${({ value }) => (value > 0 ? '#95e1d5' : '#f9a9a9')};
`

const getRelativeValue = (current, previous) => {
    if (typeof previous !== 'undefined' && (current - previous) !== 0) {
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
                <ListText>{category.value + '%'}</ListText>
                <RelativeValuePlaceholder>
                    {
                        !!relativeValue
                        && (
                            <RelativeValue value={relativeValue}>
                                <ListText>{relativeValue > 0 ? `+${relativeValue}` : relativeValue}</ListText>
                            </RelativeValue>
                        )
                    }
                </RelativeValuePlaceholder>
            </ListValues>
        </ListItem>
    )
}

CategoryListItem.propTypes = {
    category: PropTypes.shape({
        value: PropTypes.number,
        previousValue: PropTypes.number,
        name: PropTypes.string
    })
}

export default CategoryListItem
