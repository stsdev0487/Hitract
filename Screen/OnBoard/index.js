import {createStackNavigator} from 'react-navigation';
import Join from './Join';
import Login from './Login';
import InvitationCode from './InvitationCode';

import Bookmark from 'Hitract/Bookmark';
const Stack = Bookmark.Register('OnBoard', {
	Join,
	Login,
	InvitationCode
})

export default createStackNavigator(Stack,{
	initialRouteName:'Join',
	navigationOptions: {header: null}
})