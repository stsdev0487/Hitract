import React from "react";
import {StyleSheet, View} from "react-native";
import {Data, Type, Valid} from 'Hitract/Api';
import {align, color, font, layer, letting} from 'Hitract/UI';
import Item from '../Item';
import Image from './Image';

const ui = StyleSheet.create({
	column: {
		flex: 1,
		flexDirection: align.column,
		justifyContent: align.between,
		paddingVertical: letting.standard
	},
	bottomLeft: {borderBottomLeftRadius: Item.Radius},
	bottomRight: {borderBottomRightRadius: Item.Radius},
	row: {
		paddingHorizontal: letting.standard,
		flexDirection: align.row,
		justifyContent: align.between
	},
	topLeft: {borderTopLeftRadius: Item.Radius},
	topRight: {borderTopRightRadius: Item.Radius},
	view: {
		backgroundColor: color.transparent,
		overflow: 'hidden'
	}
})

export function Column(props){ return <View style={ui.column}>{props.children}</View> }

export function Row(props){
	const style = [ui.view, ui.topLeft, ui.topRight, ui.bottomLeft, ui.bottomRight]
	return <View style={ui.row}>
		<View style={style}>
			<Image position='center' component={props.component} style={style} item={props.item}/>
		</View>
	</View>
}

Row.propTypes = {
	component: Type.object.isRequired,
	item: Type.object.isRequired
}

export function TopRow(props){
	const left = [ui.view, ui.topLeft]
	const right = [ui.view, ui.topRight]
	return <View style={ui.row}>
		<View style={left}><Image position='top-left' component={props.component} style={left} item={props.items[0]}/></View>
		<View style={right}><Image position='top-right' component={props.component} style={right} item={props.items[1]}/></View>
	</View>
}
TopRow.propTypes = {
	component: Type.object.isRequired,
	items: Type.array.isRequired
}

export function BottomRow(props){
	const left = [ui.view, ui.bottomLeft]
	const right = [ui.view, ui.bottomRight]
	return <View style={ui.row}>
		<View style={left}><Image position='bottom-left' component={props.component} style={left} item={props.items[0]}/></View>
		<View style={right}><Image position='bottom-right' component={props.component} style={right} item={props.items[1]}/></View>
	</View>
}

BottomRow.propTypes = {
	component: Type.object.isRequired,
	items: Type.array.isRequired
}
