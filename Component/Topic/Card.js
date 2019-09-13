import React from 'react';
import {StyleSheet, ScrollView, Text, TouchableOpacity as Touch} from 'react-native';
import {Type, Valid} from 'Hitract/Api';
import {align, color, font, layer, letting} from 'Hitract/UI';
import {Box} from '../Content';
import {Space} from '../Design';
import Card from '../Card';
import {Items} from '../List';

const ui = StyleSheet.create({
	item: {
		...layer.radius[0],
		flexDirection: align.row,
		alignItems: align.center,
		backgroundColor: color.whiteShade,
		height: 33,
		marginTop: letting.standard,
		paddingHorizontal: letting.standard
	},
	label: {
		color: color.black,
		fontSize: font.print,
		marginRight: letting.single,
		marginTop: letting.medium,
		marginBottom: letting.standard
	}
})

export default class TopicCard extends React.Component{
	static defaultProps = {
		footer: letting.medium,
		header: 0,
		items: [],
		maximum: 5
	};
	static propTypes = {
		footer: Type.number.isRequired,
		header: Type.number.isRequired,
		items: Type.array.isRequired,
		label: Type.string,
		maximum: Type.number.isRequired,
		onItem: Type.func.isRequired,
		renderItem: Type.func,
		title: Type.string
	};
	onItemPress(item,index){ this.props.onItem(item, index) }
	render(){
		const items = this.props.items.slice(0, this.props.maximum)
		return (<Card.Frame footer={this.props.footer} header={this.props.header} style={this.props.style}>
			<Card.Content card>
				<Card.Title>{this.props.title}</Card.Title>
				<Space by='line' />
				{this.props.label && <Card.Label>{this.props.label}</Card.Label>}
			</Card.Content>
			<Space/>
			<Items card items={items} onItem={this.onItemPress.bind(this)} renderItem={this.props.renderItem} />
			<Space by='double' />
			<Card.Content card>
				<Box x>{this.props.children}</Box>
			</Card.Content>
		</Card.Frame>)
	}
}