import React from 'react';
import Type from 'prop-types'
import {View,StyleSheet, StatusBar} from 'react-native';
import {color,viewport} from 'Hitract/UI';
import Area from '../Area';

const stylesheet = StyleSheet.create({
	view:{
		flex:1,
		backgroundColor: color.backgroundColor
	}
})

export default class Section extends React.Component{
	static propTypes = {
		style: Type.object
	}
	static defaultProps = {
		style: {}
	}
	render(){
		return (<View style={stylesheet.view}>
			<StatusBar  {...viewport.status.bar.light} />
			<Area contentContainerStyle={this.props.style}>{this.props.children}</Area>
		</View>)
	}
}