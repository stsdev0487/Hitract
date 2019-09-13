import React from 'react';
import Type from 'prop-types';
import {Text, View} from 'react-native';
import {FieldsetProtocol} from 'Hitract/Api';
import * as Design from './Design';


export default FieldsetProtocol(class Fieldset extends React.Component{
	static propTypes = { label: Type.string }
	render(){
		return (<View style={Design.style.fieldset}>
			{this.props.label && <Text {...Design.label}>{this.props.label}</Text>}
			{this.formInputs(this)}
		</View>)
	}
})