import React from 'react';
import Type from 'prop-types';
import {View, Text} from 'react-native';
import {withNavigation} from 'react-navigation';
import {Grid, Col, Row} from 'react-native-easy-grid';
import DataSource from './DataSource';
import {align, letting, Icon} from 'Hitract/UI';
import {Space} from 'Hitract/Component/Design';
import {Box} from 'Hitract/Component/Content';
import Card from 'Hitract/Component/Card';
import Author from './Author';



export default withNavigation(class FeedPost extends React.Component{
	static DataSource = DataSource
	static propTypes = {
		author: Type.object.isRequired,
		content: Type.object.isRequired,
		comments: Type.array.isRequired,
		likes: Type.array.isRequired,
		type: Type.oneOf(Object.values(DataSource.Types)).isRequired
	}
	static defaultProps = {
		author: {},
		content: {},
		likes: [],
		comments: []
	}
	state = {commenting: false, liked:false}

	render(){
		const {author, content, comments, likes} = this.props
		const likeLabel = likes.length ? `${likes.length} Gilla`:'Gilla'
		const commentsLabel = comments.length ? `Kommentera (${comments})`:'Komment'
		return (<Card.Frame topic>
			<Card.HeaderImage source={{uri: content.pictureUrl}}/>
			<Card.Content>
				{content.title && <Text style={Card.Content.ui.title}>{content.title}</Text>}
				{content.description && <Text style={Card.Content.ui.description}>{content.description}</Text>}
				<Author author={author} content={content} onPress={onAuthor.bind(this)}/>
				<Space.Separator/>

				<Box x>
					<Card.Action active={this.state.liked}  onPress={onLike.bind(this)} icon='like' label={likeLabel} ></Card.Action>
					<Space size={letting.line}/>
					<Card.Action onPress={onComments.bind(this)} icon='chat' label={commentsLabel}></Card.Action>
					<Space flex={1} ratio={0.269}/>
				</Box>

				{this.state.commenting && <PostComments {...this.props} />}
				<Box></Box>
			</Card.Content>
		</Card.Frame>)
	}
})


//scope actions
function PostComments(props){
	return (<View><Text>Comments</Text></View>)
}

function onAuthor(){
	const type = DataSource.type(this.props.author)
	this.props.navigation.navigate(type, {[type.toLowerCase()]:this.props.author})
}

function onLike(){
	const liked = this.state.liked === true ? false:true
	this.setState({liked})
}

function onComments(){
	const commenting = this.state.commenting === true ? false:true
	this.setState({commenting})
}


