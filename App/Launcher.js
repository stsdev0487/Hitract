import React from 'react';
import Type from 'prop-types';
import { StyleSheet, Image } from 'react-native';
import {Logo} from 'Hitract/Bookmark';
import {align} from 'Hitract/UI';
import {Gradient} from 'Hitract/Component';
import Api from 'Hitract/Api';


const ui = StyleSheet.create({
	emblem: {
		height: 190,
		width: 150,
		resizeMode: align.center
	},
	inline: {height: 40, width: 190, resizeMode: align.center}
})

export default class Launcher extends React.Component{
	static defaultProps = {
		verified: 'Feed',
		unverified: 'Join'
	}
	static navigationOptions: { header: null }
	static propTypes = {
		verified: Type.string.isRequired,
		unverified: Type.string.isRequired
	}
	async componentDidMount(){
		Api.mount(this)
		const {props} = this
		const {verified, unverified} = props
		const isVerified = await Api.app.open()
		const navigation = isVerified ? verified:unverified
		this.props.navigation.navigate(navigation,{title:navigation});
	}
	componentWillUnmount(){ Api.unmount(this) }
	render(){
		return (<Gradient>
			<Image source={Logo.white.emblem} style={ui.emblem}/>
			<Image source={Logo.white.inline} style={ui.inline}/>
		</Gradient>);
	}
}
