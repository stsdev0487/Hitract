import React from "react";
import {AsyncStorage,StyleSheet,Text,View} from "react-native";
import {Grid,Col,Row} from 'react-native-easy-grid';
import {align, font, color, letting, viewport} from 'Hitract/UI';
import {Area, FeatureAction, Gradient, Hitract, Line, Link, Space} from 'Hitract/Component';
import Api from 'Hitract/Api';
import App, {Account} from 'Hitract/App';
import OnBoardCards from './Cards';
import {TermsNotice,PrivacyNotice} from './Document';

const ui = StyleSheet.create({

    content: {
        backgroundColor:color.transparent,
        width: viewport.width,
        flexDirection: 'column',
        alignItems: align.center,
        alignContent: align.center
    },

    emblem: {
        height: 190,
        width: 150,
        resizeMode: align.center
    },

    feature: {
        marginTop: letting.standard,
        marginBottom: letting.press
    },
    featureContent: {justifyContent: align.center},
    featureIcon: {
        justifyContent: align.center,
        alignItems: align.end
    },
    featureIconComponent: {
        height: 25,
        width: 25,
        backgroundColor: color.white,
        get borderRadius(){ return this.width / 2 }
    },
    featureIconPlaceholderText: {
        ...font.variant.bold,
        fontSize: font.press,
        color: color.navyBlueLight,
        textAlign: align.center,
        lineHeight: font.single + font.press,
        alignContent: align.end
    },
    featureText: {
        justifyContent: align.center,
        alignItems: align.start
    },
    featureTextComponent: {
        fontSize: font.line,
        color: color.white,
        marginLeft: letting.single
    },
    inline: {height: 40, width: 190, resizeMode: align.center},
    login: {  alignItems: align.center }
});

const lineStyle = StyleSheet.create({
    content: {alignItems: align.center},
    item: {fontSize: font.standard},
    label: {fontSize: font.medium},
    text: {color: color.white, textAlign: align.center},
    line: {marginTop: letting.standard}
})

const line = {
    content: { style: [lineStyle.text, lineStyle.label] },
    item: {  lineStyle: lineStyle.line, style: [lineStyle.text, lineStyle.item]  },
    label: { style: [lineStyle.text, lineStyle.label] },
}


export default class Login extends React.Component {
    static navigationOptions={header:null}
    state = {loading: false, scrolling: false, first: true, showTermsDocument:false, showPrivacyDocument:false}
    async componentDidMount(){
        Api.mount(this)
        if(Api.authenticated) {
            this.props.navigation.navigate('Feed')
        }
        else this.setState({
            first: await App.exists('firstLogin') === false
        })
    }
    componentWillUnmount(){ Api.unmount(this) }

    async login(){
        let authenticated = false
        this.setState({loading:true})
        try{
            const account = await Api.app.authenticate()
            authenticated = account && account.authenticated
            if(authenticated) await App.set('firstLogin', {date:new Date()})
        }
        catch(error){
            if(!authenticated){
                console.log('displayLoginErrorHere')
            }

            console.error(error)

        }

        if(authenticated) this.props.navigation.navigate('Feed')
        else this.props.navigation.navigate('Launcher')

    }
    render(){
        const header = this.state.first === false ? 52:154
        return (<Gradient>
            <Area header={header} style={ui.content} transparent loading={this.state.loading} activity={{color:color.white}}>
                <Hitract.Logo emblem={this.state.first === true}></Hitract.Logo>
                {this.state.first === false && <Space by='press'/>}
                {this.state.first === false && <OnBoardCards onChange={onChange.bind(this)}/>}

                {this.state.first && <Space size={97}/>}
                <View style={ui.login}>
                    <Text {...line.label}>{Account.login}/{Account.create}:</Text>
                    <FeatureAction background='facebook' style={ui.feature} onPress={()=>this.login()}>
                        <LoginContent />
                    </FeatureAction>
                    <View {...line.content}>
                        <Text {...line.label}>{Account.agreement.assurance}</Text>
                        <Line {...line.item}>
                            <Text>{Account.agreement.terms.prefix}</Text><Line.Space/><Link onPress={onTerms.bind(this)}>{Account.agreement.terms.suffix}</Link>
                        </Line>
                        <Line {...line.item}>
                            <Text>{Account.agreement.policy.prefix}</Text><Line.Space/><Link onPress={onPrivacy.bind(this)}>{Account.agreement.policy.suffix}</Link>
                        </Line>
                    </View>
                </View>
            </Area>
            {this.state.showTermsDocument && <TermsNotice.Document onClose={onTermsClose.bind(this)} /> }
            {this.state.showPrivacyDocument && <PrivacyNotice.Document onClose={onPrivacyClose.bind(this)}/>}
        </Gradient>);
    }
}

//scope actions
function LoginContent(){
    return (<Grid>
        <Row style={ui.featureContent}>
            <Col size={0.2} style={ui.featureIcon}>
                <View style={ui.featureIconComponent}><Text style={ui.featureIconPlaceholderText}>f</Text></View>
            </Col>
            <Col size={0.7} style={ui.featureText}>
                <Text numberOfLines={1} style={ui.featureTextComponent}>{Account.continue.with.facebook}</Text>
            </Col>
        </Row>
    </Grid>)
}

function onChange(state){ this.setState(state) }

function onPrivacy(){
    this.setState({showPrivacyDocument: true})
}
function onPrivacyClose(){
    this.setState({showPrivacyDocument: false})
}
function onTerms(){
    this.setState({showTermsDocument:true})
}
function onTermsClose(){
    this.setState({showTermsDocument: false})
}

{/*<View style={ui.logoContainer}>*/}
{/*    <View style={ui.emblemContainer}>*/}
{/*        <Image source={Logo.white.emblem} style={ui.emblemImage}/>*/}
{/*    </View>*/}
{/*    <View style={ui.inlineContainer}>*/}
{/*        <Image source={Logo.white.inline} style={ui.inlineImage}/>*/}
{/*    </View>*/}
{/*</View>*/}
{/*{this.state.isFirstLogin && <FirstLogin></FirstLogin>}*/}
{/*{this.state.isFirstLogin === false && <View style={ui.spacingMiddle}></View>}*/}