import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Api, {Data, Type} from 'Hitract/Api';
import {Action,Screen} from 'Hitract/App';
import {Action as ActionItem} from '../../Action';
import Card from '../../Card';
import {Space} from '../../Design';
import {align, color, font, layer, letting} from 'Hitract/UI';
import Item from '../Item';


const ui = StyleSheet.create({
	center: {
		flexDirection: align.column,
		justifyContent: align.center,
		left: 0,
		position: layer.absolute,
		right: 0,
		height: 0,
		top: Item.Frame.height / 2,
		overflow: layer.visible
	},
	edit: {
		top: letting.medium,
		right: letting.medium,
		position: layer.absolute,
	},
	footer: {
		bottom: 0,
		alignItems: align.center,
		left: 0,
		marginBottom: letting.medium,
		position: layer.absolute,
		right: 0
	},
	label: {
		backgroundColor: color.white,
		borderTopLeftRadius: letting.single,
		borderBottomRightRadius: letting.single,
		left: 0,
		paddingHorizontal: letting.median,
		paddingVertical: letting.standard,
		position: layer.absolute,
		top: 0
	},
	dialog: {
		alignItems: align.center,
		alignSelf: align.center,
		backgroundColor: color.white,
		borderColor: color.monochrome,
		borderRadius: letting.medium,
		borderWidth: 1,
		flex: 1,
		flexShrink: 0,
		maxHeight: 106,
		minHeight: 76 + letting.half,
		paddingVertical: letting.single,
		paddingHorizontal: letting.single,
		width: 232
	},
	dialogTitle: {
		color: color.slate,
		fontSize: font.standard,
	}
})


export default class Dialog extends React.Component{
	static propTypes = {
		component: Type.object.isRequired
	}
	state = {slide:null,item:null, editing: false}
	componentDidMount(){
		if(this.props.component){
			const editing = this.props.component.props.editing
			if(this.props.component.item){
				this.setState({editing,item: this.props.component.item})
			}
			else if(this.props.component.slide){
				this.setState({editing,slide: this.props.component.slide})
			}
		}
	}

	send(){
		this.props.component.send(...arguments)
	}

	render(){
		const {slide, item, editing} = this.state
		const content = []
		if(slide === null && item === null) return content
		if(item || slide){
			const placeholder = item ? item.placeholder:slide.items[0].placeholder
			const labelStyle = placeholder ? [ui.label,{backgroundColor:color.tint}]:[ui.label]
			const textStyle = placeholder ? [{color: color.white}]:[]
			content.push(<View key='label' style={labelStyle}><Card.Title style={textStyle}>{Screen.Inspirations.label}</Card.Title></View>)
		}
		if(editing !== true){
			if(item || slide.showsEdit){
				content.push(<ActionItem key='edit' onPress={()=>this.send('edit', {slide, item})} icon='edit' style={ui.edit}>{Action.edit}</ActionItem>)
			}
			if(!item && slide){
				if(slide.showsDialog){
					content.push(<DialogView key='dialog' onPress={()=>this.send('upload', slide)} title={slide.get('data.hobby.hobbyName')}/>)
				}
				if(slide.showsCreateCollage){
					content.push(<View key='createCollage' style={ui.center}>
						<ActionItem style={{alignSelf: align.center}} shadow active onPress={()=>this.send('create', slide)}>{Action.createCollage}</ActionItem>
					</View>)
				}

			}
		}
		else if(item){
			content.push(<View key='uploadImage' style={ui.footer}>
				<ActionItem shadow active onPress={()=>UploadImage(item,this)}>{Action.uploadImage}</ActionItem>
			</View>)
		}
		//else{
		//	content.push(<View key='uploadCollage' style={ui.footer}>
		//		<ActionItem shadow active onPress={()=>this.send('uploadCollage', {item, slide})}>{Action.uploadImage}</ActionItem>
		//	</View>)
		//}

		return content
	}
}

//scope actions
function DialogView(props){
	return <View style={ui.center}>
		<View style={ui.dialog}>
			<Text numberOfLines={1} style={ui.dialogTitle}>{props.title}</Text>
			<Space by='single'/>
			<ActionItem shadow active onPress={props.onPress}>{Action.uploadImage}</ActionItem>
		</View>
	</View>
}



export function UploadImage(item,component){
		ImagePicker.launchImageLibrary({noData: true}, response=>{
			if(response.uri){
				component.send('uploadImage',{item,response})
			}
		})
}