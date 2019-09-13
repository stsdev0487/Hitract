import React from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity as Touch, View} from 'react-native';
import {align, color, font,layer, letting, viewport} from 'Hitract/UI';
import {Area, Box, Fieldset, Form, Space, Card} from 'Hitract/Component';
import Api, {Data,Type,Valid} from 'Hitract/Api';
import {Account} from 'Hitract/App';

//exports
export default class CoursesTab extends React.Component{
	static propTypes = {
		data: Type.object,
		description: Type.string,
		form: Type.object.isRequired,
		title: Type.string
	}
	static defaultProps = {
		description:'Hämta hem nya kurser från antagning.se',
		title:'Hämta kurser'
	}
	static title = 'HitCourses';
	state = {loading:false}
	get form(){ return Data.get(this, 'props.form') }
	render(){
		return (<Area loading={this.state.loading}>
			<Space/>
			<Space/>
			<Form.Caption title={this.props.title} description={this.props.description}/>
			<Space/>
			<Fieldset form={this.form}>
				<TextInput formField='user.firstName' placeholder='Användarnamn' {...Form.Design.input} />
				<Space/>
				<TextInput formField='user.lastName' placeholder='Lösenord' {...Form.Design.input} />
				<Space/>
			</Fieldset>
			<Space/>
			<Form.Caption title='Kurser' description='Hantera dina kurser'/>
			<Card.Frame topic header={letting.single} footer={0}>
				<Card.Content>
					<Card.Label size='median' color='black'>Course Title</Card.Label>
					<Card.Label color='monochrome'>CODE</Card.Label>
					<Card.Label color='tint'>TYPE</Card.Label>
				</Card.Content>
				<Card.Content>
					<CardSwitch values={['SYNLIG', 'EXTRA INTRESSANT']}
								selected={this.state.selected}
								onChange={(selected)=>this.setState({selected})} />
				</Card.Content>
			</Card.Frame>

		</Area>)
	}
}

//scope actions
async function onSave(){

}

function CardSwitch(props){
	const style = StyleSheet.create({
		value: {
			backgroundColor: color.whiteShade,
			borderRadius: letting.minor,
			...layer.shadow[6],
			paddingVertical: letting.single,
			paddingHorizontal: letting.median,
			flex: 1
		},
		text:{
			fontSize: font.standard
		},
		selected:{
			backgroundColor: color.tint,

		},
		selectedText:{
			color: color.white
		}
	})

	return (<Box x between>
		{props.values.map(createValue,props).map(SwitchValue,props)}
	</Box>)
	//scope actions
	function createValue(value, index){
		return {
			index,
			selected: props.selected === index,
			value
		}
	}
	function SwitchValue(valueProps, index){
		const valueStyle = [style.value]
		if(valueProps.selected) valueStyle.push(style.selected)
		const textStyle = [style.text]
		if(valueProps.selected) textStyle.push(style.selectedText)
		return (<Touch key={index} style={valueStyle} onPress={()=>onValueSelected.call(this,valueProps)}>
			<Text style={textStyle}>{valueProps.value}</Text>
		</Touch>)
	}

	function onValueSelected(valueProps){
		this.onChange(valueProps.index)
	}
}

CardSwitch.propTypes = {
	onChange: Type.func.isRequired,
	selected: Type.number,
	values:Type.array.isRequired
}
CardSwitch.defaultProps = {
	values: []
}