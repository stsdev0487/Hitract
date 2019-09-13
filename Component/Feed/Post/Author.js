import React from 'react';
import Type from 'prop-types';
import {StyleSheet, View, Text, Image, TouchableOpacity as Touch} from 'react-native';
import {Grid, Col, Row} from 'react-native-easy-grid';
import {avatar} from 'Hitract/Bookmark';
import {align, color, font, letting} from 'Hitract/UI';

const Avatar = {
	height: 22.5,
	width: 22.5,
	get borderRadius(){ return this.width / 2 }
}

const ui = StyleSheet.create({
	avatar: { ...Avatar },
	date: {
		fontSize: font.single,
		color: color.grayWhite
	},
	label: {
		flexDirection: align.row,
		justifyContent: align.center,
		alignItems: align.center
	},
	left: {
		justifyContent: align.center,
		alignItems: align.start,
		alignContent: align.center
	},
	name: {
		fontSize: font.standard,
		color: color.grayLight,
		marginLeft: letting.single
	},
	right: {
		justifyContent: align.center,
		alignContent: align.center,
		alignItems: align.end
	}
})

//exports
export default function Author(properties){
	const source = {uri:properties.author.pictureUrl}
	return (<Grid style={properties.style}>
		<Row>
			<Col size={0.4} style={ui.left}>
				<Touch style={ui.label} onPress={()=>properties.onPress()}>
					<Image source={source} defaultSource={{uri:avatar}} style={ui.avatar}/>
					<Text numberOfLines={1} style={ui.name}>{properties.author.name}</Text>
				</Touch>
			</Col>
			<Col size={0.3}></Col>
			<Col size={0.4} style={ui.right}>
				<Text style={ui.date}>{properties.content.posted}</Text>
			</Col>
		</Row>
	</Grid>)
}


Author.propTypes = {
	author: Type.object.isRequired,
	content: Type.object.isRequired,
	onPress: Type.func.isRequired
}



