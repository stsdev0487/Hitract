import React from 'react';
import Type from 'prop-types';
import {StyleSheet,View,TouchableHighlight as Touch} from 'react-native';
import {align, color, font, letting, viewport} from 'Hitract/UI';

export const  IndicatorPace = {
	height: 12,
	width: 12,
	flexShrink: 0,
	marginHorizontal: letting.half,
	backgroundColor: color.monochrome
}

export const ui = StyleSheet.create({
	active: {
		...IndicatorPace,
		backgroundColor: color.azureBlue,
		borderRadius: IndicatorPace.width / 2
	},
	component: {
		width:viewport.width,
		flexDirection: align.row,
		alignContent: align.center,
		alignItems: align.center,
		justifyContent: align.center,
		paddingHorizontal: letting.minor
	},
	pace: {
		...IndicatorPace,
		borderRadius: IndicatorPace.width / 2
	},
})

export default class Indicator extends React.Component{
	static propTypes = {
		active: Type.number.isRequired,
		total: Type.number.isRequired,
		onPress: Type.func.isRequired
	}
	static defaultProps = {
		active: 0,
		total: 0
	}
	render(){ return (<View  style={ui.component}>{createPaces.call(this,this.props)}</View>) }
}


//scope actions
function createPaces({active, total}){
	return [...Array(total).keys()].map(onPace, this)
	//scope actions
	function onPace(pace, index){
		const style = [ui.pace]
		if(active === index) style.push(ui.active)
		return (<Touch key={index} onPress={()=>this.props.onPress({active:index})} style={style}><View></View></Touch>)
	}
}