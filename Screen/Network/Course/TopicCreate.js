import React from 'react';
import {  StyleSheet, View, TextInput } from 'react-native';
import {Area, Gradient, Card, Space, Form, Fieldset} from 'Hitract/Component';
import Api, {Data, Valid,FormProtocol} from 'Hitract/Api';
import {align,letting} from 'Hitract/UI';
import {Action} from 'Hitract/Component';


export default FormProtocol(class UniversityTopicCreate extends React.Component{
	state = {disabled: true}
	componentDidMount(){

		this.on(this.event.change, ()=>{
			console.log('changed')
			this.setState({disabled: this.form.valueCount === 0})
		})
		this.on(this.event.submit, ()=>{
			console.log('submit')
			this.setState({disabled: this.form.valueCount === 0})
		})

	}
	onSave(){

	}
	onClear(){

		this.setState({
			disabled:true,
			description:'',
			question: ''
		})
	}
	render(){
		const course = Data.get(this, 'props.navigation.state.params.course')
		const description = `Skapa ny fråga rörande ${course.titleSv}`
		return (<Area header={letting.triple} loading={false}>
			<Form.Caption title='Skapa en ny fråga' description={description}/>
			<Space by='double'/>
			<Fieldset label='Vad vill du fråga?' form={this.form}>
				<TextInput formField='question'
						   value={this.state.question}
						   onChangeText={text=>this.setState({question:text})}
						   placeholder='Vad ska man tänka på när man börjar?' {...Form.Design.input} />
			</Fieldset>
			<Space by='triple'/>
			<Fieldset label='Utveckla din fråga med en kortare beskrivning...' form={this.form}>
				<Space by='quarter'/>
				<Space by='quarter'/>
				<TextInput multiline
						   value={this.state.description}
						   onChangeText={text=>this.setState({description: text})}
						   formField='description'
						   placeholder='Tänkte bara fråga om det är något speciellt att tänka på när man börjar?' {...Form.Design.input} />
			</Fieldset>
			<Space by='double'/>
			<View style={{flexDirection:align.row, alignItems: align.center, justifyContent:align.center}}>
				<Action onPress={this.onClear.bind(this)}>Avbryt</Action>
				<Space by='double' />
				<Action active disabled={this.state.disabled} onPress={this.onSave.bind(this)}>Skicka</Action>
			</View>
		</Area>)
	}
})
