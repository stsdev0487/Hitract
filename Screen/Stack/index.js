import {createStackNavigator} from 'react-navigation';
import * as Option from 'Hitract/App/Navigation/Option';
import StackComponent from './Component';


import Bookmark from 'Hitract/Bookmark';
Bookmark.Define('StackRouteAlias', 'StackRouteName')
const Stack = Bookmark.Register('StackName', {
	StackComponent
})

export default createStackNavigator(Stack, {
	defaultNavigationOptions: Option.defaultNavigationOptions
})