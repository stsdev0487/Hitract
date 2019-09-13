import {StyleSheet} from 'react-native';
import {align, container, color, font, letting, layer, viewport} from 'Hitract/UI';

export const ActionSize = {
	component: {
		get borderRadius(){ return this.height / 2 },
		height: 33
	},
	icon:{
		width: 16,
		height: 16
	}
}

export const Action = StyleSheet.create({
	component: {
		...ActionSize.component,
		backgroundColor: color.whiteShade,
		flex: 1,
		justifyContent: align.center
	},
	icon: {
		color: color.gray,
		fontSize: font.icon.single,
		justifyContent: align.center,
		...ActionSize.icon
	},
	text: {
		color: color.gray,
		fontSize: font.standard,
		justifyContent: align.center,
		height: ActionSize.icon.height
	},
	view: {flexDirection: align.row, justifyContent: align.center, alignContent: align.center, alignItems: align.center},
})



export default StyleSheet.create({
	authorAvatar:{
		height: 22.5,
		width: 22.5,
		get borderRadius(){ return this.width / 2 },
		marginRight: letting.single
	},
	authorLeftContainer:{
		justifyContent: align.center,
		alignItems: align.start,
		alignContent: align.center,
		paddingLeft: letting.single
	},
	authorRightContainer: {
		justifyContent: align.center,
		alignContent: align.center,
		alignItems: align.end,
		paddingRight: letting.single
	},
	authorDate: {
		fontSize: font.single,
		color: color.grayWhite
	},
	authorName:{
		fontSize: font.standard,
		color: color.grayLight
	},
	authorLabel:{
		flexDirection: align.row,
		justifyContent: align.center,
		alignItems:align.center
	},
	container: letting.contain.x({
		...layer.shadow[5],
		borderRadius: 5,
		backgroundColor: color.white,
		paddingHorizontal: letting.standard,
		marginBottom: letting.line,
		marginTop: letting.line,
		alignSelf:align.center
	}),
	spacing: {
		flex: 1,
		flexBasis: 99
	},
	description: {
		marginTop: letting.single,
		fontSize: font.standard,
		color: color.grayWhite,
		marginBottom: letting.medium
	},
	title: {
		fontSize: font.mid
	},
	separator:{
		marginVertical: letting.single,
		borderBottomColor: color.monochromeLight,
		borderBottomWidth: StyleSheet.hairlineWidth,
		flex: 1,
		width:'100%'
	},


})

