import React from 'react';
import {Data,Valid} from 'Hitract/Api';
import { Header, HeaderFloat, HeaderNone, HeaderScreen } from './NavigatorHeader';
import {Card as CardMode} from './NavigatorMode';
import * as Mode from './NavigatorMode';
import {color, font, Icon} from 'Hitract/UI';
import {Icons} from 'Hitract/Bookmark';
import ui, {HeaderStyle} from './NavigationStyle';

import {
	NavigationOptionsDrawer,
	NavigationOptionsGesture,
	NavigationOptionsHeader,
	NavigationOptionsParameters,
	NavigationOptionsTitle,
	NavigationOptionsTransition
} from './NavigationOptions';

export const Navigation = {
	...NavigationOptionsDrawer,
	...NavigationOptionsGesture,
	...NavigationOptionsHeader,
	...NavigationOptionsParameters,
	...NavigationOptionsTitle,
	...NavigationOptionsTransition
}

export const TabBarOptions = {
	activeTintColor: color.white,
	inactiveBackgroundColor: color.white,
	showLabel: false,
	style: ui.tabBar
}

export const TabBar = {tabBarOptions: {...TabBarOptions}}

export const NavigatorProperties = {
	disableKeyboardHandling: false,
	initialRouteKey: undefined,
	initialRouteName: undefined,
	initialRouteParams: undefined,
	paths: undefined,
	screenProps: undefined //screenProps - Pass down extra options to child screens
}



//exports
export { Mode, ui };
export * from './NavigatorHeader';
export * from './NavigationOptions';


//scope actions
export function DefaultNavigationOptions(){
	return Data.copy({
		defaultNavigationOptions(){
			return {
				...Navigation,
				...NavigationOptionsTabBar(...arguments)
			}
		}
	}, ...arguments)
}

export function NavigationOptions(navigatorOptions, navigationOptions){
	return Data.copy({
		navigationOptions(){
			navigationOptions = Valid.function(navigationOptions) ? navigationOptions.apply(this,arguments):navigationOptions
			return Data.copy(Navigation, navigationOptions)
		}
	}, navigatorOptions)
}

export function NavigationOptionsTabBar(){
	return {
		tabBarIcon: TabBarIcon(...arguments),
		tabBarLabel: null
	}
}


//Specifies stack navigator options that include standard app toolbar + tabs for main screen
export function Stack(){
	return Data.copy(Header,
		NavigatorProperties,
		CardMode,
		TabBar,
		DefaultNavigationOptions(...arguments))
}



export function TabBarIcon({navigation}){

	return (<Icon name={Icons[navigation.state.routeName.toLowerCase()]} style={ui.tabItemIcon}></Icon>)
}
