import React from 'react';
import Type from 'prop-types';
import {Text, View} from 'react-native';
import * as Design from './Design';
export default class FormCaption extends React.Component{
	static propTypes = {
		title: Type.string,
		description: Type.string
	}
	render(){
		return (<View style={Design.style.caption}>
			{this.props.title && <Text {...Design.captionTitle}>{this.props.title}</Text>}
			{this.props.description && <Text  {...Design.captionDescription}>{this.props.description}</Text>}
		</View>)
	}
}