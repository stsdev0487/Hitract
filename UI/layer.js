import * as Data from 'Hitract/Api/Data';
import color from './color';
import container from './container';

export const LayerDisplay = {
	absolute: 'absolute', //style.position
	contain: 'contain', //image resizeMode style
	cover: 'cover', //image resizeMode style
	fit: 'object-fit', //image resizeMode style
	flex: 'flex', //style.display
	hidden: 'hidden', //style.overflow
	inverted: 'inverted', //navigator.? (direction)
	none: 'none', //style.display |
	relative: 'relative',  //style.position
	transparent: 'transparent', //style.backgroundColor / navigator options
	visible: 'visible', //style.visibility | style.overflow
}

export const LayerGeometry = {
	axis: {horizontal: 0, vertical: 0},
	dimension: {height: 0, width: 0},
	point: {x: 0, y: 0}
}

export const LayerModes = {
	card: 'card', //navigator.? headerMode
	default: 'default', //navigator.? headerMode
	float: 'float', //navigator.? headerMode
	modal: 'modal', //navigator.mode
	screen: 'screen', //navigator.mode
	standard: 'default',
	auto: 'auto', //style.overflow | style.margin
	false: false,
	no: false,
	null: null,
	one: 1,
	true: true,
	undefined: undefined,
	yes: true,
	zero: 0
}

export const LayerOverlay = [
	{
		...container.fill.style,
		backgroundColor: color.transparent
	},
	{
		...container.fill.style,
		backgroundColor: color.transparentDark
	},
	{
		...container.fill.style,
		backgroundColor: color.transparentDark
	}
]

export const LayerRadius = [
	{borderRadius: 0},
	{borderRadius: 3},
	{borderRadius: 5},
	{borderRadius: 8},
	{borderRadius: 11},
	{borderRadius: 13.25},
	{borderRadius: 15},
	{borderRadius: 17}
]
LayerRadius.quadrant = ['borderTopLeftRadius', 'borderTopRightRadius', 'borderTopRightRadius', 'borderTopLeftRadius']

export const LayerShadow = createLayerShadow()

export const LayerTransition = {
	fade: 'fade', //navigator.?
	translate: 'translate', //navigator.?
	toggle: 'toggle', //navigator.?
}

export default {
	...LayerDisplay,
	...LayerModes,
	...LayerTransition,
	...LayerGeometry,
	overlay: LayerOverlay,
	radius: Data.define(LayerRadius, {corner:cornerRadius, top: cornerRadius(0, 1), right: cornerRadius(1, 3), bottom: cornerRadius(2, 3), left: cornerRadius(0, 3)}),
	shadow: LayerShadow
}

//scope actions
function createLayerShadow(shadowStyle = {shadowOffset: { height: 0, width: 0 }, shadowOpacity: 0.5, shadowColor: color.shadow, shadowRadius: 0}){
	return Object.assign([
		Data.copy(shadowStyle, {
			shadowRadius: 1
		}),
		Data.copy(shadowStyle, {
			shadowOffset: {
				height: 0.5
			},
			shadowRadius: 2
		}),
		Data.copy(shadowStyle, {
			shadowOffset: {height: 1},
			shadowRadius: 1.8
		}),
		Data.copy(shadowStyle, {
			shadowOffset: {
				height: 1
			},
			shadowRadius: 2.5
		}),
		Data.copy(shadowStyle, {
			shadowOffset: {
				height: 2
			},
			shadowRadius: 3
		}),
		Data.copy(shadowStyle, {
			shadowOffset: {
				width: 0,
				height: 1.5
			},
			shadowRadius: 1.33,
			shadowOpacity: 0.38
		}),
		Data.copy(shadowStyle, {
			shadowOffset: {
				width: 0,
				height: 3
			},
			shadowRadius: 4,
			shadowOpacity: 0.38
		}),
		Data.copy(shadowStyle, {
			shadowOffset: {
				width: 0,
				height: 1.5
			},
			shadowRadius:5,
			shadowOpacity: 0.5
		}),
		,
		Data.copy(shadowStyle, {
			shadowOffset: {
				width: 0,
				height: 3
			},
			shadowRadius: 8,
			shadowOpacity: 0.5
		})
	], {
		none: {
			shadowColor: null,
			shadowOffset: null,
			shadowRadius: null,
			shadowOpacity: null
		},
		minor: {
			...shadowStyle
		},
		small: {
			...shadowStyle
		},
		half: {
			...shadowStyle
		},
		standard: {
			...shadowStyle
		},
		single: {
			...shadowStyle
		},
		mid: {
			shadowOffset: {
				width: 0,
				height: 2
			},
			shadowRadius: 4,
			shadowOpacity: 0.2
		},
		medium: {
			...shadowStyle
		},
		line: {
			...shadowStyle
		},
		double: {
			...shadowStyle
		},
		prime: {
			...shadowStyle
		},
		press: {
			...shadowStyle
		},
		triple: {
			...shadowStyle
		},
		large: {
			...shadowStyle
		}
	})
}

function cornerRadius(...quadrants){
	const create = createRadius
	create.size = size=>createRadius(0, size)
	create.value = index=>createRadius(index)
	return create

	//scope actions
	function createRadius(index = 2, custom_size){
		const size = arguments.length === 1 ? (index in radius ? radius[index].borderRadius:0):custom_size
		return Data.reduce(quadrants.map(quadrant=>[quadrant, size]))
	}
}
