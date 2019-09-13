import React from 'react';
import Type from 'prop-types';
import ActionComponent from './Component';
import {Action} from 'Hitract/App';
import {align, font} from 'Hitract/UI';

//exports
export default class Edit extends ActionComponent{
	static propTypes = ActionComponent.types({
		tab: Type.string.isRequired
	})
	static defaultProps = ActionComponent.properties({
		actionStyle:{
			width: 85,
			alignSelf: align.end
		},
		iconStyle: {
			fontSize: font.icon.single
		},
		target: 'Editor'
	})
	state = {icon: 'edit', text: Action.edit}
	press(){
		this.open({tab:this.props.tab})
	}
}
