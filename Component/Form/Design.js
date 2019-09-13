import React from 'react';
import {StyleSheet} from 'react-native';
import {align, container, color, font, letting, layer} from 'Hitract/UI';


export const frame = letting.contain.x({
	paddingHorizontal: letting.single,
	paddingVertical: letting.single
})

export const style = StyleSheet.create({
	save: {
		...layer.shadow[4],
		backgroundColor: color.azureBlue,
		alignContent: align.center,
		alignItems: align.center,
		justifyContent: align.center,
		flexDirection: align.row,
		height:28,
		paddingHorizontal: letting.line,
		borderRadius:container.button.standard.height / 2
	},
	cancel: {
		...layer.shadow[4],
		backgroundColor: color.whiteShade,
		alignContent: align.center,
		alignItems: align.center,
		justifyContent: align.center,
		flexDirection: align.row,
		paddingHorizontal: letting.line,
		height: 28,
		borderRadius: container.button.standard.height / 2,
		marginRight: letting.half
	},
	cancelText: {
		color: color.gray,
		fontSize: font.standard,
		alignSelf: align.center
	},
	saveText: {
		color: color.white,
		fontSize: font.standard,
		alignSelf: align.center
	},
	caption: {
		alignItems: align.center,
		width: frame.width
	},
	captionDescription: {
		...font.variant.regular,
		fontSize: font.standard,
		color: color.gray,
		marginTop: letting.half
	},
	captionTitle: {
		...font.variant.bold,
		fontSize: font.medium,
	},
	fieldset: {
		alignSelf: align.center,
		width: frame.width
	},

	input: {
		borderBottomColor: color.slateShade,
		borderLeftWidth: letting.none,
		borderTopWidth: letting.none,
		borderRightWidth: letting.none,
		borderBottomWidth: StyleSheet.hairlineWidth,
		fontSize: font.mid,
		paddingVertical: letting.single,
		width: frame.width,
		alignSelf: align.center
	},
	label: {
		...font.variant.normal,
		fontSize: font.mid,
		width: frame.width,
		paddingBottom: letting.half
	},
	spacing: {
		height: letting.medium,
		width: letting.medium,
		flexShrink: 0
	}
})

export const captionTitle = {
	numberOfLines: 1,
	style: style.captionTitle
}

export const captionDescription = {
	numberOfLines: 4,
	style: style.captionDescription
}

export const input = {
	autoCorrect: false,
	style: style.input
}

export const label = {
	numberOfLines: 1,
	style: style.label
}

export const spacing = {
	style: style.spacing
}

