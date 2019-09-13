import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {align, color, font, layer, letting} from 'Hitract/UI';
import {Type} from 'Hitract/Api';
import {Space} from '../Design';

const ui = StyleSheet.create({
	component: {
		...StyleSheet.absoluteFill,
		paddingLeft: letting.single,
		paddingRight: letting.single,
		backgroundColor: color.transparentShade,
		zIndex:1,
		paddingHorizontal: letting.half,
		paddingVertical:letting.half,
		justifyContent: align.center
	},

	description:{
		...font.sans,
		color: color.white,
		fontSize: font.standard,
		...layer.shadow[2],
		paddingHorizontal: letting.half
	},
	descriptionCenter:{
		textAlign: align.center
	},
	descriptionLeft: {
		textAlign: align.left
	},
	descriptionRight: {
		textAlign:align.right,
		alignSelf: align.end
	},
	title: {
		...font.sans,
		color: color.white,
		fontSize: font.line,
		textAlign: align.center,
		alignSelf:align.center,
		...layer.shadow[2]
	},
	titleMedium: {
		fontSize: font.triple
	},
	titleLarge: {
		fontSize: 64,
		flex:1
	},
})


export default class OverlayDetail extends React.Component{
	static defaultProps = {
		center: false,
		large: false,
		left: false,
		medium: false,
		right: false,

	}
	static propTypes = {
		center: Type.bool.isRequired,
		description: Type.string,
		large: Type.bool.isRequired,
		left: Type.bool.isRequired,
		medium: Type.bool.isRequired,
		right: Type.bool.isRequired,
		title: Type.string
	}

	render(){
		const descriptionLines = this.props.center ? 3:1
		return <View style={[ui.component,this.props.style]}>
			{this.props.title && <Text numberOfLines={1} adjustsFontSizeToFit  style={getTitleStyles(this.props)}>{this.props.title}</Text>}
			{this.props.space && <Space flex={this.props.space} />}
			{this.props.description && <Text numberOfLines={descriptionLines} style={getDescriptionStyles(this.props)}>{this.props.description}</Text>}
		</View>
	}
}

//scope actions
function getDescriptionStyles(props){
	const styles = [ui.description]
	if(props.left) styles.push(ui.descriptionLeft)
	else if(props.center) styles.push(ui.descriptionCenter)
	else if(props.right) styles.push(ui.descriptionRight)
	if(props.large) styles.push({fontSize:font.medium})
	return styles
}
function getTitleStyles(props){
	const styles = [ui.title]
	if(props.large) styles.push(ui.titleLarge)
	else if(props.medium) styles.push(ui.titleMedium)
	return styles
}

