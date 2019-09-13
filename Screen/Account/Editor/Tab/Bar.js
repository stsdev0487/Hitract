import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { TabBar} from 'react-native-tab-view'; //https://www.npmjs.com/package/react-native-tab-view
import {Data} from 'Hitract/Api';
import {align, color, font, Icon, layer, letting} from 'Hitract/UI';
import {Navigator} from 'Hitract/App/Navigation';

const ui = StyleSheet.create({
	contentContainer: {},
	indicator: { backgroundColor: color.azureBlue },
	indicatorContainer: {},
	label: {
		...font.variant.regular,
		height: 28,
		fontSize: font.median,
		marginBottom: letting.half
	},
	tab: {
		height:33,
		width: 150,
		paddingHorizontal:letting.single,
		paddingBottom: letting.median
	},
	tabBar: Navigator.ui.headerStyle

});

const TabBarProperties = {
	activeColor: color.azureBlue,
	bounces: true,
	contentContainerStyle: ui.contentContainer,
	//getAccessible()=>{},
	//getAccessibilityLabel: ({route})=>route.accessibilityLabel,
	//getLabelText: ({route})=>route.title,
	//getTestID: ({route})=>route.testID,
	inactiveColor: color.monochromeShade,
	indicatorContainerStyle: ui.indicatorContainer,
	indicatorStyle: ui.indicator,
	labelStyle: ui.label,
	//onTabPress:()=>{},
	//onTabLongPress:()=>{},
	pressColor: color.grayLight,
	pressOpacity: 0.5,
	//renderBadge: ()=>{},
	//renderIcon: ()=>{},
	//renderIndicator:()=>{},
	//renderLabel: ()=>{},
	scrollEnabled: true, /*also specify a width in tabStyle to improve the initial render.*/
	style: ui.tabBar,
	tabStyle: ui.tab,
	//testID: null
}

//exports
export default function EditorTabBar(props){
	/*renderTabBar = {props => 	}*/
	return <TabBar {...TabBarProperties} {...props} />
}


//scope actions
function onTabPress(){}

function onTabLongPress(){}

function renderBadge(){

}

function renderIndicator(){}

function renderLabel({route, focused, color}){
	return <Text style={{color, margin: 8}}>
		{route.title}
	</Text>
}

function renderIcon({route, focused, color}){
	return (<Icon name={focused ? 'abums':'albums-outlined'}
				  color={color}/>)
}