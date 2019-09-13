import React from 'react';
import Type from 'prop-types';
import {StyleSheet,Text} from 'react-native';
import {align, color, font, letting} from 'Hitract/UI';

export const CardLabelAlignment = ['start', 'center', 'end']

const ui = StyleSheet.create({
	center: {alignSelf: align.center},
	component: {
		...font.variant.normal,
		fontSize: font.print
	},
	end: {alignSelf: align.end},
	start: {alignSelf: align.start}
})

//export
export default function CardLabel(props){
	const attribute = {
		numberOfLines:props.lines,
		style: getStyles(props).concat(props.style)
	}
	return (<Text {...attribute}>{props.children}</Text>)
}

CardLabel.propTypes = {
	align: Type.oneOf(CardLabelAlignment).isRequired,
	bold: Type.bool.isRequired,
	center: Type.bool.isRequired,
	color: Type.oneOf(Object.keys(color)).isRequired,
	left: Type.bool.isRequired,
	light: Type.bool.isRequired,
	lines: Type.number.isRequired,
	right: Type.bool.isRequired,
	serif: Type.bool.isRequired,
	size: Type.oneOf(Object.keys(font)).isRequired
}

CardLabel.defaultProps = {
	align: 'start',
	bold: false,
	center: false,
	color: 'black',
	left: true,
	light: false,
	lines: 1,
	right: false,
	serif: false,
	size: 'print'
}


//scope actions
function getStyles(props){
	return [
		ui.component,
		ui[props.align],
		getAlignment(props),
		getColor(props),
		getSize(props),
		getType(props),
		getWeight(props),
	]
}


function getAlignment(props){
	const style = {}
	if(props.left) style.textAlign = 'left'
	else if(props.center) style.textAlign = 'center'
	else if(props.right) style.textAlign = 'right'
	return style
}



function getColor(props){
	return {
		color: color[props.color]
	}
}

function getSize(props){
	const size = font[props.size]
	if(typeof size === 'number') return {fontSize: size}
	return null
}


function getType(props){
	if(props.serif) return font.serif
	return null
}

function getWeight(props){
	const style = {}
	if(props.light) style.fontWeight = font.weights.light
	else if(props.bold) style.fontWeight= font.weights.bold
	return style
}

