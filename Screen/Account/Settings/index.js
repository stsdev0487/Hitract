import React from 'react';
import Type from 'prop-types';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Grid, Row, Col} from 'react-native-easy-grid';
import Api, {Data,Valid, FormProtocol} from 'Hitract/Api';
import {align, color, container, font, Icon, letting, viewport} from 'Hitract/UI';
import {Area, Fieldset, Form, Space} from 'Hitract/Component';
import App, {Account} from 'Hitract/App';


const ui = StyleSheet.create({
	buttonContainer: {
		...container.button.standard,
		backgroundColor: color.azureBlue,
		marginTop: letting.triple,
		marginHorizontal: letting.single,
		alignContent: align.center,
		alignItems: align.center,
		get borderRadius(){ return container.button.standard.height / 2 }
	},
	buttonContainerDisabled: {
		...container.button.standard,
		backgroundColor: color.grayLight,
		marginTop: letting.triple,
		marginHorizontal: letting.single,
		alignContent: align.center,
		alignItems: align.center,
		get borderRadius(){ return container.button.standard.height / 2 },
		opacity: 0.5
	},
	buttonIcon:{
		color: color.white,
		fontSize: font.standard
	},
	buttonText:{
		color: color.white,
		fontSize: font.icon.standard
	},

	headerView:{
		width: Form.Design.frame.width,
		alignItems:align.center

	},
	headerDescriptionText: {
		...font.variant.regular,
		fontSize: font.standard,
		color: color.gray,
		marginTop: letting.half
	},
	headerTitleText: {
		...font.variant.bold,
		fontSize: font.medium,

	},
})




export default FormProtocol(class AccountSetting extends React.Component{
	static defaultProps = {
		title: Account.personal.information,
		description: Account.personal.informationAboutYou
	}
	state = {loading:false, disabled: true}
	componentDidMount(){
		console.log({Form})
		this.on(this.event.change, ()=>{
			this.setState({ disabled: this.form.valueCount === 0 })
		})

		this.on(this.event.submit, ()=>{

			App.send(Symbol.for(`${Form.Header.name}.setState`), {enabled: this.form.valueCount > 0})
			this.setState({ disabled: this.form.valueCount === 0 })
		})


		App.on(Symbol.for(`${Form.Header.name}.onSave`), this.onSaveAction.bind(this))
		App.on(Symbol.for(`${Form.Header.name}.onCancel`), this.onCancelAction.bind(this))
		App.mount(this)
		App.send(Symbol.for(`${Form.Header.name}.setState`), {enabled: this.form.valueCount > 0})
	}
	componentWillUnmount(){
		App.off(Symbol.for(`${Form.Header.name}.onSave`), this.onSaveAction.bind(this))
		App.off(Symbol.for(`${Form.Header.name}.onCancel`), this.onCancelAction.bind(this))
		App.unmount(this)
	}
	onCancelAction(){
		if(App.mounted(this)){
			console.log(this.form.data);

		}
		else{

		}
	}
	onSaveAction(){

		if(App.mounted(this)){
			console.log(this.form.data);
		}
		else{

		}
	}



	render(){
		const {user} = Api.account
		return (<Area loading={this.state.loading}>
			<Space/>
			<Space/>
			<Form.Caption title={this.props.title} description={this.props.description} />
			<Space />
			<Fieldset label={Account.contact.name} form={this.form}>
				<TextInput formField='user.firstName'
						   placeholder={Account.contact.firstName}
						   value={user.firstName}
						   {...Form.Design.input} />
				<Space/>
				<TextInput {...Form.Design.input}
						   formField='user.lastName'
						   placeholder={Account.contact.lastName}
						   value={user.lastName} />
				<Space/>
			</Fieldset>
			<Space/>
			<Fieldset label={Account.contact.details} form={this.form}>
				<TextInput placeholder={Account.contact.email} value={user.email}  formType='email' formField='email' {...Form.Design.input} />
				<Space/>
			</Fieldset>
		</Area>)
	}
	validate(){
		const invalid = this.form.invalid
		if(invalid.length){
			const feedback = []
			for(const input of invalid){
				const message = input.feedback || `Please enter a valid value for "${input.label}" to submit`
				feedback.push(message)
			}
			this.setState({
				invalidFeedback: feedback.join('\n')
			})
		}
	}
})