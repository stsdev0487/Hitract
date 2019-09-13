import React from 'react';
import {StyleSheet, ScrollView, Text, TouchableOpacity as Touch} from 'react-native';
import {Type, Valid} from 'Hitract/Api';
import {align, color, layer, letting} from 'Hitract/UI';
import Card from '../Card';


const ui = StyleSheet.create({
	item: {
		...layer.radius[1],
		flexDirection: align.row,
		alignItems: align.center,
		backgroundColor: color.whiteShade,
		height: 33,
		marginTop: letting.standard,
		paddingHorizontal: letting.standard
	},
	scrollView: {

	}
})

export default class Items extends React.Component{
	static defaultProps = {
		card: false,
		items: []
	};
	static propTypes = {
		card: Type.bool.isRequired,
		items: Type.array.isRequired,
		onItem: Type.func.isRequired
	};
	onItemPress(item,index){ this.props.onItem(item, index) }
	render(){
		const items = this.props.items
		return (<Card.Content card={this.props.card}>
				<ScrollView style={ui.scrollView}>{items.map(onItem, this)}</ScrollView>
			</Card.Content>)
	}
	renderItem(){ return this.props.renderItem ? this.props.renderItem(...arguments):arguments[0] }
}

//scope actions
function onItem(item, index){
	let content = this.renderItem(item, index)
	if(content === null) return null
	if(Valid.text(content)) content = <Text numberOfLines={1}>{content}</Text>
 	return (<Touch onPress={()=>this.onItemPress(item,index)}
				   key={`topic-${index}`}
				   style={ui.item}>{content}</Touch>)
}



