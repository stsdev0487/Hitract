import color from './color'
import font from './font'
import letting from './letting'

export const buttonBase = {
	color: color.text,
	fontSize: font.standard
}

export const buttonComponent = {
	...buttonBase,
	paddingRight: letting.median,
	paddingLeft: letting.median,
	paddingTop: letting.minor,
	paddingBottom: letting.minor,
	height: 33,
	backgroundColor: color.buttonBackground,
	shadowColor: color.buttonShadow,
	shadowOffset: {height: 1.8},
	shadowRadius: 2,
	shadowOpacity: 0.24
}

export const buttonIcon = {
	...buttonBase,
	fontSize: font.icon.standard,
	marginRight: letting.half,
	marginLeft: letting.none
}

export const buttonLabel = {
	...buttonBase,
	paddingLeft: letting.none,
	paddingRight: letting.none
}





export default {
	base: buttonBase,
	component: buttonComponent,
	icon: buttonIcon,
	label: buttonLabel
}
