//Monochromatic color dyes
const monochromeLight = 'rgba(227,227,227,1)'
const monochrome = 'rgba(204,204,204,1)'
const monochromeShade = 'rgba(197,197,197,1)'


const black = 'rgb(1,1,1)';


const grayWhite = 'rgb(166, 166, 166)'
const grayLight = 'rgb(104, 104, 104)'
const gray = 'rgb(90, 90, 90)'

const white = 'rgb(255,255,255)'
const whiteShade = 'rgba(250,250,250,1)'




//Polychromatic color dyes

const slateLight = 'rgb(238, 238, 238)';
const slate = 'rgb(173, 178 ,182)';
const slateShade = 'rgb(159,165,170)';

const azureBlueLight = 'rgb(89, 173, 255)'
const azureBlue = 'rgb(7, 151, 237)'

const cream = '#C5B7AF'

const tiffanyBlue = 'rgb(138,230,218)';

const skyBlue = '#9dd6eb';


const navyBlueLight = 'rgb(66, 103, 178)';
const navyBlue = 'rgb(59,89,152)';


const green = 'rgb(12,206,107)'
const red = 'rgb(252,72,80)'
const yellow = 'rgb(248,200, 34)'

//Colors with transparent attributes used to accent/overlay other UI elements

const transparentLight = 'rgba(204, 204, 204, 0.28)'
const transparentBright = 'rgba(110, 100, 100, 1)'
const transparent = 'transparent'
const transparentFade = 'rgba(0, 0, 0, 0.03)'
const transparentShade = 'rgba(0, 0, 0, 0.44)'
const transparentDark = 'rgba(0, 0, 0, 0.57)'

const palette = {
	monochrome,
	monochromeLight,
	monochromeShade,

	black,

	grayWhite,
	grayLight,
	gray,

	white,
	whiteShade,

	slateLight,
	slate,
	slateShade,

	azureBlueLight,
	azureBlue,

	cream,

	navyBlueLight,
	navyBlue,

	skyBlue,

	tiffanyBlue,

	green,

	red,

	yellow,

	transparent,
	transparentBright,
	transparentLight,
	transparentShade,
	transparentFade,
	transparentDark
}

export default {
	...palette,
	backgroundColor: slateLight,
	buttonBackground: whiteShade,
	buttonShadow: grayLight,
	shadow: grayLight,
	headingText: slate,

	text: gray,
	tint: palette.azureBlue
}
