import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {align, color, layer, letting, viewport} from 'Hitract/UI';
import {Area, Fieldset, Form, Space} from 'Hitract/Component';
import Api, {Data, Type, Valid} from 'Hitract/Api';
import {Account} from 'Hitract/App';

//exports
export default class ProfileTab extends React.Component{
	static propTypes = {
		data: Type.object,
		description: Type.string,
		form: Type.object.isRequired,
		title: Type.string
	}
	static defaultProps = {
		description:'Uppgifter om dig',
		title:'Personliga uppgifter'
	};
	static title = Account.profile;
	state = {loading: false}
	get form(){ return Data.get(this,'props.form') }
	render(){
		return (<Area loading={this.state.loading}>
			<Space/>
			<Space/>
			<Form.Caption title={this.props.title} description={this.props.description}/>
			<Space/>
			<Fieldset label='Primärt universitet' form={this.form}>
				<Space by='triple'/>
				<Space/>
			</Fieldset>

			<Form.Caption title='Söker mig till' description='Ange vad du söker dig till'/>
			<Space/>
			<Fieldset label='Branschintresse' form={this.form}>
				<Space by='triple'/>
				<Space/>
			</Fieldset>
			<Space/>
			<Fieldset label='Företagsstorlek' form={this.form}>
				<Space by='triple'/>
				<Space/>
			</Fieldset>
			<Space/>
			<Fieldset label='Anställningsform' form={this.form}>
				<Space by='triple'/>
				<Space/>
			</Fieldset>
			<Space/>
			<Fieldset label='Regioner (län)' form={this.form}>
				<Space by='triple'/>
				<Space/>
			</Fieldset>
		</Area>)
	}
}

//scope actions
async function onSave(){

}