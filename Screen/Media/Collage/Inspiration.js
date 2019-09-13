import React from 'react';
import {StyleSheet, Image, View, TextInput} from 'react-native';

import {Data,Type} from 'Hitract/Api';
import {Area, Card, Inspiration, MetadataSelect, Space, Form} from 'Hitract/Component';
import {align, color, layer, letting} from 'Hitract/UI';


export default class CollageInspiration extends React.Component{

	state = {loading: false}

	componentDidMount(){

	}
	get navigation(){ return this.props.navigation }
	get params(){ return Data.get(this, 'navigation.state.params') || {} }
	render(){

		const {slide, item, component} = this.params

		return (<Area loading={this.state.loading}>
			<Inspiration editing single={item.index} slide={slide}/>
			<Card.Content>
				<TextInput placeholder='Beskrivning (max 150 tecken)' max={150} {...Form.Design.input} />
				<Space size={letting.triple}/>

				<MetadataSelect onSelect={(selection)=>console.log(selection)}></MetadataSelect>
			</Card.Content>
		</Area>)
	}

}





