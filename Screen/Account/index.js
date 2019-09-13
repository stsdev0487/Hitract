import {createStackNavigator} from 'react-navigation'
import {App,Nest,Screen,Navigator} from 'Hitract/App/Navigation/Option';
import Profile from './Profile';
import Editor from './Editor';
import Settings from './Settings';
import Bookmark from 'Hitract/Bookmark';

import {ContactStack} from '../Contact';
import {MediaStack} from '../Media';
import {NetworkStack} from '../Network';


import {Account} from 'Hitract/App';
Bookmark.Define('AccountEditor','Editor')

const Stack = Bookmark.Register('Account', {
	Profile: Screen(Profile, { params: {title: Account.profile} }),
	Editor: Nest(Editor,{
		params: {title: Account.editProfile},
		navigationOptions:{
			headerStyle: [Navigator.ui.headerStyle,{shadowRadius:0,shadowColor:'transparent',shadowOffset:null,shadowOpacity:0}]
		}
	}),
	Settings: Nest(Settings,{ params: {title: Account.settings} }),
	...ContactStack,
	...NetworkStack,
	...MediaStack
})

export default createStackNavigator(Stack,{initialRouteName:'Profile'})
