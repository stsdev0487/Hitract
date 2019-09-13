import React from 'react';
import Type from 'prop-types';
import {View} from 'react-native';
import {align} from 'Hitract/UI';

//exports
export default function Box(properties){ return (<View style={getStyle(properties)}>{properties.children}</View>) }
Box.propTypes = {
	around: Type.bool.isRequired,
	between: Type.bool.isRequired,
	center: Type.bool.isRequired,
	end: Type.bool.isRequired,
	height: Type.number,
	start: Type.bool.isRequired,
	width: Type.number,
	wrap: Type.bool.isRequired,
	x: Type.bool.isRequired,
	y: Type.bool.isRequired,
	z: Type.number
}
Box.defaultProps = {
	around: false,
	between: false,
	center: false,
	start: false,
	end: false,
	wrap: false,
	x: false,
	y: false
}


//scope actions
function getFlex(properties){
	const box = {}
	if(properties.wrap) box.flexWrap = align.wrap
	if(properties.x) {
		box.flexDirection = align.row
		if(properties.center) box.alignItems = align.center

		if(properties.around) box.alignContent = align.around
		else if(properties.between) box.alignContent = align.between

		if(properties.start) box.justifyContent = align.start
		else if(properties.end) box.justifyContent = align.end

	}
	else if(properties.y) {
		box.flexDirection = align.column
		if(properties.center) box.alignItems = align.center

		if(properties.around) box.alignContent = align.around
		else if(properties.between) box.alignContent = align.between

		if(properties.start) box.justifyContent = align.start
		else if(properties.end) box.justifyContent = align.end
	}
	return box
}
function getStyle(properties){ return [getFlex(properties), getSize(properties), properties.style] }

function getSize(properties){
	const box = {}
	if('width' in properties) box.width = properties.width
	if('height' in properties) box.height = properties.height
	if('z' in properties) box.zIndex = properties.z
	return box
}