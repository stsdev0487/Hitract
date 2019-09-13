import React from 'react';
import {StyleSheet,Modal, Text, TouchableHighlight as Touch, View} from 'react-native';
import {WebView} from 'react-native-webview';
import {Type} from 'Hitract/Api';
import {CardAction,Space, Gradient} from 'Hitract/Component';
import {color,align,font,letting, layer, Icon} from 'Hitract/UI';



const Properties = {
	baseUrl:'https://test.hitract.se'
}

const ui = StyleSheet.create({
	toolbar: {
		...layer.shadow[4],
		position: layer.absolute,
		flexDirection: align.row,
		zIndex:1000,
		backgroundColor:color.white,
		paddingTop:40,
		paddingBottom: letting.half,
		paddingHorizontal: letting.standard,
		top: 0,
		width:'100%'

	},
	button:{
		flex:0,
		paddingHorizontal: letting.median,
		height:28
	},
	webview:{
		flex:1
	}
})

export default class DocumentModal extends React.Component{
	static propTypes = {
		onClose: Type.func.isRequired,
		webview: Type.object,
		show: Type.bool.isRequired,
		source: Type.any.isRequired,
		title: Type.string
	}

	static defaultProps = {
		show:true
	}
	state = {}
	componentDidMount(){
		this.setState({show:this.props.show})
	}
	onClose(){
		this.setState({show:false},()=>{
			this.props.onClose()
		})
	}
	render(){
		return (<View>

			<Modal animationType="slide" transparent={false} visible={this.state.show} onRequestClose={onRequestClose.bind(this)}>
				<View style={ui.toolbar}>
					<CardAction icon='close' style={ui.button} onPress={this.onClose.bind(this)} label='CLOSE'  />
					<Space/>
				</View>
				<WebView
					style={ui.webview}
					source={this.props.source}
					{...Properties}
					{...this.props.webview}
					onLoadProgress={onProgress.bind(this)}
					onError={onError.bind(this)}/>
			</Modal>
		</View>)
	}
}

function onProgress(error){
	console.log(error.nativeEvent)
}
function onError(error){
	console.error(error.nativeEvent)
}
function onRequestClose(){

}