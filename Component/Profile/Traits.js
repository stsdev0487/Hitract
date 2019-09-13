import React from 'react';
import Type from 'prop-types';
import {View} from 'react-native';
import Card from '../Card';
import {Tags} from '../List';
import {Edit} from '../Action';
import {Screen} from 'Hitract/App';
import {letting} from 'Hitract/UI';


export default class Traits extends React.Component{
	static defaultProps = { characteristics: [] };
	static identifier = 'Traits';
	static propTypes = { characteristics: Type.array.isRequired };
	render(){
		const screen = Screen[this.constructor.identifier]
		const {characteristics} = this.props
		return (<Card.Frame>
			<Card.Header>
				<Card.Title>{screen.label}</Card.Title>
				<Edit component={this} tab={screen.tab} />
			</Card.Header>
			<View style={{paddingHorizontal:letting.standard}}>
				<Tags items={characteristics} item={item=>item.characteristicName}></Tags>
			</View>
		</Card.Frame>)
	}
}
