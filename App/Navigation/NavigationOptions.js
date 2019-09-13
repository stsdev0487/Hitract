import React from 'react';
import {align, color, font, layer, viewport, Icon} from 'Hitract/UI';
import ui from './NavigationStyle';

export const NavigationOptionsDrawer = { drawerLabel: undefined }

export const NavigationOptionsGesture = {
	gestureDirection: layer.default, //default | inverted,
	gesturesEnabled: true,
	gestureResponseDistance: { horizontal: 25, vertical: 135 }
}

export const NavigationOptionsHeader = {
	header: undefined,
	headerBackground: undefined,
	headerBackgroundTransitionPreset: layer.translate, //toggle | fade | translate,
	headerBackAllowFontScaling: false,
	headerBackImage: undefined,
	//headerBackTitle: undefined,

	headerBackTitleStyle: ui.headerBackTitleStyle,
	headerForceInset: undefined,
	// When a component is used, it receives a number of props when rendered
	//(onPress, title, titleStyle and more - check Header.tsx for the complete list).
	//https://github.com/react-navigation/react-navigation-stack/blob/master/src/views/Header/Header.tsx
	headerLeft: undefined,
	headerLeftContainerStyle: ui.headerLeftContainerStyle,
	headerPressColorAndroid: color.black,
	headerRight: undefined,
	headerRightContainerStyle: ui.headerRightContainerStyle,
	headerStyle: ui.headerStyle,
	headerTitle: undefined,
	headerTitleAllowFontScaling: true,

	headerTitleStyle: ui.headerTitleStyle,
	headerTitleContainerStyle: ui.headerTitleContainerStyle,
	headerTintColor: color.gray,
	headerTransparent: false,
	//headerTruncatedBackTitle: undefined,
}

export const NavigationOptionsParameters = { params: undefined }



export const NavigationOptionsTitle = { title: undefined }

export const NavigationOptionsTransition = {
	onTransitionEnd: undefined,
	onTransitionStart: undefined
}




