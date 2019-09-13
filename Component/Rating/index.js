import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Type,Valid} from 'Hitract/Api'
import {GraphicBox, OverlayDetail} from '../Content'
import {GraphicBoxes} from '../List'
import {Space} from '../Design'
import {Ratings} from 'Hitract/Bookmark'
import {align, letting} from 'Hitract/UI'
import Stars from './Stars'

const ui = StyleSheet.create({
	item: {
		width: '100%',
		flexDirection: align.row,
		justifyContent: align.between,
		marginBottom: letting.standard,
		alignContent: align.between
	}
})

//exports
export default class RatingComponent extends React.Component{
	static Stars = Stars
	static defaultProps = {editable: false, list: false}
	static propTypes = {
		editable: Type.bool.isRequired,
		list: Type.bool.isRequired,
		onChange: Type.func,
		ratings: Type.array.isRequired
	}
	onChange({rating, value}){
		rating.set('data.averageScore', value)
		this.setState({date: new Date()})
		if(this.props.onChange) this.props.onChange({rating, value})
	}
	onPress(){ if(this.props.onPress) this.props.onPress(...arguments) }
	render(){
		const ratings = Valid.array(this.props.ratings) ? this.props.ratings:[]
		return (<GraphicBoxes list={this.props.list}>{ratings.map(onRating, this)}</GraphicBoxes>)
	}
}

//scope actions
function onRating(rating, index){
	const attribute = this.props.list ? {large: true}:{right: true, large: true, description: Ratings.title(rating.ratingType)}
	if(this.props.list){
		return (<View key={index} style={ui.item}>
			<GraphicBox onPress={()=>this.onPress(rating)} image={Ratings.graphic(rating.ratingType)}>
				<OverlayDetail {...attribute} title={rating.averageScore.toFixed(1)}></OverlayDetail>
			</GraphicBox>
			<Space flex={1}/>
			<Stars stack
				   value={rating.averageScore}
				   disabled={this.props.editable === false}
				   onChange={value=>this.onChange({rating, ...value})}>
			</Stars>
		</View>)
	}
	return (<GraphicBox onPress={()=>this.onPress(rating)} key={index} image={Ratings.graphic(rating.ratingType)}>
		<OverlayDetail {...attribute} title={rating.averageScore.toFixed(1)}></OverlayDetail>
	</GraphicBox>)
}
