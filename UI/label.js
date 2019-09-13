import React from 'react';
import font from './font';
import color from './color';
import letting from './letting';

export const attribute = {
	label:{
		note:true,
		style:{
			...font.serif,
			marginRight: letting.half,
			fontSize: font.standard,
			lineHeight: font.standard,
			alignSelf:'center',

		}
	},
	title: {
		style: {
			...font.serif,
			color: color.black,
			marginTop: letting.press,
			fontSize: font.print
		}
	}
}

//export
//const label = textLabel
//label.title = textTitle
//export default label;

//scope actions
//function textLabel(text, ...setting){
//	setting = setting.map(item=>item.style?item:{style:item})
//	return (<Text {...Data.copy(attribute.label, ...setting)}>{text}</Text>)
//}
//
//function textTitle(text, ...setting){
//	setting = setting.map(item=>item.style ? item:{style: item})
//	return (<Text {...Data.copy(attribute.title, ...setting)}>{text}</Text>)
//}

