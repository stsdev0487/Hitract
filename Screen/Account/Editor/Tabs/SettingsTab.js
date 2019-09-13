import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {align, color, layer, letting, viewport} from 'Hitract/UI';
import {Area, Fieldset, Form, Space} from 'Hitract/Component';
import Api, {Data,Type,Valid} from 'Hitract/Api';
import {Account} from 'Hitract/App';

//exports
export default class SettingsTab extends React.Component{
	static propTypes = {
		data: Type.object,
		description: Type.string,
		form: Type.object.isRequired,
		title: Type.string
	}
	static defaultProps = {}
	static title = 'HitSetting';
	state = {loading:false}
	render(){
		return (<Area loading={this.state.loading}>
			<Space/><Space/>
			<Form.Caption title={this.props.title} description={this.props.description}/>
			<Space/>
			<Fieldset label={Account.contact.name} form={this.form}>
				<TextInput formField='user.firstName' placeholder={Account.contact.firstName} {...Form.Design.input} />
				<Space/>
				<TextInput {...Form.Design.input} formField='user.lastName' placeholder={Account.contact.lastName}/>
				<Space/>
			</Fieldset>
			<Space/>
			<Fieldset label={Account.contact.details} form={this.form}>
				<TextInput placeholder={Account.contact.email} formType='email' formField='email' {...Form.Design.input} />
				<Space/>
			</Fieldset>
		</Area>)
	}
}

//scope actions
async function onSave(){

}