import React from 'react';
import {StyleSheet, Text, TextInput, Switch, View} from 'react-native';
import {align, color, layer, letting, viewport} from 'Hitract/UI';
import {Area, Box, Card, Fieldset, Form, Space} from 'Hitract/Component';
import Api, {Data, Type, Valid} from 'Hitract/Api';
import {Account} from 'Hitract/App';

//exports
export default class PortfolioTab extends React.Component{

	static propTypes = {
		data: Type.object,
		description: Type.string,
		form: Type.object.isRequired,
		title: Type.string
	}
	static defaultProps = {
		title:'Erfarenheter',
		description:'Hantera dina erfarenheter'

	};
	static title = 'HitPortfolio';
	state = {loading: false}
	get form(){ return Data.get(this, 'props.form') }
	render(){
		return (<Area loading={this.state.loading}>
			<Space/>
			<Space/>
			<Form.Caption title={this.props.title} description={this.props.description}/>
			<Space/>

			<Card.Frame topic>
				<Card.Content>
					<Fieldset form={this.form}>
						<TextInput formField='portfolio.newExperience.role'
								   placeholder='Management Consultant'
								   {...Form.Design.input} />
						<Space/>
						<TextInput formField='portfolio.newExperience.companyName'
								   placeholder='EY (tidigare Ernst & Young)'
								   {...Form.Design.input} />
						<Space/>
					</Fieldset>
					<Space/>
					<Box x center>
						<TextInput formField='portfolio.newExperience.companyName'
								   placeholder='Från'
								   style={{flex: 1}}/>
						<Space/>
						<TextInput formField='portfolio.newExperience.startDate'
								   placeholder='Till'
								   style={{flex: 1}}/>
					</Box>
					<Space/>
					<Box x center>
						<Card.Label color='slate' size='median' align='center'>Pågående</Card.Label>
						<Space/>
						<Switch onChange={()=>{}} ios_backgroundColor={color.slate}/>
					</Box>
				</Card.Content>
			</Card.Frame>
		</Area>)
	}
}

//scope actions
async function onSave(){

}