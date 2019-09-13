import React from 'react';
import Type from 'prop-types';
import {StyleSheet, View, TouchableOpacity as Touch, Text} from 'react-native';
import {align, color, font, Icon, letting, layer, viewport} from 'Hitract/UI';
import {Space} from '../Design';
import {Icons} from 'Hitract/Bookmark';
import ActionContext from './Context';

export const ActionHeight = 30
export const ActionComponent = {
	alignItems: align.center,
	get borderRadius(){ return ActionHeight / 2 },
	flexDirection: align.row,
	flexShrink: letting.none,
	height: ActionHeight,
	justifyContent: align.center,
	paddingHorizontal: letting.single
}

export const ActionContentSize = ActionHeight / 2

export const ActionContent = {
	justifyContent: align.center,
}

export const ActionIcon = {
	fontSize: font.icon.standard,
	minWidth: ActionContentSize
}

export const ActionSpace = {by: 'standard'}

export const ActionText = { fontSize: font.standard }

export const ActionView = {
	flexDirection: align.row,
	justifyContent: align.center,
	alignContent: align.center,
	alignItems: align.center
}

export const ActionStates = {
	active: StyleSheet.create({
		component: {},
		content:{  }
	}),
	disabled: StyleSheet.create({
		component: { opacity:0.7 },
		content: {}
	}),
	focused: StyleSheet.create({
		component: { ...layer.shadow[1] },
		content: {}
	}),
	inactive: StyleSheet.create({
		component: { backgroundColor: color.whiteShade },
		content: { color: color.gray }
	})
}

export const ActionVariants = ['bold', 'box','shadow']
export const ActionVariant = {
	standard: StyleSheet.create({
		component: ActionComponent,
		content: ActionContent,
		icon: ActionIcon,
		text: ActionText,
		view: ActionView
	}),
	box:{
		component:{ borderRadius: 3 },
	},
	bold:{
		content: {fontWeight: font.weights.bold}
	},
	shadow:{
		component: {...layer.shadow[6]}
	}

}

export const ActionProperties = {
	active: false,
	accent: color.tint,
	box: false,
	color: color.text,
	disabled: false,
	fill: color.whiteShade,
	flex: false,
	focused: false,
	shadow: false,
	space: ActionSpace,
	tint: color.white,
	text: {numberOfLines: 1}
}

export const ActionContexts = {
	component: Type.object,
	data: Type.object,
	navigation: Type.object,
	open: Type.string,
	toggle: Type.string,
	value: Type.any
}

export const ActionTypes = {
	active: Type.bool.isRequired,
	accent: Type.string.isRequired,
	box: Type.bool.isRequired,
	color: Type.string.isRequired,
	disabled: Type.bool.isRequired,
	fill: Type.string.isRequired,
	flex: Type.bool.isRequired,
	focused: Type.bool.isRequired,
	icon: Type.string,
	iconStyle: Type.object,
	onPress: Type.func.isRequired,
	shadow: Type.bool.isRequired,
	space: Type.object.isRequired,
	text: Type.object.isRequired,
	textStyle: Type.object,
	tint: Type.string.isRequired,
	viewStyle: Type.object
}


//exports
export default ActionContext(class Action extends React.Component{
	Content = ContentView
	static defaultProps = { ...ActionProperties }
	static propTypes = { ...ActionTypes, ...ActionContexts  }
	render(){
		const touchProps = {disabled:this.props.disabled, onPress: this.press.bind(this), style: getComponentStyle(this.props)}
		return (<Touch {...touchProps}><ContentView {...this.props}/></Touch>)
	}
})

//components
function ContentIcon(props){
	if(props.icon) return <Icon name={getIconName(props)} style={getIconStyle(props)}/>
	return null
}

function ContentText(props){
	const textProps = { ...props.text, style:getTextStyle(props) }
	return <Text {...textProps}>{props.children}</Text>
}

function ContentView(props){
	const count = React.Children.count(props.children)
	return (<View style={getViewStyle(props)}>
		<ContentIcon {...props}/>
		{props.icon && count > 0 && <Space {...props.space}/>}
		<ContentText {...props}/>
	</View>)
}

//scope actions
function getComponentStyle(props){
	const fill = props.active ? props.accent:props.fill
	const style = [ActionVariant.standard.component,{backgroundColor:fill}]
	for(const variant of getVariants(props)){
		if(ActionVariant[variant].component){
			style.push(ActionVariant[variant].component)
		}
	}
	if(props.active) style.push(ActionStates.active.component)
	else style.push(ActionStates.inactive.component)
	if(props.disabled) style.push(ActionStates.disabled.component)
	if(props.focused) style.push(ActionStates.focused.component)
	if(props.flex) style.push({flex:1})
	return style.concat([props.style])
}

function getContentStyle(props){
	const color = props.active ? props.tint:props.color
	const style = [ActionVariant.standard.content, {color: color}]
	for(const variant of getVariants(props)){
		if(ActionVariant[variant].content){
			style.push(ActionVariant[variant].content)
		}
	}
	if(props.active) style.push(ActionStates.active.content)
	else style.push(ActionStates.inactive.content)
	if(props.disabled) style.push(ActionStates.disabled.content)
	if(props.focused) style.push(ActionStates.focused.content)
	return style
}

function getIconName({icon}){ return icon in Icons ? Icons[icon]:icon }

function getIconStyle(props){
	const variant = props.variant || 'standard'
	const style = getContentStyle(props)
	return style.concat([
		ActionVariant[variant].icon,
		props.iconStyle
	])
}

function getTextStyle(props){
	const style = getContentStyle(props)
	return style.concat([
		ActionVariant.standard.text,
		props.textStyle
	])
}

function getVariants(props){
	const variants = []
	for(const variant of ActionVariants){
		if(props[variant] === true) variants.push(variant)
	}
	return variants
}

function getViewStyle(props){
	const style = [ActionVariant.standard.view]
	return style.concat([props.viewStyle])
}


