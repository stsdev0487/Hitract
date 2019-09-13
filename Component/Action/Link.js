import React from 'react';
import Type from 'prop-types';
import {Text, Linking} from 'react-native';
import font, {TextFormat} from 'Hitract/UI/font';

const Case = Object.keys(TextFormat.Transform)
const Decoration = Object.keys(TextFormat.Decoration)
const Line = Object.keys(TextFormat.Line)

//exports
export default class Link extends React.Component{
	static propTypes = {
		case: Type.oneOf(Case).isRequired,
		decoration: Type.oneOf(Decoration),
		line: Type.oneOf(Line),
		lines: Type.number.isRequired,
		numberOfLines: Type.number.isRequired,
		onPress: Type.func,
		stroke: Type.string,
		style: Type.any,
		url: Type.string
	}
	static defaultProps = {
		case: font.format.none,
		decoration: font.format.underline,
		line: font.format.solid,
		get lines(){ return this.numberOfLines  },
		set lines(value){ return this.numberOfLines = value },
		numberOfLines: 1
	}
	onPress(){
		let message = { opened: false, url:this.props.url  }
		if(message.url && Linking.canOpenURL(message.url)) message.opened = true
		if(this.props.onPress) this.props.onPress(message)
		if(message.opened) Linking.openURL(message.url)
	}
	render(){
		return (<Text numberOfLines={this.props.lines} onPress={()=>this.onPress()} style={getStyle(this)}>{this.props.children}</Text>)
	}
}

//scope actions

function getStyle({props}){
	return [{
		textTransform: props.case,
		textDecorationLine: props.decoration,
		textDecorationStyle: props.line,
		textDecorationColor: props.stroke
	},props.style]
}