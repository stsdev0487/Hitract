import {createStackNavigator} from 'react-navigation';
import {App, Nest, Screen} from 'Hitract/App/Navigation/Option';
import Contents from './Contents';
import Companies from './Companies';
import Courses from './Courses';
import Universities from './Universities';

import Bookmark from 'Hitract/Bookmark';
const Stack = Bookmark.Register('Catalog', {
	Contents: Screen(Contents, {
		params: {title: 'Catalog'},
		navigationOptions: {
			title: 'Content Catalog'
		}
	}),
	Companies: Nest(Companies, {
		params: {title: 'Catalog'},
		navigationOptions: {
			title: 'Companies'
		}
	}),
	Courses: Nest(Courses, {
		params: {title: 'Catalog'},
		navigationOptions: {
			title: 'Courses'
		}
	}),
	Universities: Nest(Universities, {
		params: {title: 'Catalog'},
		navigationOptions: {
			title: 'Universities'
		}
	}),
})

export default createStackNavigator(Stack, App({initialRouteName: 'Contents'}))