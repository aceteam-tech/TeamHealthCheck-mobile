import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import colors from '../../constants/Colors'

const StyledHeader = styled.View`
  margin-top: 15px;
  flex-direction: row;
  justify-content: space-between;
  ${({alignItems}) => { alignItems }}
`

const HeaderTitle = styled.Text`
  color: ${colors.air};
  font-size: 17px;
  font-weight: 600;
  text-align: center;
  justify-content: center;
  flex: 3;
  align-self: center;
  letter-spacing: 0.85;
`

const HeaderCenter = styled.View`
  justify-content: center;
  align-items: center;
  flex: 3;
`

const HeaderLeft = styled.View`
  flex: 1;
`

const HeaderRight = styled.View`
  flex: 1;
  align-items: flex-end;
`

const Header = ({ title, left, right, alignItems }) => (
    <StyledHeader alignItems={alignItems}>
        <HeaderLeft>
            {left}
        </HeaderLeft>
        {
            typeof title === 'string' ?
                <HeaderTitle>
                    {title}
                </HeaderTitle> :
                <HeaderCenter>
                    {title}
                </HeaderCenter>
        }
        <HeaderRight>
            {right}
        </HeaderRight>
    </StyledHeader>
)

Header.defaultProps = {
    alignItems: 'center'
}

Header.propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
    left: PropTypes.element,
    right: PropTypes.element,
    alignItems: PropTypes.string
}

export default Header