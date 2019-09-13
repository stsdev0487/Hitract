import {Icon as Icons} from './Icons';
import {layer} from 'Hitract/UI';

export default class Bookmark{
	static Define(field, value){
		if(Object.hasOwnProperty(this, field) === false){
			Object.defineProperty(this, field, {value, enumerable: false})
		}
		return this
	}
	static Register(Screen, Stack = {}){
		this.Define(Screen, Screen)
		for(const field in Stack) this.Define(field, field)
		return Stack
	}
}

//exports
export * from './Api';
export * from './Gradients';
export * from './Graphics';
export * from './Icons';
export {Icons};

export const HitractEmblemWhite = {
	dimension: {height: 142, width: 142},
	image: require('../images/logo/white-emblem.png')
}

export const HitractInlineColor = {
	dimension: {height: 111, width: 600},
	image: require('../images/logo/color-inline.png')
}

export const HitractInlineWhite = {
	dimension: {height: 34.9, width: 189},
	image: require('../images/logo/white-inline.png')
}

export const Logo = {
	color: {
		inline: {
			source: HitractInlineColor.image,
			size: HitractInlineColor.dimension,
			style: {flex: layer.one, resizeMode: layer.contain}
		}
	},
	white: {
		emblem: {
			source: HitractEmblemWhite.image,
			style: {...HitractEmblemWhite.dimension, flex: layer.one, resizeMode: layer.contain}
		},
		inline: {
			source: HitractInlineWhite.image,
			style: {...HitractInlineWhite.dimension, flex: layer.one, resizeMode: layer.contain}
		}
	}
}