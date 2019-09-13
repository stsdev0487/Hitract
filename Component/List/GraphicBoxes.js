import React from 'react';
import {StyleSheet, View} from 'react-native';
import {align, letting} from 'Hitract/UI';
import {Type} from 'Hitract/Api';
import {CardVariant} from '../Card/Frame';

export const GraphicBoxesFrameLetting = letting.median
export const GraphicBoxesSeparatorSize = letting.standard

export const GraphicBoxesFrame = letting.contain.x({marginHorizontal: GraphicBoxesFrameLetting}, {...CardVariant.standard.frame})
export const GraphicBoxFrameRatio = 0.68711656
export const GraphicBoxFrame = {width: (GraphicBoxesFrame.width / 2) - (GraphicBoxesSeparatorSize / 2)}
GraphicBoxFrame.height = GraphicBoxFrame.width * GraphicBoxFrameRatio


const ui = StyleSheet.create({
	component:{
		justifyContent: align.center,
		alignItems: align.center
	},
	grid:{
		...GraphicBoxesFrame,
		flexWrap: align.wrap,
		flexDirection: align.row
	},
	horizontal:{
		height: GraphicBoxesSeparatorSize,
		width: GraphicBoxesFrame.width,
		flexShrink:0
	},
	list: {
		flex:1,
		flexDirection: align.column
	},
	vertical: {
		width: GraphicBoxesSeparatorSize,
		height: GraphicBoxFrame.height,
		flexShrink: 0
	}
})


//exports
export default class GraphicBoxes extends React.Component{
	static defaultProps = { list: false }
	static propTypes = { list: Type.bool.isRequired }
	render(){
		const items = React.Children.toArray(this.props.children)
		return (<View style={style.call(this)}>
			{this.props.list ? items:gridContent(items)}
		</View>)
	}
}

//scope actions
function gridContent(items){
	const children = []
	const last = items.length - 2
	for(let index = 0; index < items.length; index++){
		children.push(items[index])
		if(isHorizontalBreak(index) && index <= last){
			children.push(<View key={`${index}-separator`} style={ui.horizontal}/>)
		}
		else if(isVerticalBreak(index)){
			children.push(<View key={`${index}-separator`} style={ui.vertical}/>)
		}
	}
	return children.length ? children:null
}


function isHorizontalBreak(index){ return index % 2 !== 0 }
function isVerticalBreak(index){ return index % 2 === 0 }


function style(){
	const style = [ui.component]
	if(this.props.list) style.push(ui.list)
	else style.push(ui.grid)
	if(this.props.style) style.push(this.props.style)
	return style
}