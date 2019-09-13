import React from "react";
import {Image as ImageComponent, StyleSheet, Text, TouchableOpacity as Touch, View} from "react-native";
import Api, {Data,   Type, Valid} from 'Hitract/Api';
import {align, color, font, layer, letting} from 'Hitract/UI';
import Item from '../Item';

const defaultSource = require('../../../images/photo-camera.png')
const ui = StyleSheet.create({
	component:{ ...Item.ImageFrame },
	centerComponent:{
		width: Item.Frame.width - (Item.Letting.x),
		height: Item.Frame.height - (Item.Letting.x)
	},
	uploadView:{
		alignItems:align.center,
		justifyContent: align.center,
		alignSelf: align.center,
		backgroundColor:color.transparent,
		borderWidth: 1,
		borderColor:color.monochrome,
		overflow:'hidden'
	},
	uploadImage:{
		width:31.2,
		height:27.1,
		opacity: 0.5
	},
	centerUploadImage:{
		width: 51.2,
		height: 47.1,
		opacity: 0.5
	},
	uploadText:{
		color: color.black,
		marginTop: 10,
		fontSize: 10,
		opacity: 0.5
	},
	centerUploadText:{
		color: color.black,
		marginTop: 10,
		fontSize: font.medium,
		opacity: 0.5
	}
})
import {UploadImage} from './Dialog'


export default class Image extends React.PureComponent{
	static propTypes = {
		component: Type.object.isRequired,
		item: Type.object,
		position: Type.oneOf(['center','top-left', 'top-right','bottom-left','bottom-right']).isRequired
	}
	componentDidMount(){
		this.item.position = this.props.position
	}
	get item(){ return this.props.item || {} }
	onPress(){
		if(this.props.position === 'center'){
			UploadImage(this.item, this)
		}
		else this.send('image')

	}


	render(){
		const style = this.props.position === 'center' ? [ui.centerComponent, this.props.style]:[ui.component, this.props.style]
		const uploadStyle = this.props.position === 'center' ? [ui.centerUploadImage]:[ui.uploadImage]
		const uploadTextStyle = this.props.position === 'center' ? [ui.centerUploadText]:[ui.uploadText]
		return (<Touch style={style} onPress={this.onPress.bind(this)}>
			<View>
				{this.item.placeholder === false && <ImageComponent source={this.item.source} style={style} resizeMode='cover' />}
				{this.item.placeholder && <View style={style.concat(ui.uploadView)}>
					<ImageComponent source={defaultSource} resizeMode='contain' style={uploadStyle}/>
					{this.props.position === 'center' && <Text style={uploadTextStyle}>Klicka för att ladda upp bild</Text>}
				</View>}
			</View>
		</Touch>)
	}
	send(type){
		if(this.props.component){
			if(Api.mounted(this.props.component)){
				this.props.component.send(type, this.item)
			}
		}
	}
}

