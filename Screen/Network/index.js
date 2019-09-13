import {createStackNavigator} from 'react-navigation';
import {App, Nest, Screen} from 'Hitract/App/Navigation/Option';
import Feed from './Feed';
import Course from './Course';
import CourseTopic from './Course/TopicCreate';
import {Company, University, UniversityTopic} from './Institution';
import Rate from './Rate';
import Topic from './Topic';
import Topics from './Topics';

import Bookmark from 'Hitract/Bookmark';

export const NetworkStack = Bookmark.Register('Network', {
	Feed: Screen(Feed, {params: {title: 'HitFeed'}}),
	University: Nest(University, {
		params: {title: 'Inst...'},
		navigationOptions: {
			title: 'University'
		}
	}),
	UniversityTopic: Nest(UniversityTopic, {
		params: {title: 'Topic'},
		navigationOptions: {
			title: 'Topic'
		}
	}),
	Company: Nest(Company, {
		params: {title: 'Companies'},
		navigationOptions:{
			title:'Company'
		}
	}),
	Course: Nest(Course, {
		params: {title: 'Courses'},
		navigationOptions: {
			title: 'Course'
		}
	}),
	CourseTopic: Nest(CourseTopic, {
		params: {title: 'Topic'},
		navigationOptions: {
			title: 'Topic'
		}
	}),
	Rate: Nest(Rate,{}),
	Topics: Nest(Topics, {}),
	Topic: Nest(Topic, {})
})
export default createStackNavigator(NetworkStack, App({initialRouteName: 'Feed'}))