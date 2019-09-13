import * as Data from 'Hitract/Api/Data';
import * as Text from 'Hitract/Api/Text';
import Valid from 'Hitract/Api/Valid';
import structure from './structure';
import {context} from '../app.json';

class Terminology extends Map{
	constructor(notation, object){
		super(Object.entries(Valid.data(object) ? object:{}))
		this.notation = notation
		this.notated = Text.notated(this.notation)
	}
	get label(){ return getProperValue(this) }
	get value(){ return getValue.call(this) || '' }
	toString(){ return this.value }
}

//exports
export default class LocaleContext{ constructor(){ define(this, structure) } }


//scope actions
function define(){
	for(const entry of Object.entries(arguments[1])){
		if(Valid.data(entry[1])){
			if(is_terminology(entry[1])){
				Object.defineProperty(arguments[0], entry[0], {get: definition(entry)})
			}
			else arguments[0][entry[0]] = define({}, entry[1])
		}
	}
	return arguments[0]
}

function definition(){ return function get(){ return new Terminology(...this).label }.bind(arguments[0]) }

function describe_locale(notation){
	if(has_locale(notation = `${notation}.description`)) return Data.get(notation)
	return null
}

function getProperValue({value}){ return Valid.lowercase(value) ? Text.proper(value):value }



function get_locale(notation){
	const locale = Data.get(structure, notation)
	if(Valid.data(locale)){
		if(is_terminology(locale)) return new Terminology(notation, locale)
		return index_terminology(locale)
	}
	return null
}

function getValue(){ return this.has(context.localization) ? this.get(context.localization):this.notated }

function has_locale(notation){ return Data.has(structure, notation) }

function index_terminology(object){ return Object.entries(object).map(map_terminology).filter(Valid.data).reduce(reduce_terminology, {}) }

function is_terminology(object){ return Data.get(object, 'terminology') === true }

function map_terminology([notated, locale]){
	locale = is_terminology(locale) ? new Terminology(notated, locale):(Valid.data(locale) ? index_terminology(locale):null)
	return locale ? [notated, locale]:null
}

function reduce_terminology(object, [notated, locale]){ return (Object.assign(object, {[notated]: locale})) }


