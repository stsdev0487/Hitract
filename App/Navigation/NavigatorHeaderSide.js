import React from 'react';
import Type from 'prop-types';
import {View, Image, TextInput} from 'react-native';
import Api, {Data} from 'Hitract/Api';
import HeaderAction from 'Hitract/App/Navigation/Action';
import {LeftSide,RightSide,TitleSide} from 'Hitract/App/Navigation/NavigationStyle';
import {Logo} from 'Hitract/Bookmark';
export const variants = ['app', 'nest', 'modal']

class HeaderSide extends React.Component{
	static propTypes = {
		title: Type.string,
		variant: Type.oneOf(variants).isRequired,
	}
	static defaultProps = {
		variant: variants[0]
	}
	get navigation(){ return Data.get(this, 'props.navigation') }
	componentDidMount(){ Api.mount(this) }
	componentWillUnmount(){ Api.unmount(this) }
	get variant(){ return Data.get(this, 'props.variant') || variants[0] }
}

export class Left extends HeaderSide{
	render(){
		const content = contentLeft(this)
		return (<View style={LeftSide.view}>{content}</View>)
	}
}



export class Right extends HeaderSide{
	render(){
		const content = contentRight(this)
		return (<View style={RightSide.view}>{content}</View>)
	}
}

export class Title extends HeaderSide{
	render(){
		const content = contentTitle(this)
		return (<View style={TitleSide.view}>{content}</View>)
	}
}


//scope actions
function contentTitle({props}){
	const {variant, search, navigation} = props
	let content = []
	switch(variant){
		case 'app':
			return [
				<Image key='logo' style={{width:106,height:19}} resizeMode={'contain'} source={Logo.color.inline.source}/>
			]
			break
		case 'form':
			break
		case 'modal':
			break
		case 'nest':
			break
		case 'search':
			content = [
				<TextInput placeholder='search' value={search} numberOfLines={1}></TextInput>
			]
			break
	}
	return content
}

function contentLeft({variant, navigation, props}){
	let content = []
	switch(variant){
		case 'app':
			content = [
				<HeaderAction key='menu' menu navigation={navigation}/>
			]
			break
		case 'form':
			content = [
				<HeaderAction key='back' back label={props.title} title/>
			]
			break
		case 'modal':
			content = [
				<HeaderAction key='dismiss' dismiss navigation={navigation}/>
			]
			break
		case 'nest':
			content = [
				<HeaderAction key='back' back label={props.title} title/>
			]
			break
		case 'search':
			content = [
				<HeaderAction key='menu' menu navigation={navigation}/>
			]
			break
	}
	return content

}

function contentRight({props}){
	const {variant, navigation} = props
	let content = []
	switch(variant){
		case 'app':
			content = [
				<HeaderAction key='search'  navigate='Search' icon='search' navigation={navigation}/>,
				<HeaderAction key='chat' navigate='Mail' icon='chat' navigation={navigation}/>
			]
			break
		case 'form':
			content = [
				<HeaderAction key='cancel' cancel icon='cancel' label='ok' title navigation={navigation}/>,
				<HeaderAction key='save' save icon='save' label='save' title navigation={navigation}/>
			]
			break
		case 'modal':
			content = [
				<HeaderAction key='ok' ok label='ok' title navigation={navigation}/>
			]
			break
		case 'nest':
			break
		case 'search':
			content = [
				<HeaderAction key='chat' navigate='Chat' icon='chat' navigation={navigation}/>
			]
			break

	}
	return content
}


