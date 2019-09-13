import {StyleSheet, Dimensions, Platform} from 'react-native';
import * as Data from 'Hitract/Api/Data';
import Valid from 'Hitract/Api/Valid';
import color from './color'

//Dimension values. Currently window is used to compute anything in UI module.
//NOTE: android includes differing values for both - https://facebook.github.io/react-native/docs/dimensions for more info
const size_dimension_field = 'window'
const screen_dimension_field = 'screen'
export const size = Dimensions.get(size_dimension_field)
export const screen = Dimensions.get(screen_dimension_field)


//Boundary definition for computing sizing with letting removed
export const boundary = {...size, letting: {x: 0, y: 0}}


//Platform information sheet
export const platform = {
	[Platform.OS]: true,
	name: Platform.OS,
	select: selectPlatformDefinition,
	version: computePlatformVersion()
}

//Specialty platform sizing & attributes
export const sizing = {
	//This is defined as the width of a thin line on the platform. It can be used as the thickness of a border or division between two elements.
	hairline: StyleSheet.hairlineWidth
}

const statusBarAttributes = {
	noShadow: true,
	style:{backgroundColor:color.white}
}
const status = {
	bar:{
		light: {
			...statusBarAttributes,
			...Platform.select({
				ios: {iosBarStyle: 'light-content'},
				android: {androidStatusBarColor: color.white}
			})
		},
		dark: {
			...statusBarAttributes,
			...Platform.select({
				ios: { iosBarStyle: 'dark-content' },
				android: { androidStatusBarColor: color.black }
			})
		},
	}
}


//Viewport UI module exports
export default {
	...size,
	[Platform.OS]:true,
	center: Data.define(computeCenterPoint, computeCenterPoint(size)),
	status,
	select:platform.select
}

//scope actions
function computeCenterPoint(target){
	if(Valid.number(target)) return {x: target / 2, y: target / 2}
	else if(Valid.data(target)){
		return {
			x: Data.has(target,'width') ? Data.get(target,'width') / 2:0,
			y: Data.has(target, 'height') ? Data.get(target, 'height') / 2:0
		}
	}
	return {x:0,y:0}
}

function computePlatformVersion(){
	return new (class PlatformVersion extends Number{
		constructor(ios, value, major, minor=0){
			major = ios ? parseInt(value, 10):
			minor = ios ? iosVersionFloat(value.split('.')):0
			super(major+minor)
			this.major = major
			this.minor = minor
			this.value = value
			//scope actions
			function iosVersionFloat(version){ return isNaN(version = parseFloat(['0', '.'].concat(version).join(''))) ? 0:version }
		}
		toString(){ return `${this.value}` }
	})(this.ios, Platform.Version)
}

//Definition.ios || definition.android
function selectPlatformDefinition(definition){ return Platform.select(definition) }