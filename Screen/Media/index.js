import {createStackNavigator} from 'react-navigation';
import {App, Nest, Screen} from 'Hitract/App/Navigation/Option';

import Collage from './Collage';
import Inspiration from './Collage/Inspiration';

import Bookmark from 'Hitract/Bookmark';
Bookmark.Define('HitPics', 'Media')
export const MediaStack = Bookmark.Register('Media', {
	Collage: Nest(Collage,{
		params: {title: 'HitPics'},
		navigationOptions: {
			title: 'HitPics Collage'
		}
	}),
	Inspiration: Nest(Inspiration, {
		navigationOptions:{
			title:'Inspiration'
		}
	})
})

export default createStackNavigator(MediaStack, { initialRouteName:'Collage'})