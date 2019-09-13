import React from 'react';
import {not,Data,Text} from 'Hitract/Api';

export function defaultPropertiesFilter(field){ return this.includes(field) === false }


export function fields({defaultProps,propTypes}, Properties){
	return {
		properties: Object.getOwnPropertyNames(defaultProps || {}).filter(defaultPropertiesFilter, Properties),
		types: Object.getOwnPropertyNames(propTypes || {}).filter(propertyTypesFilter, Properties)
	}
}

export function propertyTypesFilter(field){ return properties.includes(field) === false }

export function prototype({Properties}){
	return function attribute(propertyObject, ...propertyExtension){
		const Attribute = {}
		for(const field in propertyObject){
			if(Properties.includes(field)) Attribute[field] = propertyObject[field]
		}
		return Data.copy(Attribute, ...propertyExtension)
	}
}

export function read(value){ return value.split('\n').map(Text.trim).filter(not.empty) }