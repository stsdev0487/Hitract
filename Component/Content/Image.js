import React from 'react';
import {StyleSheet, Image,View} from 'react-native';
import {Icon} from 'Hitract/UI';
import {Icons} from 'Hitract/Bookmark';
import Svg from 'react-native-svg-uri';
import Api, {not, Type, Valid} from 'Hitract/Api';
import {align} from 'Hitract/UI';

const Dimension = new Set(['width','height','maxHeight','minHeight','maxWidth','maxHeight'])
const DefaultSource = require('../../images/default/source.png')

const ui = StyleSheet.create({component: {alignItems: align.center, justifyContent: align.center, flexShrink: 0, flexGrow: 0}})

//exports
export default class ImageContent extends React.PureComponent{
	static propTypes = { size: Type.object, source: Type.any }
	get source(){ return getSource(this.props.source) }
	render(){
		const type = getType(this.props.source)
		let {size, source, defaultSource, resizeMode,style, ...props} = this.props
		size = size || styleSize(style)
		style = [ui.component, style]
		switch(type){
			case 'svg':
				return <View style={style}><Svg {...size} {...props} source={getSource(source)}/></View>
			case 'icon':
				return <Icon {...props} name={source} />
			default:
				return <View style={style}><Image style={size} resizeMode={resizeMode || 'contain'} source={getSource(source)} defaultSource={defaultSource || DefaultSource} /></View>
		}
	}
}



//scope actions
export function getSize(size, circle=false){
	return Object.assign({
		height: size,
		width: size,
		minHeight: size,
		minWidth: size,
		maxHeight: size,
		maxWidth: size
	}, circle ? {borderRadius:size/2}:null)
}

export function getSource(value){
	if(Valid.number(value)) return value
	else if(Valid.text(value)) return {uri: Api.url(value)}
	return value
}

export function getType(source){
	if(Valid.text(source)){
		if(source.includes('.')) return source.split('.').reverse()[0]
		else if(source in Icons) return 'icon'
	}
	return null
}

export function styleSize(style){
	if(not.array(style) === false) style = [style]
	for(const item of style.filter(Valid.data)){
		for(const entry of Object.entries(item)){
			if(Dimension.has(entry[0])){
				if(Valid.number(entry[1])){
					return getSize(entry[1])
					break
				}
			}
		}
	}
	return null
}