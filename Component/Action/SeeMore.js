import React from 'react';
import Action from './Component';
import {align, color, font, layer, letting} from 'Hitract/UI';


const target = 'seeMore'
const State = {
	text: [
		'See Mere',
		'See Midre'

	],
	icon: [
		'expand-more',
		'expand-less'
	]
}

//exports
export default class SeeMore extends Action{

	static defaultProps = Action.properties({
		actionStyle: {
			width: 100,
			alignSelf: align.center
		},
		target
	})
	state = {
		text: State.text[0],
		icon: State.icon[0],
		[target]: false
	}
	componentDidMount(){
		const index = this.stateIndex()
		this.setState({
			text: State.text[index],
			icon: State.icon[index]
		})
	}
	press(){ this.toggle() }
	toggle(){
		const state = this.toggleState()
		this.pushState(state)
		const index = this.stateIndex(state)
		this.setState({
			...state,
			text: State.text[index],
			icon: State.icon[index]
		})
	}
}