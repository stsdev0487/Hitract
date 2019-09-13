import React from 'react';
import Type from 'prop-types';
import {ScrollView, View} from 'react-native';
import {Data,not} from 'Hitract/Api';
import {ScrollViewInterface} from '../Interface/index.js';
import {align, viewport} from 'Hitract/UI';
import Indicator from './Indicator';
import Item from './Item';
import Model from './Model';

export const ScrollViewProperties = {
	decelerationRate: 'fast',
	directionalLockEnabled: true,
	horizontal: true,
	key: 'scroll-view',
	showsHorizontalScrollIndicator: false,
	showsVerticalScrollIndicator: false,
	snapToAlignment: align.center
}

//exports
export default class Slider extends ScrollViewInterface(React.Component){
	static Model = Model
	static Item = Item
	static defaultProps = { }
	static propTypes = {
		Item: Type.object.isRequired,
		onChange: Type.func.isRequired,
	}
	state = {active:0}
	container = {}
	get center(){ return { x: this.width / 2, y: this.height / 2 } }
	get content(){
		return {
			get center(){ return { x: this.width / 2, y: this.height / 2 } },
			height: this.item.height + (this.letting.y * 2),
			frame: this.center,
			get inset(){ return { x: this.frame.x - this.center.x, y: this.frame.y - this.center.y } },
			width: this.item.width + (this.letting.x * 2)
		}
	}
	get height(){ return viewport.height }
	get Item(){ return Data.get(this, 'props.Item') }
	get item(){
		return {
			width: point.call(this, 'Item.Frame.width', this.width),
			height: point.call(this, 'Item.Frame.height', this.width),
			get center(){ return { x: this.width / 2, y: this.height / 2 } }
		}
	}
	get inset(){ return {bottom: 0, left: this.offset.x, right: this.offset.x, top: 0} }
	get letting(){
		return {
			x: point.call(this,'Item.Letting.x', 0),
			y: point.call(this,'Item.Letting.y', 0)
		}
	}
	get offset(){
		return {
			x: this.width - (this.width-this.content.inset.x),
			y: this.height - (this.height-this.content.inset.y)
		}
	}
	on(state, message){
		switch(state){
			case 'size':
				if(this.container.view){
					if(this.container.initialX !== true){
						this.to({x: -this.offset.x})
						this.container.initialX = true
					}
				}
				break
			case 'mount':
				if(this.container.view){
					this.to({x: -this.offset.x})
					this.container.initialX = true
				}

				break
			case 'scrolling':
			case 'idle':
				if(state === 'scrolling') this.props.onChange({scrolling: true})
				else if(state === 'idle') this.props.onChange({scrolling: false})
				break
			case 'stop':
				if(this.container.view){
					this.container.left = this.container.x + message.contentOffset.x
					this.setState({
						active: this.container.index = Math.round(this.container.left / this.container.unit.x)
					})
				}

				break
		}
	}
	onIndicatorPress(state){
		this.setState(state)
		this.to({x: (state.active * this.container.unit.x) + this.container.x})
	}
	render(){
		const total = this.total = React.Children.count(this.props.children);
		if(this.props.Item && total > 0) {
			this.container.view = {contentInset: this.inset, snapToInterval: this.content.width}
			this.container.total = {x: this.item.width * total}
			this.container.unit = {x: this.content.width}
			for(const field in this.offset){
				const measurement = this.offset[field]
				this.container[field] = measurement < 0 ? -1 * measurement:measurement
			}
		}
		return <View style={this.props.style}>
			{this.container.view && <ScrollView {...this.attributes(ScrollViewProperties, this.container.view)}>{this.props.children}</ScrollView>}
			<Indicator onPress={this.onIndicatorPress.bind(this)} active={this.state.active} total={total} />
		</View>
	}
	get width(){ return viewport.width }
}

//scope actions
function point(notation, default_value=0){
	const value = Data.get(this, notation)
	return not.number(value) ? default_value:value
}

