import React from 'react';
import {StyleSheet} from 'react-native';
import {TabView} from 'react-native-tab-view'; //https://www.npmjs.com/package/react-native-tab-view
import TabBar from './Bar';
import {Type} from 'Hitract/Api';
import {viewport} from 'Hitract/UI';

const ui = StyleSheet.create({
	sceneContainer: {
		//flex: 1
	},
	tabView: {

		flex:1
	}
});

export const TabViewProperties = {
	gestureHandlerProps: undefined, /*PanGestureHandler*/
	initialLayout: {width: viewport.width},
	keyboardDismissMode: 'auto',
	lazy: true,
	//lazyPreloadDistance: 0,
	//navigationState(required)
	//onSwipeEnd()=>{},
	//onSwipeStart()=>{},
	//onIndexChange(required)
	position: undefined, /*position = new Animated.Value(0);*/
	//removeClippedSubviews: false, /*Note: Don't enable this on iOS where this is buggy and views don't re-appear.*/
	//renderLazyPlaceholder:()=>{},
	/*renderTabBar: props=><TabBar {...props} />, //renderTabBar => TabBar*/
	//renderScene(required) =>SceneMap
	//sceneContainerStyle: ui.sceneContainer,
	//springVelocityScale: 0,
	//springConfig: undefined, /*{damping, mass, stiffness,restSpeedThreshold, restDisplacementThreshold}*/
	style: ui.tabView,
	swipeEnabled: true,
	swipeVelocityImpact: 0.2,
	tabBarPosition: 'top',
	//timingConfig: undefined
	/*{duration}*/
}

export default function EditorTabView(props){
	return (<TabView {...TabViewProperties}
		onIndexChange={props.onTab}
		navigationState={props.state}
		renderScene={props.scene}
		renderTabBar={TabBar}
	/>);
}

EditorTabView.propTypes = {
	scene: Type.func.isRequired,
	onTab: Type.func.isRequired,
	state: Type.object.isRequired,
}

//scope actions
export function createRoute(key, title){
	return {
		key,
		title
	}
}

export function createState(index, routes){
	return {
		index,
		routes
	}
}