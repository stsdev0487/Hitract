import React from 'react';
import Type from 'prop-types';
import {StyleSheet, View, Text} from 'react-native';
import {Valid} from 'Hitract/Api';
import {align, container, color, letting, layer} from 'Hitract/UI';
import {Graphic} from '../Content';

export const HeaderImageFrame = letting.contain.x({height: 219},{letting: {x: letting.medium * 2}})

export const HeaderImageStyle = StyleSheet.create({
	component: {
		...HeaderImageFrame,
		...layer.radius[2],
		...layer.shadow[4],
		alignSelf: align.center,
		top: letting.line * -1,
		backgroundColor: color.white
	},
	image: {
		...container.content.fill.style,
		...layer.radius[2],
	}
})

export default class CardHeaderImage extends React.Component{
	static defaultProps = {}
	static propTypes = { source:Type.any }
	state = {error:null}
	componentDidMount(){ if(getUrl(this) === null) this.setState({error:true}) }
	render(){
		const url = getUrl(this)
		const style = [HeaderImageStyle.component]
		if(this.state.error) style.push({backgroundColor:'red', alignContent: 'center', alignItems: 'center', justifyContent:'center'})
		return (<View style={style}>
			{this.state.error && <Text style={{fontSize:14, color:'white'}}>{`Unable to load image from:\n"${url}"`}</Text>}
			{url && <Graphic state={this.stateChanged.bind(this)} url={url} style={HeaderImageStyle.image}/>}
		</View>)
	}
	stateChanged(state, setState){
		if(state.error){
			setState({hide: true})
			this.setState({error: true})
		}
	}
}


//scope actions
function getUrl({props}){
	const url = Valid.data(props.source) ? props.source.uri:props.source
	return Valid.text(url) ? url:null
}