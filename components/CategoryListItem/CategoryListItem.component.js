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
  padding-top: 40px;
  margin-left: 20px;
`

const ListText = styled.Text`
  color: ${colors.air};
  font-weight: 500;
  font-size: 14px;
`

const RelativeValueText = styled(ListText)`
  text-align: right;
`

const ListValues = styled.View`
  flex-direction: row;
  margin-right: 10px;
`

const ListName = styled.View`
  flex: 1;
`

const RelativeValuePlaceholder = styled.View`
  margin-right: 10px;
  width: 40px;
`

const RelativeValue = styled.View`
  align-items: center;
  border-radius: 5px;
  background-color: ${({ value }) => (value > 0 ? 'rgb(145, 220, 255)' : 'rgb(255, 134, 134)')};
`

const CategoryListItem = ({ category }) => (
    <ListItem>
        <ListName>
            <ListText>{category.name}</ListText>
        </ListName>
        <ListValues>
            <RelativeValuePlaceholder>
                {
                    !!category.relativeValue
                    && (
                        <RelativeValue value={category.relativeValue}>
                            <RelativeValueText>{category.relativeValue > 0 ? `+${category.relativeValue}` : category.relativeValue}</RelativeValueText>
                        </RelativeValue>
                    )
                }
            </RelativeValuePlaceholder>
            <ListText>{Math.round(category.value) + '%'}</ListText>
        </ListValues>
    </ListItem>
)

CategoryListItem.propTypes = {
    category: PropTypes.shape({
        value: PropTypes.number,
        previousValue: PropTypes.number,
        name: PropTypes.string
    })
}

export default CategoryListItem
