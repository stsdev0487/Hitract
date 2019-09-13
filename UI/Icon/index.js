import React from 'react';
import {Text} from 'react-native';
import {Type} from 'Hitract/Api';
import map from './map';
console.log(map)
import {Icons} from 'Hitract/Bookmark';

export const IconFields = new Set(Array.from(map.keys()).concat(Object.keys(Icons)))
export const IconSizePreset = 12;
export const IconFontFamily = 'MaterialIcons-Regular';
export const IconStyle = {
	fontFamily: IconFontFamily,
	fontWeight: 'normal',
	fontStyle: 'normal',
	fontSize: 'IconSizePreset'
}

export default class Icon extends React.PureComponent{
	static defaultProps = { size: IconSizePreset };
	static propTypes = {
		name: Type.oneOf(Array.from(IconFields)),
		size: Type.number,
		color: Type.oneOfType([Type.string, Type.number]),
		children: Type.node,
		style: Type.any // eslint-disable-line react/forbid-prop-types
	};

	handleRef = reference=>this.root = reference;
	render(){
		const {name, size, color, style, children, ...props} = this.props;
		const {character} = map.has(name) ? map.get(name):map.get(Icons[name])
		props.style = [IconStyle, {fontSize: size, color:color}, style];
		props.ref = this.handleRef;
		return (<Text {...props}>
			{character}
			{children}
		</Text>);
	}
	root = null;
	setNativeProps(nativeProps){
		if(this.root) this.root.setNativeProps(nativeProps);
	}
}
