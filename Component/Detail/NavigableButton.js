import React from 'react';
import Type from 'prop-types';
import {View} from 'react-native';
import {container,Icon} from 'Hitract/UI';



export default class NavigableButton extends React.Component{
	static propTypes = {
		onPress: Type.func.isRequired,
		icon: Type.string.isRequired,
	};
	static defaultProps = {
		icon: 'md-menu',
	};
	render(){
		return (<View style={container.content.fill}>
			<Icon.Button
				name={this.props.icon}
				size={26}
				color="#4F8EF7"
				backgroundColor="#FFF"
				onPress={this.props.onPress}
			/>
		</View>);
	}

}