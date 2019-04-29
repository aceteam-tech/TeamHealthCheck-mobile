import React from 'react'
import { Image } from 'react-native'
import styled from 'styled-components/native'
import colors from '../../../constants/Colors'
import { Page, Header, Loading, CategoryVoteBox, Loader, ArrowBack } from '../../../components/index'
import healthCheckStore from '../../../model/health-check-store'
import categories from '../../../assets/categories/category-icons'
import { observer } from 'mobx-react/native'

const HeaderWrapper = styled.View`
  margin-bottom: 50px;
`

const Text = styled.Text`
  color: ${colors.air};
  font-weight: bold;
`

const HeaderRight = ({categoryIndex, categoriesCount}) => (
    <Text style={{paddingRight: 20}}>{(categoryIndex + 1) + ' / ' + categoriesCount}</Text>
)

const CategoryVoteComponent = observer(({ navigation, healthCheckStore }) => {
    if (!healthCheckStore.healthCheck.categories) return <Loading/>
    const category = healthCheckStore.currentCategory
    const { nextCategory, lastCategory, updateCategory, currentCategoryIndex, categoriesCount } = healthCheckStore

    const onCategoryChosen = (value) => {
        updateCategory(value)
        lastCategory ? navigation.push('Summary') : nextCategory()
    }

    return (
        <Page>
            <HeaderWrapper>
                <Header title={category.name}
                        left={<ArrowBack onPress={() => navigation.goBack(null)}/>}
                        right={<HeaderRight categoryIndex={currentCategoryIndex} categoriesCount={categoriesCount}/>}
                />
            </HeaderWrapper>
            <Image source={categories[category.image]}
                   resizeMode='contain'
                   style={{ height: 120, alignSelf: 'center', marginBottom: 30 }}/>
            <CategoryVoteBox text={category.descriptionGreen} face='happy' onPress={() => onCategoryChosen(2)}/>
            <CategoryVoteBox text={'Ok. Could be better...'} face='poker' onPress={() => onCategoryChosen(1)}/>
            <CategoryVoteBox text={category.descriptionRed} face='sad' onPress={() => onCategoryChosen(0)}/>
        </Page>
    )
})

export default class CategoryVoteScreen extends React.Component {
    assetsToLoad = [
        // faces
        require('../../../components/CategoryVoteBox/happy-face.png'),
        require('../../../components/CategoryVoteBox/poker-face.png'),
        require('../../../components/CategoryVoteBox/sad-face.png'),
        // categories
        require('../../../assets/categories/health-of-codebase.png'),
        require('../../../assets/categories/delivering-value.png'),
        require('../../../assets/categories/fun.png'),
        require('../../../assets/categories/learning.png'),
        require('../../../assets/categories/mission.png'),
        require('../../../assets/categories/pawns-or-players.png'),
        require('../../../assets/categories/releasing-process.png'),
        require('../../../assets/categories/speed.png'),
        require('../../../assets/categories/suitable-process.png'),
        require('../../../assets/categories/support.png'),
        require('../../../assets/categories/teamwork.png')
    ]

    render() {
        return <Loader assetsToLoad={this.assetsToLoad}>
            <CategoryVoteComponent
                healthCheckStore={healthCheckStore}
                navigation={this.props.navigation}
            />
        </Loader>
    }
}
