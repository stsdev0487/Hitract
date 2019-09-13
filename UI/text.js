//Module defines common styles for text (Text component in particular)
import React from 'react';
import * as Data from 'Hitract/Api/Data';
import Valid from 'Hitract/Api/Valid';
import color from './color';
import font from './font';


const standard = {
	style: {
		fontSize: font.standard,
		color: color.grayLight
	}
}

const title = {
	style:{
		fontSize: font.large,
		color: color.slate
	}
}

//Specifies text component shows only 1 line
const inline = {
	numberOfLines: 1,
	...standard
}

//exports
export default {
	standard,
	ellipse,
	inline,
	title
}

//scope actions
function ellipse(...properties){
	const numberOfLines = properties.filter(Valid.number)[0] || 1
	const ellipsizeMode = properties.filter(Valid.text)[0] || 'tail'
	properties = properties.filter(Valid.data).map(item=>item.style ? item:{style: item})
	return Data.copy(...properties.concat([{numberOfLines, ellipsizeMode}]))
}