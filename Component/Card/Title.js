import React from 'react';
import Type from 'prop-types';
import {StyleSheet, Text} from 'react-native';
import {color, font} from 'Hitract/UI';


const ui = StyleSheet.create({
	component: {
		color: color.slate,
		fontSize: font.large
	}
})

//export
export default function CardTitle(properties){
	const attribute = {numberOfLines: properties.lines, style: [ui.component, properties.style]}
	return (<Text {...attribute}>{properties.children}</Text>)
}

CardTitle.propTypes = {
	lines: Type.number.isRequired
}
CardTitle.defaultProps = {
	lines: 1
}
