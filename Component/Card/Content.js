import React from 'react';
import {StyleSheet,View} from 'react-native';
import {align, color, font, letting} from 'Hitract/UI';
import {Type} from 'Hitract/Api';
const frame = letting.contain.x({}, { letting:{ x: letting.medium * 2 }})

import {CardVariant} from './Frame';
const cardFrame = letting.contain.x({}, {...CardVariant.standard.frame, letting: {x: letting.median * 2}})

export const CardContentStyle = StyleSheet.create({
	component: {
		...frame,
		alignSelf: align.center
	},
	cardComponent:{
		...cardFrame
	},
	description: {
		fontSize: font.standard,
		color: color.grayWhite,
		marginBottom: letting.medium
	},
	title: { fontSize: font.mid }
})


//exports
export default function CardContent(properties){
	return (<View style={getStyle(properties)}>{properties.children}</View>)
}
CardContent.propTypes = {
	card: Type.bool.isRequired
}
CardContent.defaultProps = {
	card: false
}
CardContent.ui = CardContentStyle

//scope actions
function getStyle(props){
	const style = [CardContentStyle.component]
	if(props.card) style.push(CardContentStyle.cardComponent)
	if(props.style) style.push(props.style)
	return style
}