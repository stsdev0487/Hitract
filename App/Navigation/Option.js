import React from 'react';
import {Data,Valid} from 'Hitract/Api';
import * as Navigator from './Navigator';
import * as Side from './NavigatorHeaderSide';
const HeaderNavigation = {navigationOptions:{...Navigator.Header, ...Navigator.Navigation}}
//exports
export {Navigator, Side};

//scope actions

//Default navigation options for screens configured in stack navigator
export function App(...options){ return  Navigator.Stack({params: {variant: 'app'}},...options) }

//Navigation options for modal navigation presenting an overlaid view
export function Modal(screen, ...navigatorOptions){
	navigatorOptions = Data.copy(Navigator.Header, Navigator.Mode.Modal, ...navigatorOptions.concat({params: {variant: 'modal'}}))
	return {
		screen,
		...Navigator.NavigationOptions(navigatorOptions)

	}
}

//Navigation options for nested segues that display a back button versus main app toolbar
export function Nest(screen, ...options){
	return {
		screen,
		...Data.copy({ params: {variant: 'nest'} },
		...options.concat({
			navigationOptions(props){
				return {
					...navigationOptions(HeaderNavigation,...options),
					headerBackTitle: props.navigation.getParam('title'),
					headerTruncatedBackTitle: props.navigation.getParam('title')
				}
			}
		}))
	}
}

//Navigation options that display the main app toolbar
export function Screen(screen, ...options){

	return {
		screen,
		params: {variant: 'app'},
		...Data.copy(...options.concat({
			navigationOptions(props){
				return {
					...navigationOptions(HeaderNavigation, ...options),
					headerBackTitle: props.navigation.getParam('title'),
					headerLeft: <Side.Left {...props} />,
					headerRight: <Side.Right {...props} />,
					headerTitle: <Side.Title {...props} />,
					headerTruncatedBackTitle: props.navigation.getParam('title'),
				}
			}
		}))
	}
}


export function navigationOptions(...options){
	return options.filter(filter).map(map).reduce(reduce,{})

	//scope actions
	function filter(option){ return Valid.data(Data.get(option,'navigationOptions'))  }
	function map(option){ return option.navigationOptions }
	function reduce(option, entry){ return {...option,...entry} }
}

