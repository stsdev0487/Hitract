import React from 'react';
import {View} from 'react-native';
import {Area} from 'Hitract/Component';
import {align,color,font,layer,letting} from 'Hitract/UI';
import {Data,Valid} from 'Hitract/Api';

//exports
export default class HitMail extends React.Component{
	state = {loading:false}
	render(){
		return (<Area loading={this.state.loading}>

		</Area>)
	}
}