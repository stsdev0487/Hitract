import React from 'react';
import {Text, StyleSheet, View} from 'react-native'
import {Type} from 'Hitract/Api';
import {color,font,letting} from 'Hitract/UI';
import {Space} from '../Design';
import Author from './Author';
import Card from '../Card';
import TopicInput from './Input';
import TopicPost from './Post';
import TopicCard from './Card';

export const ui = StyleSheet.create({

	header: {
		...font.variant.bold,
		fontSize: font.median,
		color: color.black,
	},
	content: {
		fontSize: font.medium,
		color: color.gray
	},
	view: {
		marginHorizontal: letting.double
	}
})


export default class Topic extends React.Component{
	static Card = TopicCard
	static propTypes = {
		onChange: Type.func.isRequired,
		topic: Type.object.isRequired
	}
	onChange(type, message){
		switch(type){
			case 'send':
				this.props.topic.post(message)
				break
		}
		console.log(type,message)
		this.setState({date:new Date()})

	}
	render(){
		const topic = this.props.topic
		const posts = this.props.topic.posts
		return <View>
			<Card.Frame header={letting.double} footer={letting.triple}>
				<View style={ui.view}>
					<Text style={ui.header}>{topic.header}</Text>
					<Space by='single'/>
					<Author data={topic.student}/>
					<Space by='median'/>
					<Text style={ui.content}>{topic.content}</Text>
				</View>
			</Card.Frame>
			<Space/>
			<TopicInput onChange={this.onChange.bind(this)}/>
			<Space by='medium'/>
			{posts && posts.map(onPost, this)}
		</View>
	}

}

//scope actions
function onPost(post, index){
	return <TopicPost key={index} onChange={this.onChange.bind(this)} post={post} />
}
