import React from 'react';
import Type from 'prop-types';
import {StyleSheet,View,Text} from 'react-native';
import {align, color, font, letting, viewport} from 'Hitract/UI';


export const LeafletIndicatorPace = {
	height: 6,
	width: 6,
	flexShrink: 0,
	marginHorizontal: letting.minor,
	backgroundColor: color.white
}



export const ui = StyleSheet.create({
	component: {
		width:viewport.width,
		flexDirection: align.row,
		alignContent: align.center,
		alignItems: align.center,
		justifyContent: align.center,
		paddingHorizontal: letting.minor,
		paddingVertical: letting.median
	},
	pace: {
		...LeafletIndicatorPace,
		borderRadius: LeafletIndicatorPace.width / 2
	},
	active: {
		...LeafletIndicatorPace,
		backgroundColor: color.azureBlue,
		borderRadius: LeafletIndicatorPace.width / 2
	}
})

export default class LeafletIndicator extends React.Component{
	static propTypes = {
		active: Type.number.isRequired,
		total: Type.number.isRequired
	}
	static defaultProps = {
		active: 0,
		total: 0
	}

	render(){ return (<View style={ui.component}>{createPaces(this.props)}</View>) }
}


//scope actions
function createPaces({active, total}){
	return [...Array(total).keys()].map(onPace)
	//scope actions
	function onPace(pace, index){
		const style = [ui.pace]
		if(active === index) style.push(ui.active)
		return (<View key={index} style={style}></View>)
	}
}