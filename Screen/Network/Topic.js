import React from 'react';
import {Area,Topic} from 'Hitract/Component';
import {Data} from 'Hitract/Api';


export default class NetworkTopic extends React.Component{
	onChange(){

	}
	render(){
		const topic = Data.get(this, 'props.navigation.state.params.topic')
		return <Area loading={false}>
			{topic && <Topic onChange={this.onChange.bind(this)} topic={topic}/>}
		</Area>
	}
}