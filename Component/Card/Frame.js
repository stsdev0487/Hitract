import React from 'react';
import Type from 'prop-types';
import {StyleSheet, View} from 'react-native';
import {align,color,layer,letting} from 'Hitract/UI';
import {Space} from '../Design';

export const CardVariant = {
	companion:{
		frame: letting.contain.x({marginHorizontal: letting.standard}, {letting: {x: 60}}),
		types: ['message']
	},
	standalone:{
		frame: {},
		types: ['tablet']
	},
	standard: {
		frame: letting.contain.x({marginHorizontal: letting.standard}),
		types: ['collage', 'module', 'topic']
	},
	viewport:{
		frame: letting.contain.x({}),
		types: ['picker']
	}
}

export const DefaultCardVariant = 'standard'
export const CardTypes = Object.values(CardVariant).reduce(reduceVariantTypes, [])
export const DefaultCardType = 'module'

const ui = StyleSheet.create({
	standard:{
		...CardVariant.standard.frame,
		alignSelf: align.center,
		borderRadius: letting.single,
		marginTop: letting.line,
		marginBottom: letting.line
	},
	component: {
		backgroundColor: color.white
	},
	companion: {
		...CardVariant.companion.frame,
		borderRadius: letting.single
	},
	collage:{
		...layer.shadow[6],
		marginHorizontal:0
	},
	message:{
		...layer.shadow[4]
	},
	module:{
		...layer.shadow[4]
	},
	picker:{
		...layer.shadow[10]
	},
	tablet:{
		...layer.shadow[3]
	},
	topic:{
		...layer.shadow[5],
		borderRadius: letting.half,
		marginBottom: letting.line * 1.5
	},
	viewport:{
		...CardVariant.viewport.frame
	}
})



export default class CardFrame extends React.Component{
	static defaultProps = {
		collage: false,
		footer: letting.medium,
		header: letting.none,
		message: false,
		module: false,
		picker: false,
		tablet: false,
		topic: false
	}
	static propTypes = {
		collage: Type.bool.isRequired,
		footer: Type.number.isRequired,
		header: Type.number.isRequired,
		message: Type.bool.isRequired,
		module: Type.bool.isRequired,
		picker: Type.bool.isRequired,
		tablet: Type.bool.isRequired,
		topic: Type.bool.isRequired
	}
	render(){ return (<View style={getStyles(this)}>
		<Space size={this.props.header} />
		{this.props.children}
		<Space size={this.props.footer} />
	</View>) }
	get type(){ return getType(this) }
	get variant(){ return getVariant(this) }
}

//scope actions
function getStyles({props,type,variant}){ return [ui.component, ui[variant], ui[type], props.style] }

function getType({props}){
	for(const type of CardTypes) if(props[type] === true) return type
	return DefaultCardType
}

function getVariant({type}){
	for(const entry of Object.entries(CardVariant)){
		if(entry[1].types.includes(type)) return entry[0]
	}
	return DefaultCardVariant
}

function reduceVariantTypes(types, value){ return types.concat(value.types) }