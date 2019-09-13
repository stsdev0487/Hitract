import React from 'react';
import {SafeAreaView} from 'react-native';
import {Area, Card, Fieldset, Form, Rating, Space} from 'Hitract/Component';
import {Data} from 'Hitract/Api';
import {Action,Network} from 'Hitract/App';

//exports
export default class NetworkRate extends React.Component{
	onChange(){ this.setState({date:new Date()}) }
	render(){
		const model = Data.get(this, 'props.navigation.state.params.model')
		let type = model.isUniversity ? 'University':model.isCourse ? 'Course':model.isCompany ? 'Company':''
		const title =`${Network.Rate.evaluate} ${model.name}`
		const description = Network[type].rate || null
		return <Area header={30} loading={false}>
			<SafeAreaView>
				<Form.Caption description={description} title={title}/>
				<Space by='medium'/>
				<Card.Content>
					<Card.Label bold>{Network.Rate.categories}</Card.Label>
					<Space by='medium'/>
					<Rating editable list ratings={model.ratings} onChange={this.onChange.bind(this)}/>
				</Card.Content>
				<Space by='double'/>
				<Fieldset label={Network.Rate.assessment}>
					<Form.Input numberOfLines={null} placeholder={Action.writeHere}  />
				</Fieldset>
			</SafeAreaView>
		</Area>
	}
}