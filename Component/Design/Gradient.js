import React from 'react';
import Type from 'prop-types';
import {GradientPalette, ButtonGradient as button, CornerGradient as corner, DiagonalGradient as diagonal, FillGradient as fill} from 'Hitract/Bookmark';
import LinearGradient from 'react-native-linear-gradient';
import {Data} from 'Hitract/Api';
const Types = {fill, button, corner, diagonal}
export const GradientTypes = Object.keys(Types)
export const GradientNames = Object.keys(GradientPalette)

export default class Gradient extends React.Component{
	static propTypes = {
		colors: Type.array.isRequired,
		start: Type.object,
		end: Type.object,
		name: Type.oneOf(GradientNames),
		type: Type.oneOf(GradientTypes).isRequired
	}
	static defaultProps={
		colors:[],
		name: GradientNames[0],
		type: GradientTypes[0]
	}
	render(){
		const attribute = Data.assign({style:this.props.style},{start: this.props.start, end: this.props.end, colors: this.props.colors}, {colors: GradientPalette[this.props.name]}, Types[this.props.type])
		return (<LinearGradient {...attribute}>{this.props.children}</LinearGradient>);
	}
}
