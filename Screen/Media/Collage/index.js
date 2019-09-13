import React from 'react';
import {TextInput} from 'react-native';
import {Data} from 'Hitract/Api';
import {Area, Card, Inspiration, MetadataSelect, Space, Form} from 'Hitract/Component';
import {letting} from 'Hitract/UI';

export default class CollageEditor extends React.Component{
	state = {loading:false}
	componentDidMount(){
		if(this.params.item){
			this.navigation.navigate('Inspiration',this.params)
		}
		else this.setState({ loading:false, slide:this.params.slide || new Inspiration.Model({}) })
	}
	get navigation(){ return this.props.navigation }
	get params(){ return Data.get(this, 'navigation.state.params') || {} }
	render(){
		const slide = this.state.slide


		return (<Area loading={this.state.loading}>
			<Inspiration editing slide={slide} />
			<Card.Content>
				<TextInput placeholder='Beskrivning (max 150 tecken)' max={150} {...Form.Design.input} />
				<Space size={letting.triple}/>
				<MetadataSelect onSelect={(selection)=>console.log(selection)}></MetadataSelect>
			</Card.Content>
		</Area>)
	}

}





