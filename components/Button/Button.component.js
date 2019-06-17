import React from 'react'
import PropTypes from 'prop-types'
import ButtonPrimary from './ButtonPrimary.component'
import ButtonSecondary from './ButtonSecondary.component'
import ButtonAdd from './ButtonAdd.component'

const Button = (props) => {
    switch(props.version){
        case 'primary':
            return <ButtonPrimary {...props}/>
        case 'secondary':
            return <ButtonSecondary {...props}/>
        case 'add':
            return <ButtonAdd {...props}/>
    }
}

Button.defaultProps = {
    version: 'primary'
}

Button.propTypes = {
    text: PropTypes.string,
    onPress: PropTypes.func,
    version: PropTypes.oneOf([
        'primary',
        'secondary',
        'add'
    ])
}

export default Button