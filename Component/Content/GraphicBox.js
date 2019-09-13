import React from 'react';
import {Image, StyleSheet, TouchableOpacity as Touch} from 'react-native';
import {layer,letting} from 'Hitract/UI';
import {Type} from 'Hitract/Api';
import {GraphicBoxFrame} from '../List/GraphicBoxes';
const DefaultSource = require('../../images/OnBoard/Background/mountains-double.png')


const ui = StyleSheet.create({
	component:{
		...GraphicBoxFrame,
		borderRadius: letting.single,
		overflow: layer.hidden
	},
	image:{
		...GraphicBoxFrame,
		...StyleSheet.absoluteFill,
		zIndex:0,
		resizeMode:'cover'
	}
})


//exports
export default class GraphicBox extends React.Component{
	static propTypes = {
		data: Type.object,
		image: Type.any,
		onPress: Type.func.isRequired
	}
	render(){
		return (<Touch onPress={()=>this.props.onPress(this.props)} style={[ui.component, this.props.style]}>
			<Image style={ui.image} source={this.props.image} defaultSource={DefaultSource}/>
			{this.props.children}
		</Touch>)
	}
}
