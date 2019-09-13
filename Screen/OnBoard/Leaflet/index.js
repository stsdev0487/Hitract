import React from 'react';
import Type from 'prop-types';
import {ScrollView} from 'react-native';
import {Data,not} from 'Hitract/Api';
import {ScrollViewInterface} from 'Hitract/Component/Interface/index.js';
import {align, viewport} from 'Hitract/UI';
import Item,{ItemFrame,ItemLetting} from './Item';
import Indicator from './Indicator';


export const LeafletScrollViewProperties = {
	decelerationRate: 'fast',
	directionalLockEnabled: true,
	horizontal: true,
	key: 'scroll-view',
	showsHorizontalScrollIndicator: false,
	showsVerticalScrollIndicator: false,
	snapToAlignment: align.center
}


export default class Leaflet extends ScrollViewInterface(React.Component){
	static Item = Item
	static defaultProps = { item:ItemFrame, letting:ItemLetting }
	static propTypes = {
		onChange:Type.func.isRequired,
		item: Type.object.isRequired,
		letting: Type.object.isRequired
	}
	state = {active:0}
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
	get item(){
		return {
			width: point.call(this, 'props.item.width',ItemFrame.width),
			height: point.call(this, 'props.item.height', ItemFrame.height),
			get center(){ return { x: this.width / 2, y: this.height / 2 } }
		}
	}
	get inset(){ return {bottom: 0, left: this.offset.x, right: this.offset.x, top: 0} }
	get letting(){
		return {
			x: point.call(this,'props.letting.x', ItemLetting.x),
			y: point.call(this,'props.letting.y', ItemLetting.y)
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
				console.log(message, this.width,this.height)
				break
			case 'mount':
				this.to({ x: -this.offset.x })
				break
			case 'scrolling':
			case 'idle':
				if(state === 'scrolling') this.props.onChange({scrolling: true})
				else if(state === 'idle') this.props.onChange({scrolling: false})
				break
			case 'stop':
				const {contentOffset} = message


				if('x' in this.container === false) {
					for(const field in contentOffset) {
						const measurement = contentOffset[field]
						this.container[field] = measurement < 0 ? -1 * measurement:measurement
					}
				}
				this.container.left = this.container.x + contentOffset.x
				this.setState({
					active: this.container.index = this.container.left / this.container.unit.x
				})
				break
		}
	}
	render(){
		const total = this.total = React.Children.count(this.props.children);
		const scrollView = { contentInset: this.inset, snapToInterval: this.content.width }
		if('container' in this === false) this.container = {

			total:{
				x: this.item.width * total
			},
			unit:{
				x: this.content.width
			}

		}
		return ([
			<ScrollView {...this.attributes(LeafletScrollViewProperties, scrollView)}>{this.props.children}</ScrollView>,
			<Indicator key='indicator' active={this.state.active} total={total}></Indicator>
		])
	}
	get width(){ return viewport.width }
}

//scope actions
function point(notation, default_value=0){
	const value = Data.get(this, notation)
	return not.number(value) ? default_value:value
}
