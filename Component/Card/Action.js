import React from 'react';
import Type from 'prop-types';
import {StyleSheet, View, TouchableOpacity as Touch, Text} from 'react-native';
import {align, container, color, font, Icon, letting, layer, viewport} from 'Hitract/UI';
import {Space} from '../Design';
import {Icons} from 'Hitract/Bookmark';

export const ActionSize = {
	component: {
		get borderRadius(){ return this.height / 2 },
		height: 33
	},
	icon: {
		width: 16,
		height: 16
	}
}

export const ActionStates = {
	active: StyleSheet.create({
		component: { backgroundColor: color.azureBlue },
		content:{ color: color.white }
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

export const ActionStyle = StyleSheet.create({
	component: {
		...ActionSize.component,
		flex: 1,
		justifyContent: align.center
	},
	icon: {
		fontSize: font.icon.single,
		justifyContent: align.center,
		...ActionSize.icon
	},
	text: {
		fontSize: font.standard,
		justifyContent: align.center,
		height: ActionSize.icon.height
	},
	view: {flexDirection: align.row, justifyContent: align.center, alignContent: align.center, alignItems: align.center},
})

//exports
export default class CardAction extends React.Component{
	static defaultProps = {
		active: false,
		disabled: false,
		focused: false
	}
	static propTypes = {
		active: Type.bool.isRequired,
		disabled: Type.bool.isRequired,
		focused: Type.bool.isRequired,
		icon: Type.string,
		iconStyle: Type.object,
		onPress: Type.func.isRequired,
		text: Type.string,
		textStyle: Type.object,
		viewStyle: Type.object
	}

	render(){
		const style = getStateStyle(this)
		const iconName = this.props.icon && this.props.icon in Icons ? Icons[this.props.icon]:this.props.icon
		return (<Touch disabled={this.props.disabled} style={[ActionStyle.component, style.component, this.props.style]} onPress={()=>this.props.onPress()}>
			<View style={[ActionStyle.view, this.props.viewStyle]}>
				{this.props.icon && <Icon active name={iconName} style={[ActionStyle.icon, this.props.iconStyle, style.content]}/>}
				<Space by={'half'}></Space>
				{this.props.label && <Text numberOfLines={1} style={[ActionStyle.text, this.props.textStyle, style.content]}>{this.props.label}</Text>}
			</View>
		</Touch>)
	}
}


//scope actions
function getStateStyle({props}){
	const style = {component:[], content:[]}
	if(props.active) {
		style.component.push(ActionStates.active.component)
		style.content.push(ActionStates.active.content)
	}
	else {
		style.component.push(ActionStates.inactive.component)
		style.content.push(ActionStates.inactive.content)
	}

	if(props.disabled) {
		style.component.push(ActionStates.disabled.component)
		style.content.push(ActionStates.disabled.content)
	}

	if(props.focused){
		style.component.push(ActionStates.focused.component)
		style.content.push(ActionStates.focused.content)
	}

	return style

}

