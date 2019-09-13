import React from 'react';
import {Text, StyleSheet, View} from 'react-native'
import {Type} from 'Hitract/Api';
import {align, color, font, letting, Icon} from 'Hitract/UI';
import {Avatar} from 'Hitract/Component/Content';

const ui = StyleSheet.create({
	component: {
		flexDirection: align.row,
		alignItems: align.center
	},
	prefix:{
		marginRight: letting.minor
	},
	suffix:{
		marginLeft: letting.minor
	},
	text: {
		fontSize: font.medium,
		color: color.gray
	}
})

export default class TopicAuthor extends React.PureComponent{
	static propTypes = {
		data: Type.object.isRequired,
		label: Type.string
	}
	static defaultProps = {
		label: 'Av',
		data:{}
	}
	render(){
		const author = this.props.data
		return (<View style={[ui.component, this.props.style]}>
			{this.props.label && <Text style={[ui.text, ui.prefix]}>{this.props.label}: </Text>}
			<Avatar source={author.avatar} />
			<Text style={[ui.text, ui.suffix]}> {author.fullName} </Text>
		</View>)
	}
}