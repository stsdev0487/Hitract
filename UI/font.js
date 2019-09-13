//Font-type size scale and style rules for the app
import * as Data from 'Hitract/Api/Data';
import viewport, {platform} from './viewport';
import align from './align';
import color from './color';

const Fonts = {
	RobotoSlab:{
		bold: 'RobotoSlab-Bold',
		regular: 'RobotoSlab-Regular',
		thin: 'RobotoSlab-Thin',
		light: 'RobotoSlab-Light'
	}
}




//Font family
const family = {
	serif: Fonts.RobotoSlab.regular,
	sans: viewport.ios ? 'System':'sans-serif'
}

//Text.style //includeFontPadding: true/false | lineHeight, textAlign | textShadowRadius, textShadowColor, textShadowOffset
export const TextFormat = {
	Decoration:{
		none: 'none', //Text.style.textDecorationLine
		strike: 'line-through', //Text.style.textDecorationLine
		get under(){ return this.underline },
		under_strike: 'underline line-through', //Text.style.textDecorationLine
		underline: 'underline', //Text.style.textDecorationLine
	},
	Font: {
		normal: 'normal', //Text.style.fontStyle
		bold: 'bold', //Text.style.fontWeight
		italic: 'italic', //Text.style.fontStyle
	},
	Line: {
		get dash(){ return this.dashed },
		dashed: 'dashed', //Text.style.textDecorationStyle
		get dot(){ return this.dotted },
		dotted: 'dotted', //Text.style.textDecorationStyle
		double: 'double', //Text.style.textDecorationStyle
		solid: 'solid', //Text.style.textDecorationStyle
		//Text.style.textDecorationColor
	},
	Transform: { //Text.style.textTransform
		capitalize: 'capitalize',
		lowercase: 'lowercase',
		none: 'none',
		uppercase: 'uppercase'
	},
	Variant:{ //Text.style.fontVariant
		linear: 'lining-nums',
		miniature: 'small-caps',
		tabular: 'tabular-nums',
		proportional: 'proportional-nums',
		traditional: 'oldstyle-number'
	},
	Vertical:{ //Text.style.textAlignVertical
		auto: align.auto,
		bottom: align.bottom,
		center: align.center,
		top: align.top
	}
}

//Font formatting
const format = {
	...TextFormat.Decoration,
	...TextFormat.Font,
	...TextFormat.Line,
	...TextFormat.Transform,
	...TextFormat.Variant,
	get lower(){ return false }, //Text.props.uppercase = false
	get upper(){ return true }, //Text.props.uppercase = true
}

//Letter formatting for Text.style.letterSpacing
const letter = {
	half: 0.5,
	single: 1,
	double: 2,
	triple: 3,
	quarter: 4
}

//Font family style definitions
export const sans = {fontFamily: family.sans}
export const serif = {fontFamily: family.serif}

//Scaling for font sizes 1:scale
const scale = { icon: 1.2 }

const size = {
	none:0,  //scale constant
	get minimum(){ return this.point }, //specific
	point: 1, //scale constant
	minor: 2,  //scale constant
	half: 5,   //scale constant
	pre: 7, //typography constant
	micro: 8, //typography constant
	small: 9, //specific
	single: 10,  //scale constant
	standard: 12, //specific
	print: 14, //typography constant
	median: 15,  //scale constant
	medium: 16, //specific
	line: 17.28, //typography constant
	large: 18, //specific
	double: 20,  //scale constant
	prime: 20.74, //typography constant
	press: 24.88, //typography constant
	triple: 30,  //scale constant
	quarter: 40,  //scale constant
	maximum: 50, //specific
}

//Font weights
const weights = {thin: '100', ultralight: '200', light: '300', regular: '400', medium: '500', semibold: '600', bold: '700', heavy: '800', black: '900'}

//Font module
export default {
	family,
	format,
	icon: reduceIcon(),
	letter,
	serif,
	sans,
	...size,
	variant: reduceVariantFontStyles(),
	weights
}

//scope actions
//Returns font scale size for for icon scaling 1:1.5. (x.small === font.small * 1.5)
function reduceIcon(){ return Data.define({}, Object.entries(size).map((entry)=>[entry[0], entry[1] * scale.icon])) }


//Generates platform-specific style rules for font families
function reduceVariantFontStyles(special = {
	thin: {ios: {fontFamily: family.sans, fontWeight: weights.thin}, android: {fontFamily: `${family.sans}-thin`, fontWeight: format.normal}},
	ultralight:{ios: {fontFamily: family.sans, fontWeight: weights.thin}, android: {fontWeight: weights.normal}},
	light: {ios: {fontWeight: weights.light}, android: {fontFamily: `${family.sans}-light`, fontWeight: format.normal}},
	regular: {ios: {fontWeight: weights.regular}, android: {fontFamily: family.sans, fontWeight: format.normal}},
	medium: {ios: {fontWeight: weights.medium,}, android: {fontFamily: `${family.sans}-medium`, fontWeight: format.normal}},
	semibold:{ios: {fontWeight: weights.semibold}, android: {fontFamily: `${family.sans}-medium`, fontWeight: format.normal}},
	bold: {ios: {fontWeight: weights.bold}, android: {fontFamily: family.serif, fontWeight: format.bold}},
	heavy: {ios: {fontWeight: weights.heavy}, android: {fontFamily: family.serif, fontWeight: format.bold}},
	black:  {ios: {fontWeight: weights.black}, android: {fontFamily: family.serif, fontWeight: format.bold}}
}, shared = {backgroundColor: color.transparent, ...platform.select({ios: {fontFamily: family.sans}, android: {includeFontPadding: false}})}){
	return Data.reduce(Data.entries(special).map(on_variant))
	//scope actions
	function on_variant(definition){ return [definition[0],Data.copy(shared, platform.select(definition[1]))] }
}




