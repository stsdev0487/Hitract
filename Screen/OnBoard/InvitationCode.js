import React from "react";
import Type from 'prop-types';
import { StyleSheet, View, TextInput , Text} from "react-native";
import {align,color,font,letting, FeatureAction} from 'Hitract/UI';
import Api from 'Hitract/Api';
/*Add localization to text phrases*/
import {Account} from 'Hitract/App';

const frame = letting.contain.x({ marginHorizontal: letting.press })

const stylesheet = StyleSheet.create({
    container: {
        flex: 1,
    },
    heading: {
        ...font.variant.bold,
        color: color.white,
        fontSize: font.triple,
        width: frame.width,
        textAlign: align.center
    },
    buttonComponent: {
        marginTop: letting.prime,
        marginBottom: letting.press
    },

    codeLabel: {
        color: color.white,
        fontSize: font.mid,
        justifyContent: align.center,
        marginBottom: letting.prime,
        textAlign: align.center,
        width: frame.width
    },
    codeContainer:{
        flexDirection: align.row,
        justifyContent: align.evenly,
        width: frame.width
    },
    codeInput: {
        width: 55,
        height: 70,
        borderRadius: 10,
        backgroundColor: color.transparentDark,
        justifyContent: align.center,
        alignItems: align.center
    },
    codeInputText: {
        color: color.white,
        fontSize: font.triple
    },

    questionLabel: {
        width: frame.width,
        fontSize: font.line,
        color: color.white,
        textAlign: align.center

    },
    overlayContainer: {
        ...StyleSheet.absoluteFill,
        backgroundColor: color.transparentDark,
        alignItems: align.center
    },
    topSpace: {
        flexBasis: 114,
        flexShrink: 1
    },
    middle:{
        flexBasis: 83,
        flexShrink: 1
    }

});



export default class InvitationCode extends React.Component {
    static propTypes = {
        hashTag: Type.string.isRequired
    }
    static defaultProps = {
        hashTag:'#missaintefesten'
    }
    verifyCode(){
        console.log({
            origin:InvitationCode,
            instance: this,
            function: 'verifyCode'
        })
    }
    render() {
        return (<View style={stylesheet.container}>
            <View style={stylesheet.overlayContainer}>
                <View style={stylesheet.topSpace}></View>
                <Text numberOfLines={1} style={stylesheet.heading}>{this.props.hashTag}</Text>

                <View style={stylesheet.topSpace}></View>

                <Text numberOfLines={1} style={stylesheet.codeLabel}>Din personliga kod</Text>
                <View style={stylesheet.codeContainer}>
                    <View style={stylesheet.codeInput}>
                        <TextInput style={stylesheet.codeInputText}>X</TextInput>
                    </View>
                    <View style={stylesheet.codeInput}>
                        <TextInput style={stylesheet.codeInputText}>X</TextInput>
                    </View>
                    <View style={stylesheet.codeInput}>
                        <TextInput style={stylesheet.codeInputText}>X</TextInput>
                    </View>
                    <View style={stylesheet.codeInput}>
                        <TextInput style={stylesheet.codeInputText}>X</TextInput>
                    </View>
                </View>

                <FeatureAction background={'feature'}
                               label={'Verifiera kod'}
                               style={stylesheet.buttonComponent}
                               onPress={()=>this.verifyCode()}></FeatureAction>

                <Text numberOfLines={1} style={stylesheet.questionLabel}>Har du ingen kod?</Text>
            </View>
        </View>)
    }
}

function didActivateCode(){
    if(this.state.isFirstLogin !== true){
        this.setState({isFirstLogin: true})
    }
    else{
        this.setState({isFirstLogin: false})
        this.props.navigation.navigate(Api.index.feed)
    }

    console.log({state: this.state, component: Login})
}