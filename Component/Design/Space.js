import React from 'react';
import Type from 'prop-types';
import {StyleSheet,View} from 'react-native';
import {Data} from 'Hitract/Api';
import {color, letting,viewport} from 'Hitract/UI';
import {Scale} from 'Hitract/UI/letting';

const scale = Object.keys(Scale);
const ui = StyleSheet.create({
	separator: {
		marginVertical: letting.single,
		borderBottomColor: color.monochromeLight,
		borderBottomWidth: letting.minimal,
		flex: 1,
		width: '100%'
	}
})

//exports
export default function Space(properties){ return (<View style={getStyle(properties)}/>) }
Space.Separator = spaceSeparator
Space.defaultProps = { by: 'standard', grow: 0, shrink: 0 }
Space.propTypes = {
	by: Type.oneOf(scale).isRequired,
	flex: Type.number,
	grow: Type.number.isRequired,
	ratio: Type.number,
	shrink: Type.number.isRequired,
	size: Type.number
}



//scope actions
function getFlex(properties){
	const style = {}
	if(Data.has(properties, 'flex')) style.flex = Data.get(properties, 'flex')
	if(Data.has(properties, 'basis')) style.flexBasis = Data.get(properties, 'basis')
	if(Data.has(properties, 'ratio')) style.flexBasis = viewport.width * Data.get(properties, 'ratio')
	if(Data.has(properties, 'grow')) style.flexGrow = Data.get(properties, 'grow')
	if(Data.has(properties, 'shrink')) style.flexShink = Data.get(properties, 'shrink')
	return style
}

function getSize(properties){ return 'size' in properties ? properties.size : letting[properties.by] }

function getStyle(properties){
	const size = getSize(properties)
	return [{ height:size, width:size }, getFlex(properties), properties.style]
}

function spaceSeparator(properties){ return (<View style={[ui.separator, properties.style]}/>) }
