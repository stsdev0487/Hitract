import React from 'react';
import Type from 'prop-types';
import {Image} from 'react-native';
import Api, {Data, TypeMap, uri} from 'Hitract/Api';
import {viewport} from 'Hitract/UI';



const typeMap = TypeMap({
	accessible: Type.bool.isRequired, //accessible
	color: Type.string,
	defaultSource: Type.any, //defaultSource
	fade: Type.number, //fadeDuration,
	label: Type.string, //accessibilityLabel
	height: Type.number,
	indicator: Type.any,  //loadingIndicatorSource
	mode: Type.oneOf(['cover','contain','stretch','repeat','center']), //resizeMode
	scale: Type.number,
	search: Type.object,
	state: Type.func,
	style: Type.object,
	resize: Type.oneOf(['auto','resize','scale']), //resizeMethod
	url: Type.string.isRequired,
	width: Type.number,
},{
	color: viewport.select({
		ios: 'style.tintColor',
		android: 'style.overlayColor'
	}),
	fade: 'fadeDuration',
	height:'source.height',
	indicator: 'loadingIndicatorSource',
	label: 'accessibilityLabel',
	resize: 'resizeMethod',
	state: null,
	width:'source.width',
	scale:'source.scale',
	search: null,
	url: 'source.uri'
})

//exports
export default class Graphic extends React.Component{
	static propTypes = typeMap.propTypes
	static defaultProps = {
		accessible: false
	}
	state = {loading:false, loaded:false, error:null, layout:null, progress:0, total:0, hide:false, partial:null }
	notify(state){
		this.setState(state)
		if(this.props.state) this.props.state(this.state, (update)=>this.set(update))
	}
	onError({nativeEvent}){ this.notify({loading:false, error: nativeEvent.error}) } //	{nativeEvent: {error}}
	onLayout({nativeEvent}){ this.notify(nativeEvent) } //{nativeEvent: {layout: {x, y, width, height}}} }
	onLoad(){ this.notify({loading: false, loaded:true}) }
	onLoadEnd(){ this.notify({loading: false}) }
	onLoadStart(){ this.notify({loading: true}) }
	onPartialLoad(partial){ this.notify({partial})}
	onProgress({nativeEvent}){ this.notify({progress: nativeEvent.loaded, total:nativeEvent.total}) } //{nativeEvent: {loaded, total}}
	set(state){ return (this.setState({...this.state, ...state}),  this) }
	render(){
		const url = uri(this.props.url)
		const attributes = typeMap(this.props,{url})
		const style = this.state.hide ? {display:'none'}:[attributes.style]
		return (<Image {...attributes}
					   style={style}
					   onError={error=>this.onError(error)}
					   onLayout={layout=>this.onLayout(layout)}
					   onLoad={load=>this.onLoad(load)}
					   onLoadEnd={end=>this.onLoadEnd(end)}
					   onLoadStart={start=>this.onLoadEnd(start)}
					   onProgress={progress=>this.onProgress(progress)}

		/>)
	}
}


/*
onLayout
onLoad
onLoadEnd
onLoadStart
onError
onPartialLoad
onProgress
*/

/*
resizeMode
resizeMethod
style
*/

/*
blurRadius
loadingIndicatorSource
testID
capInsets
defaultSource
progressiveRenderingEnabled
*/
