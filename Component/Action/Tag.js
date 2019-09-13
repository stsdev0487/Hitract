import React from 'react';
import Action from './Component';
import {color, font, layer, letting} from 'Hitract/UI';


//exports
export default class TagAction extends Action{
	static defaultProps = Action.properties({
		color: color.white,
		background: color.azureBlue,
		actionStyle:{
			...layer.shadow[2],
			height: 20,
			marginRight: letting.half
		},
		textStyle:{
			...font.serif,
			paddingHorizontal:letting.medium
		}
	})
	componentDidMount(){
		this.setState({ text:this.props.target })
	}
	press(){ this.open() }
}