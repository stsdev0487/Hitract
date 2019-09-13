import React from 'react'
import {StyleSheet, Text, View, TouchableOpacity as Touch} from 'react-native'
import {align, color, font, letting, Icon} from 'Hitract/UI'
import Api, {Type} from 'Hitract/Api'
import {Icons} from 'Hitract/Bookmark'
import {PanGestureHandler} from 'react-native-gesture-handler'

const Maximum = 5
const Minimum = 0
const Sizing = {
	Stack: font.icon.double + letting.standard,
	Default: font.icon.line + letting.standard
}

const ui = StyleSheet.create({
	component: {
		flexDirection: align.row,
		alignSelf: align.center,
		alignItems: align.center
	},
	componentStack:{flexDirection: align.column},
	star: {
		fontSize: font.icon.line,
		color: color.tint
	},
	starStack:{
		fontSize: font.icon.double
	},
	starView: {
		flexDirection: align.row,
		alignItems: align.center,
		marginRight: letting.standard
	},
	stars: {
		flexDirection: align.row,
		justifyContent: align.between,
		alignItems: align.center,
		minWidth: (Sizing.Default * Maximum),
		alignContent: align.between
	},
	starsStack:{
		minWidth: (Sizing.Stack * Maximum),
	},
	text: {
		color: color.gray,
		width: 80
	},
	textStack: {
		textAlign: align.right,
		alignSelf: align.end,
		marginRight: letting.standard
	}
})

export default class RatingStars extends React.Component{
	static defaultProps = {
		disabled: false,
		value: 0,
		stack: false
	}
	static propTypes = {
		onChange: Type.func,
		disabled: Type.bool.isRequired,
		value: Type.number.isRequired,
		stack: Type.bool.isRequired
	}
	state = {value: 0}
	componentDidMount(){
		Api.mount(this)
		const state = {value: this.props.value }
		if(this.props.value < Minimum) state.value = Minimum
		else if(this.props.value > Maximum) state.value = Maximum
		this.setState(state)
	}

	componentWillReceiveProps(next){
		if(Api.mounted(this)){
			const state = {value: next.value}
			if(state.value < Minimum) state.value = Minimum
			else if(state.value > Maximum) state.value = Maximum
			this.setState(state)
		}
	}
	componentWillUnmount(){ Api.unmount(this) }
	onPanGestureEvent({nativeEvent}){
		const {x} = nativeEvent
		const Size = this.props.stack ? Sizing.Stack:Sizing.Default
		const maximum = Size * Maximum
		let value = ((x + (Size / 1.7)) / maximum) * Maximum
		if(x < 0) value = 0
		else if(x > maximum) value = 5
		this.setState({value: value = round(value, 0.5)})
		if(this.props.onChange) this.props.onChange({value, total: Maximum})
	}
	onPress(value){
		if(this.state.value === value) value = value-1
		this.setState({value})
		if(this.props.onChange) this.props.onChange({value, total: Maximum})
	}
	render(){
		const style = this.props.stack ? [ui.component, ui.componentStack]:[ui.component]
		const starsStyle = this.props.stack ? [ui.stars,ui.starsStack]:[ui.stars]
		const textStyle = this.props.stack ? [ui.text, ui.textStack]:[ui.text]

		return (<PanGestureHandler enabled={this.props.disabled===false} onGestureEvent={this.onPanGestureEvent.bind(this)}>
			<View style={style}>
				<View style={starsStyle}>{getStars.call(this)}</View>
				<Text style={textStyle}>({this.state.value.toFixed(1)}/{Maximum.toFixed(1)})</Text>
			</View>
		</PanGestureHandler>)
	}
}

//scope actions
function getStars(){
	const {state, props} = this
	const stars = []
	const starStyle = props.stack ? [ui.star,ui.starStack]:[ui.star]
	const value = round(state.value, 0.5)
	for(let index = 1; index <= Maximum; index++){
		let name = null
		if(index <= value) name = 'star-full'
		else if(index === value + 0.5) name = 'star-half'
		else name = 'star-empty'
		stars.push(<Touch style={ui.starView} activeOpacity={0.95} key={index} disabled={props.disabled} onPress={()=>this.onPress(index)}>
			<Icon name={Icons[name]} style={starStyle}/>
		</Touch>)
	}
	return stars
}

function round(value, step){
	step || (step = 1.0)
	const inverse = 1.0 / step
	return Math.round(value * inverse) / inverse
}