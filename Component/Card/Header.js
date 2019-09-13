import React from 'react';
import {StyleSheet, View} from 'react-native';
import {align, letting} from 'Hitract/UI';

const ui = StyleSheet.create({
	component:{
		flexDirection: align.row,
		justifyContent: align.between,
		alignItems: align.center,
		alignContent: align.center,
		marginTop: letting.single,
		marginLeft: letting.line,
		marginRight: letting.single
	}
})

//export
export default function CardHeader(properties){
	const attribute = {style: [ui.component, properties.style]}
	return (<View {...attribute}>{properties.children}</View>)
}
