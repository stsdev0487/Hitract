import React from 'react';
import {View} from 'react-native';
import {NavigationProtocol} from 'Hitract/Api';
import * as Layout from './Layout';


//Base Container View with Layout options
export default class Container extends React.Component{
	static defaultProps = {
		//Attributes property are passed to the top View or ScrollView in render function
		attributes:{}
	}
	static navigator(){ return NavigationProtocol(this) }
	render(){
		//Children of the view can be either passed when component is used inline or can be generated
		//by defining a `view` function in the class body/prototype of the component
		const children=this.props.children || (this.view && this.view(Layout)) || []
		if(this.props.scroll) return Layout.scrollLayout(getScrollProperty(this, children))
		return (<View {...this.props.attributes}>{children}</View>)
	}
}


//scope actions
function getScrollProperty(component, children){
	const property = component.props.scroll === true ? {}:component.props.scroll
	property.children = children
	property.attributes = property.attributes || component.props.attributes
	return property
}



