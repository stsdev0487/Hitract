import React from 'react';
import Type from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
import {StyleSheet, View, Text,TouchableOpacity} from "react-native";
import {align, color, font, layer, letting} from 'Hitract/UI';
import {GradientPalette} from 'Hitract/Bookmark';
import {Gradient} from '../Design';

const frame = letting.contain.x({
	marginHorizontal: letting.press,
	height: 50
})


const ui = StyleSheet.create({
	container: {
		alignItems: align.center,
		backgroundColor: color.white,
		get borderRadius(){ return this.height / 2 },
		flexDirection: align.row,
		height: frame.height,
		justifyContent: align.center,
		overflow: layer.hidden,
		width: frame.width
	},
	label: { color: color.white, fontSize: font.double, },
	gradient: { ...StyleSheet.absoluteFillObject }
});

export default class FeatureAction extends React.Component{
	static propTypes = {
		background: Type.oneOf(Object.keys(GradientPalette)),
		gradient: Type.object,
		label: Type.string,
		onPress: Type.func.isRequired
	};
	render(){
		return (<TouchableOpacity onPress={this.props.onPress} style={this.props.style}>
			<View style={[ui.container, this.props.containerStyle]}>
				<Background {...this.props}/>
				{this.props.children}
				{this.props.label && createLabel(this.props.label)}
			</View>
		</TouchableOpacity>);
	}
}

//scope actions

function Background(props){
	if(props.gradient) return createGradient(props.gradient)
	else if(props.background) return createGradient({name:props.background})
	return null
}


function createGradient(attribute){
	return (<Gradient type={'button'} {...attribute}  style={ui.gradient}></Gradient>)
}

function createLabel(label){
	return (<Text numberOfLines={1} style={ui.label}>{label}</Text>)
}
