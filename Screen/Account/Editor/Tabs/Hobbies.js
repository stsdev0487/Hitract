import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {align, color, layer, letting, viewport} from 'Hitract/UI';
import {Area, Fieldset, Form, Space} from 'Hitract/Component';
import Api, {Data, Type, Valid} from 'Hitract/Api';
import {Account} from 'Hitract/App';

//exports
export default class HobbiesTab extends React.Component{
	static propTypes = {
		data: Type.object,
		description: Type.string,
		form: Type.object.isRequired,
		title: Type.string
	}
	static defaultProps = {
		description:'Hantera dina hobbys',
		title:'Hobbys'
	};
	static title = 'HitHobbys';
	state = {loading: false}
	get form(){ return Data.get(this, 'props.form') }
	render(){
		return (<Area loading={this.state.loading}>
			<Space/><Space/>
			<Form.Caption title={this.props.title} description={this.props.description}/>
			<Space/>

		</Area>)
	}
}

//scope actions
async function onSave(){

}