import {createStackNavigator} from 'react-navigation';
import {App, Nest, Screen} from 'Hitract/App/Navigation/Option';

import Bookmark from 'Hitract/Bookmark';
import Mail from './Mail';
import Notifications from './Notifications';

Bookmark.Define('Chat', 'Mail')
export const ContactStack = Bookmark.Register('Contact', {
	Notifications:Screen(Notifications,{params:{title:'Notifications'}}),
	Mail: Nest(Mail, {params: {title: 'HitMail'}})
})

export default createStackNavigator(ContactStack, App({initialRouteName: 'Notifications'}))