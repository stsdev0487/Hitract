import React from 'react';
import {Platform} from 'react-native';
import {createAppContainer, createDrawerNavigator, createSwitchNavigator} from 'react-navigation';
import Bookmark from 'Hitract/Bookmark';
import TabBar from './Navigation/TabBar';
import OnBoard from 'Hitract/Screen/OnBoard';
import Menu from './Menu';
import Launcher from './Launcher';



//const instructions = Platform.select({
//	ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//	android:
//		'Double tap R on your keyboard to reload,\n' +
//		'Shake or press menu button for dev menu',
//});

const Drawer = { drawerWidth: 300, contentComponent: properties=>(<Menu {...properties}/>) }



//TESTING
import ProjectDevelop from 'Hitract/Screen/ProjectDevelop';
import Catalog from 'Hitract/Screen/Catalog';

//TESTING

const Stack = Bookmark.Register('App', {
	Launcher,
	// Wrap TabBar navigation into drawer navigation
	App: createDrawerNavigator({TabBar}, Drawer),
	OnBoard,

	//TESTING
	Catalog,
	ProjectDevelop,
	//TESTING
})

/*Main application container + wrapping into all navigation controllers.*/
const NavigationController = createSwitchNavigator(Stack, {initialRouteName: 'Launcher'})

//Account Navigation Controller
export default createAppContainer(NavigationController);
