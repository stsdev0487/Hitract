import React from 'react';
import Type from 'prop-types';
import {Text, View} from 'react-native';

export function Break(props){ return (<Text numberOfLines={props.count} style={props.style}>{'\n'.repeat(props.count)}</Text>) }
Break.propTypes = {count: Type.number.isRequired, style: Type.object}
Break.defaultProps = {count: 1}

export function Space(props){ return (<Text>{' '.repeat(props.count)}</Text>) }
Space.propTypes = {count: Type.number.isRequired}
Space.defaultProps = {count: 1}

export default class LiteratureLine extends React.Component{
	static defaultProps = {numberOfLines: 1}
	static propTypes = {
		lineStyle: Type.any,
		numberOfLines: Type.number.isRequired,
		style: Type.any
	}
	static Break = Break
	static Space = Space
	render(){
		const {numberOfLines, style} = this.props
		const children = React.Children.toArray(this.props.children).map(onText)
		return (<View style={this.props.lineStyle}><Text style={this.props.style}>{children}</Text></View>)

		//scope actions
		function onText(child, key){ return React.cloneElement(child, {key, style, numberOfLines}) }
	}
}





