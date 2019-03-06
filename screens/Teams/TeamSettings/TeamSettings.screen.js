import React from 'react';
import {Button, Text, Input, Label, Item, Form} from 'native-base'
import {KeyboardAvoidingView} from 'react-native'
import styled from 'styled-components/native'
import colors from '../../../constants/Colors'
import {ImagePicker, Permissions, FileSystem} from 'expo'
import {uploadFile} from '../../../adapters/api'
import {Buffer} from 'buffer'
import uuid from 'uuid/v4'

const Page = styled.View`
    flex: 1;
    backgroundColor: ${colors.primary};
`

const Header = styled.View`
    margin-top: 40px;
    backgroundColor: ${colors.primary};
    height: 150px;
    justifyContent: space-around;
    align-items: center;
    flex: 2;
`

const HeaderText = styled.Text`
  color: ${colors.air};
  font-size: 20px;
  font-weight: bold;
`

const Footer = styled.View`
    flex: 2;
    justify-content: center;
`

const button = {
    paddingLeft: '25%',
    paddingRight: '25%',
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 30,
}

const buttonText = {
    color: colors.primary,
    fontSize: 12,
    fontWeight: 'bold'
}

const labelStyle = {
    color: colors.air
}

const inputStyle = {
    color: colors.air
}

export default class TeamSettingscreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    state = {
    }

    onTextChange = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    _pickImage = async () => {
        const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Adding the team logo requires the access to your camera roll')
            }
        }
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1, 1]
        });

        await this._handleImagePicked(pickerResult);
    }

    _handleImagePicked = async pickerResult => {
        let uploadResponse, uploadResult;

        try {
            if (!pickerResult.cancelled) {
                let uriParts = pickerResult.uri.split('.');
                let fileType = uriParts[uriParts.length - 1];

                const fileString = await FileSystem.readAsStringAsync(pickerResult.uri, {
                    encoding: FileSystem.EncodingTypes.Base64
                })
                const fileBuffer = new Buffer(fileString, 'base64')
                const uploadedResult = await uploadFile(`${uuid()}.${fileType}`, fileBuffer)
                console.log({'uploadedResult': uploadedResult});
                // this.setState({image: uploadResult.location});
            }
        } catch (e) {
            console.log({e});
        }
    }

    componentDidMount () {
        const user = this.props.navigation.getParam('user')
        if (user) {
            this.setState({
                email: user.username
            })
        }
    }

    render () {
        return (
            <Page>
                <Header>
                    <HeaderText>{`add team`.toUpperCase()}</HeaderText>
                    {/*<Image source={AvatarPlaceholder}*/}
                    {/*resizeMode='contain'*/}
                    {/*style={{height: 150}}/>*/}
                </Header>
                <KeyboardAvoidingView style={{flex: 1}}
                                      behavior="padding"
                                      keyboardVerticalOffset={20}>
                    <Form style={{flex: 1, justifyContent: 'space-around', marginRight: 15}}>
                        <Item floatingLabel>
                            <Label style={labelStyle}>Name</Label>
                            <Input style={inputStyle}
                                   autoCorrect={false}
                                   autoCapitalize='words'
                                   textContentType='givenName'
                                   value={this.state.name}
                                   onChangeText={(val) => this.onTextChange('name', val)}/>
                        </Item>
                        <Button rounded
                                light
                                style={[button, {marginTop: 50}]}
                                onPress={this._pickImage}
                                title="Upload a logo"
                        >
                            <Text style={buttonText}>Upload a logo</Text>
                        </Button>
                    </Form>
                </KeyboardAvoidingView>
                <Footer>
                    <Button rounded light onPress={this.login} style={button}>
                        <Text style={buttonText}>{'Continue'.toUpperCase()}</Text>
                    </Button>
                </Footer>
            </Page>
        )
    }
}