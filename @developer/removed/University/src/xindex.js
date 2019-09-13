import {createStackNavigator} from 'react-navigation';
import {App, Nest, Screen} from 'Hitract/App/Navigation/Option';
import UniversityProfile from './Profile';
import UniversityTopic from './Topic';
import Bookmark from 'Hitract/Bookmark';

export const UniversityStack = Bookmark.Register('University', {
	University: Nest(UniversityProfile, {
		params: {title: 'Institutions'},
		navigationOptions: {
			title: 'University'
		}
	}),
	UniversityTopic: Nest(UniversityTopic, {
		params: {title: 'Companies'},
		navigationOptions: {
			title: 'University Topic'
		}
	})
})
export default createStackNavigator(UniversityStack, App({initialRouteName: 'University'}))