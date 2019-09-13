import React from 'react';
import Type from 'prop-types';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {align, viewport} from 'Hitract/UI';

const ui = StyleSheet.create({
	activityIndicator: {
		alignContent: align.center,
		alignItems: align.center,
		alignSelf: align.center,
		height: viewport.height / 2,
		justifyContent: align.center
	}
})

export default class StateActivity extends React.Component{
	static propTypes = {
		loading: Type.bool.isRequired,
		size: Type.any,
		color: Type.string,
		hidesWhenStopped: Type.bool
	}
	static defaultProps = {
		size: 'large',
		hidesWhenStopped: true,
		loading: true
	}
	render(){
		return (<View style={ui.activityIndicator}>
			<ActivityIndicator animating={this.props.loading}
							   color={this.props.color}
							   hidesWhenStopped={this.props.hidesWhenStopped}
							   size={this.props.size}/>
		</View>)
	}
}