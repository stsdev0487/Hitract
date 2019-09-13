import React from 'react';
import {StyleSheet} from 'react-native';
import {align, color, font, layer, letting, viewport} from 'Hitract/UI';

export const Header = StyleSheet.create({
	title:{
		fontSize: font.medium,
		color: color.gray,
		flex:1,
		textAlign:align.left
	},
	icon: {color: color.gray, fontSize: font.icon.double, paddingHorizontal:0},
	action: {
		alignContent: align.center,
		alignItems: align.center,
		marginHorizontal: 8
	},
	side: {
		display: 'flex',
		flex: 1,
		flexDirection: align.row,
		alignContent: align.center
	},
	center: {
		alignItems: align.center
	}
})

export default StyleSheet.create({
	cardStyle: {},
	headerBackTitleStyle: Header.title,
	headerLeftContainerStyle: {},
	headerRightContainerStyle: {},
	headerStyle: {
		backgroundColor: color.white,
		borderBottomWidth: 0,
		borderBottomColor: color.transparent,
		shadowColor: color.transparentDark,
		shadowOffset: {width: 0, height: 1},
		shadowRadius: 8,
		shadowOpacity: 0.75,
		overflow: layer.visible
	},
	headerTitleStyle: Header.title,
	headerTitleContainerStyle: {

		paddingHorizontal: letting.single
	},
	tabBar: {
		shadowOffset: {
			width: 0,
			height: 3.88
		},
		shadowRadius: 5.5,
		shadowOpacity: 0.434
	},
	tabItemIcon: Header.icon
})

export const LeftSide = StyleSheet.create({
	view: {
		...viewport.select({
			ios: {
				marginRight: 22
			},
			default: {margin: 3}
		})
	}
})

export const RightSide = StyleSheet.create({
	view: {
		flexDirection:align.row,
		...viewport.select({
			ios: {
				marginLeft: 22
			},
			default: {margin: 3}
		})
	}
})

export const TitleSide = StyleSheet.create({
	view: {
		flexDirection: align.row
	}
})


