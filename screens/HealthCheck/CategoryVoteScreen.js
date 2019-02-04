import React from 'react';
import {Icon} from 'native-base'
import {TouchableOpacity, Image} from 'react-native'
import styled from 'styled-components/native'
import colors from '../../constants/Colors'
import Page from '../../components/Page'
import Header from '../../components/Header'
import healthCheckStore from '../../model/health-check-store'
import Loading from '../../components/Loading'
import categories from '../../assets/categories/category-icons'
import {observer} from 'mobx-react/native';

const HeaderWrapper = styled.View`
  margin-bottom: 50px;
`
const CategoryVoteBox = styled.TouchableOpacity`
  background-color: ${colors.air};
  border-radius: 10px;
  margin: 10px 30px;
  padding: 20px;
`
const CategoryVoteText = styled.Text`
  color: ${colors.primary};
  font-size: 16px;
`

const CategoryVoteComponent = observer(({navigation, healthCheckStore}) => {
    if(!healthCheckStore.healthCheck.categories) return <Loading />
    const category = healthCheckStore.currentCategory
    const {nextCategory, lastCategory} = healthCheckStore

    const onCategoryChosen = (value) => {
        console.log(lastCategory);
        if(lastCategory){
            return navigation.navigate('Summary')
        }
        nextCategory(value)
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
            <CategoryVoteBox onPress={()=>onCategoryChosen(2)}>
                <CategoryVoteText>
                    {category.descriptionGreen}
                </CategoryVoteText>
            </CategoryVoteBox>
            <CategoryVoteBox onPress={()=>onCategoryChosen(1)}>
                <CategoryVoteText>
                    Ok. Could be better...
                </CategoryVoteText>
            </CategoryVoteBox>
            <CategoryVoteBox onPress={()=>onCategoryChosen(0)}>
                <CategoryVoteText>
                    {category.descriptionRed}
                </CategoryVoteText>
            </CategoryVoteBox>
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