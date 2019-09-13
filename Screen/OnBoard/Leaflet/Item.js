import React from "react";
import Type from 'prop-types';
import {StyleSheet, Text,View,Image} from "react-native";
import {align, color, font, layer, letting} from 'Hitract/UI';
import {Space} from 'Hitract/Component';

export const LeafletItemSizing = {
	component: {
		width: 216,
		height: 376
	},
	image: {
		width: 114,
		height: 114
	}
}

export const ItemFrame = {
	width: LeafletItemSizing.component.width,
	height: LeafletItemSizing.component.height,
}
export const ItemLetting = {
	x: letting.median,
	y: 0
}


const ui = StyleSheet.create({
	component: {
		width:LeafletItemSizing.component.width,
		borderRadius: 20,
		alignItems: align.center,
		backgroundColor: color.transparentDark,
		justifyContent: align.between,
	},
	frame:{
		paddingLeft: ItemLetting.x,
		paddingRight: ItemLetting.x,
		paddingTop: ItemLetting.y,
		paddingBottom: ItemLetting.y
	},
	message: {
		...font.variant.normal,
		fontSize: font.median,
		textAlign: align.center,
		marginHorizontal: letting.double
	},
	image: {
		...LeafletItemSizing.image,
		marginTop: letting.triple
	},
	title: {
		...font.variant.bold,
		fontSize: font.line,
		color: color.white,
		textTransform:'uppercase',
		marginBottom: letting.prime
	},
	text:{ color: color.white }
})


export const light = StyleSheet.create({

	component: {
		backgroundColor: color.white
	},
	title: {
		color: color.black
	},
	message:{
		color: color.grayWhite
	}
})



export default class LeafletItem extends React.Component{
	static propTypes = {
		graphic: Type.any.isRequired,
		item: Type.object.isRequired,
		type: Type.oneOf(['light','dark']).isRequired
	}
	static defaultProps = { type: 'light' }
	render(){
		const item = this.props.item
		const theme = this.props.type === 'light' ? light:{}
		return (<View style={ui.frame}>
			<View style={[ui.component, theme.component, this.props.style]}>
				<Space size={30}/>
				<Text numberOfLines={1} style={[ui.title, ui.text, theme.title]}>{item.title}</Text>
				<Text style={[ui.message, ui.text, theme.message]}>{item.message}</Text>
				{this.props.type==='dark' && <Space size={60}/>}
				<Image style={[ui.image]} source={this.props.graphic} resizeMode={'contain'}/>
				<Space size={44}/>
			</View>
		</View>)
	}
}