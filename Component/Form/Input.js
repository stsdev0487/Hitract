import React from 'react';
import Type from 'prop-types';
import {TextInput} from 'react-native';
import {FieldProtocol, Id} from 'Hitract/Api';
import * as Design from './Design';

export default FieldProtocol(class Input extends React.Component{
	static propTypes = {
		onChange: Type.func.isRequired
	}
	accessoryId = Id('accessory-view')
	state = {}
	onChangeText(value){
		this.setState({value})
		if(this.props.onChange) this.props.onChange(value)
	}
	render(){
		const style = [Design.input.style, this.props.style]
		const attribute = {...Design.input, ...this.props}
		return (<TextInput {...attribute}  onChangeText={this.onChangeText.bind(this)} style={style} />)
	}
})