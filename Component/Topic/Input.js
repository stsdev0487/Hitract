import React, {Fragment} from 'react'
import {StyleSheet, ScrollView, View, Image, TextInput} from 'react-native'
import {Form} from '../Form'
import {Space} from '../Design'
import {Avatar} from '../Content'
import Card from '../Card'
import {StudentModel, CourseTopicPostModel} from '../Network'
import {align} from 'Hitract/UI'
import {Action} from '../Action'
import Api,{Type,Valid} from 'Hitract/Api'

const ui = StyleSheet.create({

	container: {
		flexDirection: align.row,
		alignContent: align.center,
		justifyContent: align.between,
		alignItems: align.center
	},
	component: {

	},
	toolbar: {alignItems: align.end}
})

export default class TopicInput extends React.Component{
	static propTypes={
		onChange: Type.func.isRequired
	}
	state = {disabled:true}
	async componentDidMount(){
		if(Api.authenticated){
			this.setState({
				student: new StudentModel(Api.account.card)
			})
		}
	}


	onChange(text){
		text = Valid.text(text) ? text.trim():''
		this.setState({ text, disabled: text.length === 0 })
	}
	onSend(){
		if(this.state.text){

			this.props.onChange('send', new CourseTopicPostModel({
				created: new Date().toISOString(),
				updated: new Date().toISOString(),
				student: this.state.model,
				content: this.state.text
			}))
			this.setState({text:''})

		}
	}
	render(){
		const student = this.state.student || null
		const style = [Form.Design.input.style, {width: Form.Design.input.style.width - 54 }]
		return (<Card.Content style={ui.component}>
			<View style={ui.container}>
				{student && <Avatar medium source={student.avatar}/>}
				<Space/>
				<TextInput {...Form.Design.input} style={style} value={this.state.text} placeholder="Skriv svar" onChangeText={this.onChange.bind(this)}/>
			</View>
			<Space by='single' />
			<View style={ui.toolbar}>
				<Action disabled={this.state.disabled} onPress={this.onSend.bind(this)} icon='send' active>Skicka</Action>
			</View>
		</Card.Content>)
	}
}


