import React from 'react';
import {TextInput} from 'react-native';
import * as Data from '../../Data';
import Entry from './Entry';
import {fieldComponent, fieldsetComponent} from './Field';

//scope actions
export function formInputs(component){
	return formRequirements.call(this, React.Children.toArray(component.props.children).map(mapFormElement, component))
}

export function formRequirements(children){
	for(const input of children){
		if(isField(input)){
			const entry = Entry.create(input, {nativeEvent: {text: input.props.value}, initial: true})
			if(this.form.has(entry.field) === false) this.form.set(entry.field, entry)
		}
	}
	return children
}

export function isField(component){ return component.type === TextInput || fieldComponent in component.type }

export function isFieldset(component){ return fieldsetComponent in component.type }

function mapFormElement(component){
	if(isFieldset(component)) return React.cloneElement(component, {form: Data.get(this,'props.form')})
	else if(isField(component)) return React.cloneElement(component, {onChange: onInputChange.bind({form: Data.get(this, 'props.form'), props: component.props})})
	return component
}

function onInputChange(){ this.form.push(Entry.create(this, ...arguments)) }