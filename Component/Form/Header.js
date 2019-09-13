import React from 'react';
import Type from 'prop-types';
import {StyleSheet,TouchableOpacity,Text, View} from 'react-native'
import Api from 'Hitract/Api'
import {align, color,font, Icon} from 'Hitract/UI'
import * as Design from'./Design'
import App from 'Hitract/App'
import Box from '../Content';
const ui = StyleSheet.create({
	container: {
		shadowColor: color.transparentDark,
		shadowOffset: {
			width: 0,
			height: 1
		},
		shadowRadius: 8,
		shadowOpacity: 0.75,
		borderBottomWidth: 0,
		zIndex: 10,
		overflow:'visible',
		backgroundColor: color.white
	},
	title:{
		fontSize: font.medium
	},
	icon: {
		fontSize: font.medium * 2
	},
	left:{
		display:'flex',
		flexDirection:align.row,
		alignItems:align.center,
		alignContent:align.center
	}
})



export default class FormHeader extends React.Component{
	static propTypes = {
		left: Type.oneOfType([Type.object, Type.array, Type.func]),
		center: Type.oneOfType([Type.object, Type.array, Type.func]),
		right: Type.oneOfType([Type.object, Type.array, Type.func]),
		title: Type.string
	}
	state = {enabled:false}

	onSave(){
		App.send(Symbol.for(`${FormHeader.name}.onSave`))
	}
	onCancel(){

		App.send(Symbol.for(`${FormHeader.name}.onCancel`))
	}
	onSetState(state){
		this.setState(state)
	}
	componentDidMount(){

		App.mount(this)
		App.on(Symbol.for(`${FormHeader.name}.setState`), this.onSetState.bind(this))
	}
	componentWillUnmount(){

		App.off(Symbol.for(`${FormHeader.name}.setState`), this.onSetState.bind(this))
		Api.unmount(this)
	}
	render(){
		const {navigation} = this.props
		return (<View style={ui.container}>
			<Box style={ui.left}>
				<TouchableOpacity onPress={()=>navigation.goBack(null)}><Icon name='navigate-before' style={ui.icon} /></TouchableOpacity>
				{this.props.title && <Text style={ui.title}>{this.props.title}</Text>}
				{this.props.left}
			</Box>

			<Box>
				{this.props.right}
				{this.state.enabled && <TouchableOpacity onPress={()=>this.onCancel()} style={Design.style.cancel}>
					<Text numberOfLines={1} style={Design.style.cancelText}>Avbryt</Text>
				</TouchableOpacity>}
				{this.state.enabled && <TouchableOpacity onPress={()=>this.onSave()} style={Design.style.save}>
					<Text numberOfLines={1} style={Design.style.saveText}>Spara</Text>
				</TouchableOpacity>}
			</Box>
		</View>)
	}
}
