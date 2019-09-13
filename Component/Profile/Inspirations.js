import React from 'react';
import {StyleSheet,Text,View} from 'react-native';
import Api, {Data, Type, Valid} from 'Hitract/Api';
import {align,color,font,layer,letting} from 'Hitract/UI';

import Inspiration from '../Inspiration';
import Slider from '../Slider';


const ui = StyleSheet.create({
	component:{
		flex:1,
		marginBottom: letting.line
	}
})


//exports
export default class Inspirations extends  React.Component{
	static defaultProps = {inspirationCollections: []};
	static identifier = 'Inspirations';
	static propTypes = { inspirationCollections: Type.array.isRequired };
	state = {date:new Date() }
	componentDidMount(){
		this.setState({
			slides:this.props.inspirationCollections.map(createSlide,this)
		})
		this.didFocus = this.props.navigation.addListener('didFocus', ()=>{
			if(Api.mounted(this)){
				this.setState({date:new Date()})
			}
		})
		Api.mount(this)
	}
	componentWillUnmount(){
		if(this.didFocus) this.didFocus.remove()
		delete this.didFocus
		Api.unmount(this)
	}
	onChange(change){
		console.log({onChange: change})
	}
	render(){
		return (<Slider style={ui.component} Item={Inspiration.Item} onChange={this.onChange.bind(this)}>
			{this.state.slides ? this.state.slides.map(cardItem, this):null}
		</Slider>)

	}
}

//scope actions
function createSlide(data, index){ return new Inspiration.Model(data, index) }

function cardItem(slide, index){
	return (<Slider.Item key={index} Item={Inspiration.Item}><Inspiration slide={slide}></Inspiration></Slider.Item>)
}

