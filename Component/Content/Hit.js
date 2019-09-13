import React from 'react';
import {StyleSheet, Text, TouchableOpacity as Touch, View} from 'react-native';
import {Type} from 'Hitract/Api';
import {align, color, letting, font} from 'Hitract/UI';
import Avatar, {AvatarPreset,FontStyle} from './Avatar';
import {Space} from '../Design';

const MinimumTextScale = 0.66666667


const HitContent = {
	description: {  //10
		...font.variant.regular,
		color: color.grayLight
	},
	label: {  //14/62
		...font.variant.regular,
		color: color.gray
	},
	message: {  //12
		...font.variant.regular,
		color: color.gray
	},
	tagline: { //14/62
		...font.variant.regular,
		color: color.grayWhite
	},
	title: {
		...font.variant.bold,
		color: color.grayLight
	}
}

const HitPreset = {
	title: {
		numberOfLines: 1
	},
	label: {  //14/62
		numberOfLines: 1
	},
	tagline: { //14/62
		numberOfLines: 1
	},
	message: {  //12
		numberOfLines: null
	},
	description: {  //10
		numberOfLines: 2
	}
}

const ui = StyleSheet.create({
	component: {
		minWidth: 100,
		flexDirection: align.row,
		alignItems:align.center,
		alignContent:align.center,
		justifyContent: align.between,
		alignSelf: align.start,
		flex: 1
	},
	frame: {
		flexDirection: align.column,
		alignItems: align.start,
		alignContent: align.center,
		justifyContent: align.between,
	},
	text: {
		fontSize: font.standard,
		color: color.gray
	},
	...HitContent
})


export default class Hit extends React.Component{
	static propTypes = {
		...AvatarPreset.Types,
		...Object.keys(HitContent).reduce(reduceContentTypes,{}),
		avatar: Type.any,
		disabled: Type.bool.isRequired,
		onPress: Type.func
	}
	static defaultProps = {
		...AvatarPreset.Properties,
		disabled: false
	}
	componentDidMount(){
		this.setState({disabled:this.props.disabled})
	}
	onPress(){
		const message = {props:this.props, state:this.state}
		if(this.props.onPress) this.props.onPress(message, state=>this.setState(state))
	}
	render(){
		const avatarProps = getAvatarProperties(this)
		const content = getContent(this.props, avatarProps)
		return (<Touch activeOpacity={0.9}
					   style={[ui.component, this.props.style ]}
					   onPress={this.onPress.bind(this)}
					   disabled={this.state.disabled}>
			{this.props.avatar && <View>
				<Avatar source={this.props.avatar} {...avatarProps}/>
			</View>}
			{content.length && this.props.avatar && <Space by='single' />}
			{content.length && <View style={ui.frame}>
				{content}
			</View>}
			{this.props.children}
		</Touch>)
	}
	state = {}
}




//scope actions
function getAvatarProperties({props}){
	const avatarProps = {}
	for(const field in AvatarPreset.Properties){
		if(field in props) avatarProps[field] = props[field]
	}
	return avatarProps
}

function getContent(props, avatarProps){
	const content = []
	for(const field in HitPreset){
		if(props[field]){
			const style = [ui[field], FontStyle(avatarProps, field)]
			content.push(<Text key={content.length} {...HitPreset[field]} style={style}>{props[field]}</Text>)
		}
	}
	return content
}


function reduceContentTypes(properties, field){ return Object.assign(properties, {[field]: Type.string }) }