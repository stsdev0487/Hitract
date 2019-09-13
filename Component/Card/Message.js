import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Type} from 'Hitract/Api'
import {Avatar} from '../Content'
import CardFrame from './Frame';
import {align, letting} from 'Hitract/UI'


const ui = StyleSheet.create({
	frame:{
		paddingHorizontal: letting.medium
	},
	component: {
		flexShrink: 1,
		flexDirection: align.row,
		justifyContent: align.between
	},
	gutter: {
		marginLeft: letting.single
	}
})

export default class CardMessage extends React.Component{
	static propTypes = {
		avatar: Type.any,
		footer: Type.number.isRequired,
		header: Type.number.isRequired
	}
	static defaultProps = {
		footer: letting.median,
		header: letting.medium
	}
	render(){
		return (<View style={[ui.component, this.props.style]}>
			<View style={ui.gutter}>
				<Avatar large source={this.props.avatar}/>
			</View>
			<CardFrame header={this.props.header} footer={this.props.footer} message style={ui.frame}>
				{this.props.children}
			</CardFrame>
		</View>)
	}
}

