import React from 'react'
import { ImageBackground, Image } from 'react-native'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import Button from '../../components/Button/Button.component'
import errorIcon from './error-icon.png'
import bgError from './bg-error.png'
import colors from '../../constants/Colors'
import appStore from '../../model/app.store'

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const ErrorTitle = styled.Text`
  color: ${colors.air};
  font-weight: 600;
  font-size: 24px;
  margin: 20px 0;
`

const ErrorDescription = styled.Text`
  color: ${colors.air};
  font-weight: 300;
  font-size: 20px;
  margin: 10px 0 50px;
`

const ErrorComponent = () => (
    <ImageBackground source={bgError} style={{ flex: 1 }}>
        <Container>
            <Image source={errorIcon}
                   resizeMode='contain'
                   style={{ alignSelf: 'center', width: '50%' }}/>
            <ErrorTitle>OH SNAP!</ErrorTitle>
            <ErrorDescription>
                {appStore.error?.description || 'Oops, something went wrong!'}
            </ErrorDescription>
            <Button version='primary'
                    text={'Try again'}
                    onPress={() => appStore.error = false}/>
            {
                appStore.error?.action &&
                <Button version='secondary'
                        text={appStore.error?.actionText || 'Close'}
                        onPress={appStore.error?.action}
                        textStyle={{ color: colors.error }}/>
            }

        </Container>
    </ImageBackground>
)

ErrorComponent.propTypes = {
    errorDescription: PropTypes.string,
    actionText: PropTypes.string,
    action: PropTypes.func
}

export default ErrorComponent