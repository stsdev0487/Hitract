import React from "react";
import {Image, StyleSheet, View} from "react-native";
import {Data,Type,Valid} from 'Hitract/Api';
import {align, color, font, layer, letting} from 'Hitract/UI';


export default class SliderItem extends React.Component{
	static propTypes = {
		Item: Type.object.isRequired
	}
	render(){
		if('style' in this === false){
			const x = Data.get(this, 'props.Item.Letting.x') || 0
			const y = Data.get(this, 'props.Item.Letting.y') || 0
			this.style = {paddingHorizontal: x, paddingVertical: y}
		}
		return (<View style={[this.style,this.props.style]}>{this.props.children}</View>)
	}
}

