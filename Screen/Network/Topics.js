import React from 'react';
import {Area,Items,Form, Space} from 'Hitract/Component';
import {Data} from 'Hitract/Api';
import {letting} from 'Hitract/UI';

export default class NetworkTopics extends React.Component{
	onChange(){

	}
	onItem(){}
	render(){
		const topics = Data.get(this, 'props.navigation.state.params.topics')
		const title = Data.get(this, 'props.navigation.state.params.title')
		const description = Data.get(this, 'props.navigation.state.params.description')
		return <Area header={letting.double} loading={false}>
			<Form.Caption title={title}  description={description} />
			<Space by='double'/>
			<Items onItem={this.onItem.bind(this)}
				   items={topics}
				   renderItem={renderItem}/>
		</Area>
	}
}


//scope actions
function renderItem({heading}){
	return heading || null
}