import {StyleSheet} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import * as Option from 'Hitract/App/Navigation/Option';
import {color, letting} from 'Hitract/UI';

import GraphicBoxes from './GraphicBoxes';
import Topics from './Topics';
import Bookmark from 'Hitract/Bookmark';

const Stack = Bookmark.Register('ProjectDevelop', {
	Topics,
	GraphicBoxes,

})


export default createStackNavigator(Stack, {
	defaultNavigationOptions: Option.defaultNavigationOptions
})


export const ui = StyleSheet.create({
	navigationSegment: {
		display: 'none',
		borderTopColor: color.grayLight,
		borderTopWidth: StyleSheet.hairlineWidth,
		backgroundColor: color.white,
		marginTop: letting.triple,
		padding: letting.standard
	}
})