import React from 'react';
import {Icon} from 'native-base'
import {TouchableOpacity, Image} from 'react-native'
import styled from 'styled-components/native'
import colors from '../../constants/Colors'
import Page from '../../components/Page/Page'
import Header from '../../components/Header/Header'
import healthCheckStore from '../../model/health-check-store'
import Loading from '../../components/Loading/Loading'
import categories from '../../assets/categories/category-icons'
import {observer} from 'mobx-react/native';
import CategoryVoteBox from '../../components/CategoryVoteBox/CategoryVoteBox'

const HeaderWrapper = styled.View`
  margin-bottom: 50px;
`

const CategoryVoteComponent = observer(({navigation, healthCheckStore}) => {
    if (!healthCheckStore.healthCheck.categories) return <Loading/>
    const category = healthCheckStore.currentCategory
    const {nextCategory, lastCategory, updateCategory} = healthCheckStore

    const onCategoryChosen = (value) => {
        updateCategory(value)
        lastCategory ? navigation.push('Summary') : nextCategory()
    }

    return (
        <Page>
            <HeaderWrapper>
                <Header title={category.name} left={
                    <TouchableOpacity onPress={() => navigation.goBack(null)}>
                        <Icon name='ios-arrow-back'
                              type='Ionicons'
                              style={{color: colors.air, fontSize: 30}}/>
                    </TouchableOpacity>
                }/>
            </HeaderWrapper>
            <Image source={categories[category.image]}
                   resizeMode='contain'
                   style={{height: 120, alignSelf: 'center', marginBottom: 30}}/>
            <CategoryVoteBox text={category.descriptionGreen} color={'green'} onPress={() => onCategoryChosen(2)} />
            <CategoryVoteBox text={'Ok. Could be better...'} color={'#FFDC0F'} onPress={() => onCategoryChosen(1)} />
            <CategoryVoteBox text={category.descriptionRed} color={'red'} onPress={() => onCategoryChosen(0)} />
        </Page>
    )
})

export default class CategoryVoteScreen extends React.Component {
    render () {
        return <CategoryVoteComponent
            healthCheckStore={healthCheckStore}
            navigation={this.props.navigation}
        />
    }
}
