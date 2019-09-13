import React from 'react'
import {StyleSheet,Text, View } from 'react-native'
import Api, {Type} from 'Hitract/Api'
import {Space} from '../Design'
import {Avatar,Box} from '../Content'
import Card from '../Card'
import {Action} from '../Action'
import {align, color, font, letting} from 'Hitract/UI'

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

export default class TopicPost extends React.Component{
    static propTypes = {
        post: Type.object.isRequired,
		onChange: Type.func.isRequired
    }


	upVote(){
		this.props.onChange('upVote', this.props.post)
	}

	downVote(){
		this.props.onChange('downVote', this.props.post)
	}

	render(){
		const {post} = this.props
		const id = Api.account.id
		const hasUserUpVote = post.upVoters.filter(voter=>voter.id === id).length === 1
		const hasUserDownVote = post.downVoters.filter(voter=>voter.id === id).length === 1
		const content = post.content
		return (<Card.Message avatar={post.student.avatar} style={{marginBottom:letting.median}}>
				{content && <Text style={ui.content}>{content}</Text>}
				<Space/>
				<Box x>
					<Action active={hasUserUpVote} onPress={this.upVote.bind(this)} icon='up'>Rosta upp ({post.upVotes})</Action>
					<Space />
					<Action active={hasUserDownVote} onPress={this.downVote.bind(this)} icon='down'>Rosta ner ({post.downVotes})</Action>
				</Box>
			</Card.Message>)
	}

}


//export default AnswerComponent;
