import React from 'react';
import Type from 'prop-types';
import {View, Text, Image, TouchableOpacity as Touch} from 'react-native';
import ui from './ui';
import Api, {Data, Valid} from 'Hitract/Api';
import {color, layer, letting, icon} from 'Hitract/UI';


export default class CardElement extends React.Component{
	static propTypes={}
	static defaultProps={}
	render(){ return (<View style={this.props.style}></View>) }
}