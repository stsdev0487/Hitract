import React from 'react';
import Type from 'prop-types';
import { Text, TouchableOpacity as Touch} from 'react-native';
import {Data,Valid,not} from 'Hitract/Api';
import {Icon as ActionIcon} from 'Hitract/UI';
import {Icons} from 'Hitract/Bookmark';
import {Header as ui} from './NavigationStyle';

export const actions = {
	property: {
		back: false,
		dismiss: false,
		menu: false
	},
	type: {
		back: Type.bool.isRequired,
		cancel: Type.func,
		dismiss: Type.bool.isRequired,
		menu: Type.bool.isRequired,
		navigate: Type.string,
		press: Type.func,
		save: Type.func,
	}
}

export const attributes = {
	property: {
		title: false,
		style: {},
	},
	type: {
		label: Type.string,
		icon: Type.string,
		navigation: Type.object.isRequired,
		style: Type.object.isRequired,
		styleIcon: Type.object,
		styleLabel: Type.object,
		title: Type.bool.isRequired
	}
}

export const states = {
	property:{
		disabled: false,
		message: null
	},
	type:{
		disabled: Type.bool.isRequired,
		message: Type.object,
		state: Type.object,
	}
}

export default class NavigableAction extends React.Component{
	static propTypes = {
		...actions.type,
		...attributes.type,
		...states.type
	}
	static defaultProps = {
		...actions.property,
		...attributes.property,
		...states.property
	}
	state = {}
	back(){ this.navigation.goBack(this.props.message) }
	cancel(){ this.props.cancel(this.props.message) }
	componentDidMount(){
		if(this.props.state) this.setState(this.props.message)
	}
	dismiss(){ this.navigation.dismiss(this.props.message) }
	menu(){ this.navigation.toggleDrawer(this.props.message) }
	navigate(){ this.navigation.navigate(this.props.navigate, this.props.message) }
	get navigation(){ return Data.get(this, 'props.navigation') }
	press(){ this.props.press(this.props.message) }
	render(){
		const {variant} = this
		const style = [ui.action, this.props.style].filter(Valid)
		return (<Touch disabled={this.props.disabled} onPress={()=>this[variant]()} style={style}>
			{actionIcon(this)}
			{actionLabel(this)}
			{this.props.children}
		</Touch>)
	}

	save(){
		this.props.save(this.props.message)
	}
	get variant(){ return actionVariant(this) }
}


//scope actions
function actionIcon({variant, props}){
	const style = [ui.icon,ui[variant], props.styleIcon].filter(Valid)
	const icon = iconName(props.icon, variant)
	return (icon ? <ActionIcon name={icon} style={style}/>:undefined)
}

function iconName(icon, variant){
	icon = not.text(icon) && variant in Icons  ? variant:icon
	return icon in Icons ? Icons[icon]:icon
}

function actionLabel({variant, props}){
	let {label,styleLabel,title} = props
	const style = [ui.label, title ? ui.title:null, styleLabel].filter(Valid)
	switch(variant){
		case 'cancel':
			label = label || 'Cancel'
			break
		case 'dismiss':
			label = label || 'Dismiss'
			break
		case 'save':
			label = label || 'Save'
			break

	}
	return (label ? <Text numberOfLines={1} style={style}>{label}</Text>:null)
}

function actionVariant(component){
	for(const variant of Object.keys(actions.type)){
		const value = Data.get(component, `props.${variant}`)
		if(value === true) return variant
		else if(Valid.text(value)) return variant
		else if(Valid.function(value)) return variant
	}
	return null
}

function navigableAction(){
	const {action, navigation, input} = this.props
	for(const variant in action){
		const field = action[variant]
		if(field in navigation && typeof navigation[field] === 'function'){
			return navigation[field]()
		}
	}
	navigation.navigate(action.identity, input);
}