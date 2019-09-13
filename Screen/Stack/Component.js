import React from 'react';
import Type from 'prop-types';
import {ActivityIndicator, Image,  StyleSheet, TouchableOpacity, Text,View} from "react-native";
import {align, color, font, layer, letting, SectionView} from 'Hitract/UI';
import Api from 'Hitract/Api';

const ui = StyleSheet.create({
	containerTitleText: {
		...font.variant.bold,
		color: color.azureBlue,
		fontSize: font.large,
		paddingHorizontal: letting.standard,
		paddingVertical: letting.mid
	},
	containerTitleView:{
		...layer.shadow[3],
		...layer.radius[3],
		backgroundColor: color.white,
		padding: letting.standard,
	},
	containerView: {
		alignItems: align.center,
		flex:1,
		paddingHorizontal: letting.standard,
		paddingVertical: letting.mid,
		backgroundColor:color.transparentLight
	}
})

export default class StackComponent extends React.Component{
	static propTypes = {
		loading: Type.bool.isRequired,
		navigation: Type.object.isRequired
	}
	static defaultProps = {
		loading: false
	}
	static navigationOptions = {}
	state = {
		authenticated: Api.authenticated,
		title: 'Stack Component Sample'
	}
	componentDidMount(){
		Api.mount(this)
		this.setState({authenticated:Api.authenticated})
	}
	componentWillUnmount(){ Api.unmount(this) }
	render(){
		return (<SectionView>
			<View style={ui.containerView}>
				<View style={ui.containerTitleView}>
					<Text style={ui.containerTitleText}>{this.state.title}</Text>
				</View>
			</View>
		</SectionView>)
	}
}