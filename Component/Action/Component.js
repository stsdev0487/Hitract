import React from 'react';
import Type from 'prop-types';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import {Data, not, Valid} from 'Hitract/Api';
import {align, color, font, letting, Icon} from 'Hitract/UI';


const defaultScale = 'standard';
const style = {
	action: {
		height: 30,
		flexDirection: align.row,
		flexShrink: 0,
		backgroundColor: color.whiteShade,
		alignItems: align.center,
		get borderRadius(){ return this.height / 2 },
		justifyContent: align.center,
		paddingHorizontal: letting.standard
	},
	text: {
		color: color.text,
		fontSize: font[defaultScale]
	},
	icon: {
		color: color.text,
		fontSize: font.icon[defaultScale]
	}
}

const ui = StyleSheet.create({
	action: {...style.action},
	icon: { ...style.icon },
	text: {...style.text},
	spacing: {
		width: letting.minor,
		height: letting.half
	}
})

export const propTypes = {
	actionStyle: Type.object.isRequired,
	background: Type.string,
	color: Type.string,
	component: Type.object.isRequired,
	iconStyle: Type.object.isRequired,
	scale: Type.oneOf(Object.getOwnPropertyNames(font.icon)),
	target: Type.string.isRequired,
	textStyle: Type.object.isRequired
}
export const defaultProps = {
	actionStyle: {},
	iconStyle: {},
	scale: defaultScale,
	textStyle: {}
}

//exports
export default class Action extends React.Component{
	static propTypes = Data.copy(propTypes)
	static defaultProps = Data.copy(defaultProps)
	static properties(...properties){ return Data.copy(defaultProps, ...properties) }
	static types(...types){ return Data.copy(propTypes, ...types) }
	get component(){ return this.props.component }
	get(notation, preset = null){ return Data.get(this, notation) || preset }
	get navigation(){ return this.get('props.navigation') || this.get('props.component.props.navigation') }
	open(){
		const navigation = this.navigation
		if(navigation) navigation.navigate(this.props.target, ...arguments)
	}
	press(){
		throw new Error(`Press action not configured in: ${this.constructor.name}`)
	}
	pushState(state){ (this.component.setState(state), this) }
	render(){
		const action = {
			style: combine('action', {
				backgroundColor: this.props.background
			},
			this.props.actionStyle, this.props.style)
		}
		return (<TouchableOpacity {...action} onPress={()=>this.press()}>
				{iconColumn(this)}
				{this.state.icon && this.state.text && <View style={ui.spacing}/>}
				{textColumn(this)}
		</TouchableOpacity>)
	}
	state = {}
	stateIndex(state){
		state = Valid.data(state) ? state:this.state
		return state[this.props.target] !== true ? 0:1
	}
	toggle(){
		return this.set({
			[this.props.target]: this.state[this.props.target] !== true
		})
	}
	toggleState(){
		return {
			[this.props.target]: this.state[this.props.target] !== true
		}
	}

}

//scope actions
function custom(defaultStyle, typeStyle){
	if(Object.keys(defaultStyle).length !== Object.keys(typeStyle).length) return true
	for(const field in typeStyle){
		if(not(typeStyle[field])) delete typeStyle[field]
	}
	for(const field in defaultStyle){
		if(field in defaultStyle){
			if(typeStyle[field] !== defaultStyle[field]) return true
		}
	}
	return false
}

function combine(type, typeStyle, ...customStyle){
	for(const field in typeStyle) if(not(typeStyle[field])) delete typeStyle[field]
	return Data.copy(style[type], typeStyle, ...customStyle)
}


function textColumn({props, state}){
	if( not(state.text) ) return null
	return (<Text {...attribute()}>{state.text}</Text>)

	//scope actions
	function attribute(){
		return {
			numberOfLines: 1,
			style: combine('text', {
				color: props.color,
				fontSize: font[props.scale]
			}, props.textStyle)
		}
	}
}

function iconColumn({props,state}){
	if(not(state.icon)) return null
	return (<Icon {...attribute()}/>)
	//scope actions
	function attribute(){
		return {
			name: state.icon,
			style: combine('icon', {
				color: props.color,
				fontSize: font.icon[props.scale]
			},
			props.iconStyle)
		}
	}
}