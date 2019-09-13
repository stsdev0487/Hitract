//Style definitions for whitespace letting (margin, padding, sizing, etc)
import {StyleSheet} from 'react-native';
import {Data} from 'Hitract/Api';
import {screen} from './viewport';
import font from './font';

//Whitespace size scale
export const Scale = {
	get none(){ return font.none },
	get minimum(){ return this.none },//specific
	get minimal(){ return StyleSheet.hairlineWidth }, //specific
	get point(){ return font.point },
	get minor(){ return font.minor },
	small: 3, //specific
	get half(){ return font.half },
	get standard(){ return this.single - this.small }, //specific
	get single(){ return font.single },
	get medium(){ return this.standard * 2 }, //specific
	get median(){ return font.median },
	get line(){ return font.line },
	get double(){ return font.double },
	get prime(){ return font.prime },
	get press(){ return font.press },
	get triple(){ return font.triple },
	large: 37, //specific
	get quarter(){ return font.quarter },
}

//Fields for style properties that include individual `side` values
const Sides = ['Top', 'Right', 'Bottom', 'Left', 'Horizontal', 'Vertical']
Sides.margin = Sides.reduce(reduceSide.bind({type: 'margin'}), [])
Sides.padding = Sides.reduce(reduceSide.bind({type: 'padding'}), [])

//Mapping of function to clear `side` properties to include object maps with zeroed out values for all sides.
const clear = clearSide
clear.margin = Data.reduce(Sides.margin, 0) //All margins to 0
clear.padding = Data.reduce(Sides.padding, 0)//All padding to 0


//White-space or x/y offset for items that are laid-out around the edge of the app/super container (ie close buttons on top-left corner)
const edge = {
	get left(){ return this.x },
	get bottom(){ return this.x },
	get right(){ return this.x },
	get top(){ return this.y },
	x: Scale.half,
	y: Scale.double
}


//exports
export default {
	...Scale,
	clear,
	//Adjusts container sizing for padding & margin whitespace
	contain: {
		x: containX
	},
	edge,
	//White-space for first view in a set
	first: {
		top: Scale.none
	},
	//White-space for last view in a set
	last: {
		edge: Scale.large
	},
	screen,
	x: reduceXY(),
	y: reduceXY()
}


//scope actions

//Computes available `width` for styles with given boundary.
//Subtracts letting of sides in x-axis to compute actual value for component's `width`
function containX(style, bound = screen){
	const x = Data.get(bound, 'letting.x') || 0 //
	let width = Data.get(bound,'width') || screen.width //positive widths only
	width -= x

	//Still checking if both margin & padding values are relevant to exclude (withing native platforms it could be different)
	for(const field of Sides.margin.concat(Sides.padding)){
		if(field.endsWith('Left') || field.endsWith('Right') || field.endsWith('Horizontal')){
			if(field in style) width -= (style[field] * (field.endsWith('Horizontal') ? 2:1))
		}
	}

	//redefines original width
	style.width = width < 0 ? 0:width
	return style
}

/**INTERIM FUNCTION -------
Creates style object with zeroed-out values for specific or all sides for whitespace properties
 -	Stylesheet assignments should include proper definitions without hacks to clear whitespace &
	components using this function should be updated with a proper preset style after
 	there is a better understanding of stylesheet rules that consider the value overrides
 	usually from predefined dependency themes, stylesheets and/or components.
 */
function clearSide(type, ...sides){
	const source = createSource(...(arguments.length && type in clear ? clear[type]:[]))
	if(arguments.length && type in clear === false) sides.unshift(type)
	if(sides.length){
		for(const field in source){
			for(const side of sides){
				const remove = field.toLowerCase().endsWith(side.toLowerCase()) === false
				if(remove) delete source[field]
			}
		}
	}
	return source
	//scope actions
	function createSource(...sources){
		if(sources.length === 0) sources = [clear.margin, clear.padding] //all whitespace values to zero
		return Data.copy(...sources)
	}
}

//Creates map of property fields for all individual sides if stylesheet rules
function reduceSide(sides, side){ return sides.concat([`${this.type}${side}`]) }

//Returns letting size for both sides for axis. (x.small === letting.small * 2)
function reduceXY(){ return Data.define({}, Object.entries(Scale).map((entry)=>[entry[0], entry[1] * 2])) }