import React from 'react'
import { Image } from 'react-native'
import styled from 'styled-components/native'
import colors from '../../../constants/Colors'
import { Page, Header, CategoryVoteBox, Loader, ArrowBack } from '../../../components/index'
import userVotesStore from '../../../model/user-votes-store'
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

const CategoryVoteComponent = observer(({ navigation }) => {
    const { nextCategory, previousCategory, updateCategory, currentCategory, lastCategory, categoriesCount, currentCategoryIndex, currentCategoryVote } = userVotesStore

    const onCategoryChosen = (value) => {
        updateCategory(value)

        if(lastCategory){
            navigation.push('Summary')
        } else {
            nextCategory()
        }
    }

    const onArrowBack = () => {
        if(currentCategoryIndex === 0){
            navigation.goBack(null)
        } else {
            previousCategory()
        }
    }

    return (
        <Page>
            <HeaderWrapper>
                <Header title={currentCategory.name}
                        left={<ArrowBack onPress={onArrowBack}/>}
                        right={<HeaderRight categoryIndex={currentCategoryIndex} categoriesCount={categoriesCount}/>}
                />
            </HeaderWrapper>
            <Image source={categories[currentCategory.image]}
                   resizeMode='contain'
                   style={{ height: 120, alignSelf: 'center', marginBottom: 30 }}/>
            <CategoryVoteBox selected={currentCategoryVote?.value === 2} text={currentCategory.descriptionGreen} face='happy' onPress={() => onCategoryChosen(2)}/>
            <CategoryVoteBox selected={currentCategoryVote?.value === 1} text={'Ok. Could be better...'} face='poker' onPress={() => onCategoryChosen(1)}/>
            <CategoryVoteBox selected={currentCategoryVote?.value === 0} text={currentCategory.descriptionRed} face='sad' onPress={() => onCategoryChosen(0)}/>
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
                navigation={this.props.navigation}
            />
        </Loader>
    }
}
