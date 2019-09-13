import React from 'react'
import * as Dictionary from './Dictionary';
import Icon from './Mark';


export function fromComponent(component){ return fromProperties(component.props) }

export function fromIdentity(identity){
	const Bookmark = Dictionary.find(identity)
	Bookmark.Icon = (attribute)=>(<Icon name={Bookmark.icon} {...attribute} />)
	return Bookmark
}

export function fromNavigation(navigation){ return fromState(navigation.state) }

export function fromProperties(properties){ return fromNavigation(properties.navigation) }

export function fromRoute(routeName){ return fromIdentity(routeName) }

export function fromState(state){ return fromRoute(state.routeName) }

export function fromTabBar(tab, tabBar){
	const {focused, horizontal, tintColor} = tab
	const Bookmark = fromComponent(tabBar)
	Bookmark.attributes = {focused,horizontal,tintColor}
	return Bookmark
}

