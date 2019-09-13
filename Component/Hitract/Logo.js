import React from 'react';
import Type from 'prop-types';
import {StyleSheet, Image, View} from 'react-native';
import {align} from 'Hitract/UI';
import {HitractEmblemWhite, HitractInlineWhite, Logo} from 'Hitract/Bookmark';

export const ui = StyleSheet.create({
	component: { alignItems: align.center },
	emblem: {
		...HitractEmblemWhite.dimension,
		alignItems: align.center,
		marginBottom: 26.4
	},
	inline: {
		...HitractInlineWhite.dimension,
		alignItems: align.center
	}
});

//exports
export default class HitractLogo extends React.Component{
	static propTypes = {
		emblem: Type.bool.isRequired,
		emblemStyle: Type.any,
		inline: Type.bool.isRequired,
		inlineStyle: Type.any
	}
	static defaultProps = {
		emblem: true,
		inline: true
	}
	render(){
		return (<View style={[ui.component,this.props.style]}>
			{this.props.emblem && <View style={[ui.emblem,this.props.emblemStyle]}><Image {...Logo.white.emblem}/></View>}
			{this.props.inline && <View style={[ui.inline,this.props.inlineStyle]}><Image {...Logo.white.inline}/></View>}
		</View>)
	}
}