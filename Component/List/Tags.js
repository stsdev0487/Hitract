import React from 'react';
import Type from 'prop-types';
import {View,ScrollView,StyleSheet} from 'react-native';
import {letting} from 'Hitract/UI';
import {Tag} from '../Action';
import Card from '../Card';

const ui = StyleSheet.create({
	content: {
		paddingVertical: letting.standard,

	},
	label:{
		top:letting.minor
	}
})

const attribute = {
	horizontal: true,
	contentContainerStyle: ui.content
}

export default class Tags extends React.Component{
	static propTypes = {
		item: Type.func,
		items: Type.array.isRequired,
		label: Type.string,
		title: Type.string
	}
	static defaultProps = {
		title: null,
		label: null,
		item(item){ return item }
	}
	state = {collapsedCount: Infinity, scrolls: false}
	items(){ return (Array.isArray(this.props.items) ? this.props.items:[]) }
	list(){ return this.state.seeAll === true ? this.items():this.items().slice(0, this.state.collapsedCount) }
	total(){ return this.items().length }


	render(){
		const total = this.total()
		const {label, scrolls, title} = this.props
		const scroll = {...attribute, scrollEnabled:scrolls, onContentSizeChange:onContent.bind(this)}
		return (total > 0 && <View onLayout={onLayout.bind(this)}>
			{title && <Card.Label style={ui.label} type='title'>{title}</Card.Label>}
			<ScrollView {...scroll}>
				{label && <Card.Label style={ui.label}>{label}: </Card.Label>}
				{this.list().map(onTag, this)}
			</ScrollView>
		</View>)
	}
}

//scope actions
function onContent(width){
	if(this.state.dimension){
		if(width > this.state.dimension.width) this.setState({scrolls: true})
		else this.setState({scrolls: false})
	}
}

function onLayout(event){
	if(this.state.dimension) return
	this.setState({dimension: event.nativeEvent.layout})
}

function onTag(item, index){
	return <Tag component={this} key={index} target={this.props.item(item)}/>
}