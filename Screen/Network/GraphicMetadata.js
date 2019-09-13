import React from 'react'
import {Text, View, StyleSheet, KeyboardAvoidingView} from 'react-native'
import {Type} from 'Hitract/Api';
import {align,color, font, letting,viewport} from 'Hitract/UI';

const ui = StyleSheet.create({

	component: {
		zIndex: 111,
		position: 'absolute',
		top: letting.single,
		left: letting.single,
		right: letting.single,
		flexDirection: align.column,
		alignContent: align.start,
		alignItems: align.start
	},
	view: {
		backgroundColor: color.white,
		alignItems: align.start,
		borderRadius: 4,
		paddingHorizontal: letting.single,
		paddingVertical: letting.half,
		maxWidth: viewport.width - letting.single * 4,
		justifyContent: align.center,
		marginBottom: letting.minor
	},
	text: {
		fontSize: font.single,
		color: color.gray
	},
	titleText:{
		fontSize: font.print
	}
})

export default class GraphicMetadata extends React.Component{
	static propTypes = {
		description: Type.string,
		title: Type.string
	}
	render(){
		const titleStyle = [ui.text, ui.titleText]
		const textStyle = [ui.text]
		return (<View style={ui.component}>
			{this.props.title && <View style={ui.view}>
				 <Text numberOfLines={1} style={titleStyle}>{this.props.title || null}</Text>
			</View>}
			{this.props.description && <View style={ui.view}>
				<Text numberOfLines={1} style={textStyle}>{this.props.description || null}</Text>
			</View>}
		</View>)
	}
}