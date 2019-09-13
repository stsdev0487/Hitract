import React from 'react';
import {StyleSheet} from 'react-native';
import {Type, Valid} from 'Hitract/Api';
import {font, color, layer} from 'Hitract/UI';
import Image, {getSize} from './Image';

export const AvatarFontRatio = 3.141592653589793
export const AvatarBorderRatio = 0.04444444
export const AvatarText = {
	description: {
		ratio: 0.28
	},
	label: {
		ratio: 0.36
	},
	message: {
		ratio: 0.20
	},
	tagline: {
		ratio: 0.3
	},
	title: {
		ratio: 0.36
	}
}
export const AvatarSize = {
	pre: font.pre * AvatarFontRatio,
	small: font.micro * AvatarFontRatio,
	standard: font.single * AvatarFontRatio,
	medium: font.print * AvatarFontRatio,
	large: font.large * AvatarFontRatio,
	stamp: font.double * AvatarFontRatio,
	fixture: font.quarter * AvatarFontRatio
}
export const AvatarPreset = {
	Properties: {
		...Object.keys(AvatarSize).reduce(reduceSizeProperties, {}),
		border: false,
		shadow: false
	},
	Types: {
		...Object.keys(AvatarSize).reduce(reduceSizeTypes, {}),
		border: Type.bool.isRequired,
		shadow: Type.bool.isRequired
	}
}

const ui = StyleSheet.create({
	component: {
		height: AvatarSize.standard,
		width: AvatarSize.standard,
		minHeight: AvatarSize.standard,
		minWidth: AvatarSize.standard,
		maxHeight: AvatarSize.standard,
		maxWidth: AvatarSize.standard,
		borderColor: color.white,
		flexShrink: 0,
		flexGrow: 0,
		backgroundColor: color.white
	},
	shadow: {
		...layer.shadow[4]
	}
})

export default class Avatar extends React.PureComponent{
	static defaultProps = {...AvatarPreset.Properties}
	static propTypes = { ...AvatarPreset.Types, source: Type.any }
	render(){ return <Image {...getStyle(this)} source={this.props.source} /> }
}


//scope actions
export function FontStyle(props, variant = 'label'){
	if(variant && variant in AvatarText === false) variant = 'label'
	for(const field in AvatarSize){
		if(props[field] === true){
			return {fontSize: AvatarSize[field] * AvatarText[variant].ratio}
		}
	}
	return {fontSize: AvatarSize.standard * AvatarText[variant].ratio}
}

function getStyle({props}){
	const style = [ui.component]
	const data = getSizeData(props)
	const size = getSizeProperty(data.property, data.size)
	if(props.style){
		if(props.style.width || props.style.height){
			data.size = Math.min(...[props.style.width, props.style.height].filter(Valid.number))
		}
	}
	style.push({...size, borderRadius: data.size / 2})
	if(props.border) style.push({borderWidth: AvatarBorderRatio * data.size})
	if(props.shadow) style.push(ui.shadow)
	if(props.style) style.push(props.style)
	return {style, size}
}

function getSizeData(props){
	let property = 'standard'
	for(const field in AvatarSize){
		if(props[field] === true){
			property = field
			break
		}
	}
	return {property, size: AvatarSize[property]}
}

function getSizeProperty(property, size){
	if('Sizes' in AvatarPreset === false) AvatarPreset.Sizes = new Map()
	if(AvatarPreset.Sizes.has(property)) return AvatarPreset.Sizes.get(property).ui
	return AvatarPreset.Sizes.set(property, StyleSheet.create({ui: getSize(size, true)})).get(property).ui
}

function reduceSizeProperties(properties, size){ return Object.assign(properties, {[size]: false}) }

function reduceSizeTypes(properties, size){ return Object.assign(properties, {[size]: Type.bool.isRequired}) }
