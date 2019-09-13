import React from 'react'
import {StyleSheet, Image} from 'react-native'
import {align, layer, font, color, icon, letting, viewport} from 'Hitract/UI'
import {Area, FeatureAction, Space} from 'Hitract/Component'
import App, {OnBoard} from 'Hitract/App';
import {Background} from 'Hitract/Bookmark'
import OnBoardCards from './Cards';
import {CookieNotice} from './Document';

const background = {
	key: 'background',
	resizeMode: 'cover',
	source: Background.party.large,
	style: {height: viewport.height, position: layer.absolute, width: viewport.width}
}

const ui = StyleSheet.create({
	action: {
		marginTop: letting.prime,
		marginBottom: letting.press
	},
	component: {
		alignItems: align.center
	}
})


export default class Join extends React.Component{
	static navigationOptions = {header: null}
	state = {
		loading: false,
		scrolling:false,
		showCookiesDocument:false
	}
	async componentDidMount(){

		if(await App.exists('firstLogin')){
			this.props.navigation.navigate('Login')
		}
	}
	render(){
		const area = {
			activity: {color: color.white},
			key:'area',
			header:80,
			loading:this.state.loading,
			scrolls: this.state.scrolling === false,
			style: ui.component,
			transparent: true,
		}
		const action = {
			background:'hitract',
			label:OnBoard.Join.action,
			style:ui.action,
			onPress:onPress.bind(this)
		}
		return ([
			<Image {...background}/>,
			<Area  {...area}>
				<OnBoardCards dark onChange={onChange.bind(this)} />
				<Space size={70}/>
				<FeatureAction {...action}></FeatureAction>
				{this.state.showCookiesDocument && <CookieNotice.Document onClose={onCookieNoticeClose.bind(this)}/>}
			</Area>
		])
	}
}


//scope actions
function onCookieNoticeClose(){
	this.setState({showCookiesDocument: false})
}
function onChange(state){ this.setState(state) }

async function onPress(){
	let cookiesAccepted = await App.exists('cookiesAccepted')
	if(cookiesAccepted === false){
		const response = await CookieNotice.show()
		if(response.accepted){
			await App.set('cookiesAccepted',{date:new Date()})
		}
		else if(response.learnMore){
			this.setState({showCookiesDocument:true})
		}
		cookiesAccepted = await App.exists('cookiesAccepted')
	}

	if(cookiesAccepted) this.props.navigation.navigate('Login')

}
