import {createStackNavigator} from 'react-navigation';
import * as Option from 'Hitract/App/Navigation/Option';
import SearchResults from './Results';


import Bookmark from 'Hitract/Bookmark';
const Stack = Bookmark.Register('Search', {
	SearchResults
})

export default createStackNavigator(Stack, {
	defaultNavigationOptions: Option.defaultNavigationOptions
})