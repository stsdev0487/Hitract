import React from 'react';
import {align, color, font, layer, viewport, Icon} from 'Hitract/UI';


export const Header = {
	headerBackTitleVisible: undefined,
	headerMode: viewport.select({
		//float or screen
		android: layer.screen,
		ios: layer.float,
	}),
	headerLayoutPreset: viewport.select({
		android: align.left,
		ios: align.center
	})
}

export const HeaderFloat = {headerMode: layer.float}

export const HeaderNone = {headerMode: layer.none}

export const HeaderScreen = {headerMode: layer.screen}