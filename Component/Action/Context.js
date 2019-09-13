import React from 'react';
import {Data, not, Valid, Type} from 'Hitract/Api';
class ActionContextFailure extends Error{
	constructor(error, reason){
		super(reason || error.message)
		this.name = 'ActionContextFailure'
		this.origin = error
	}
}

export default function ActionContext(Action){
	return class extends Action{
		get actionContext(){
			return {
				active: this.active,
				data: this.data,
				route: this.route,
				value: this.value
			}
		}
		get active(){ return this.get('props.active', false) }
		get component(){ return this.get('props.component') }
		get data(){ return this.get('props.data') }
		get(){ return get(this, ...arguments) }
		get navigation(){ return this.get('props.navigation', this.get('props.component.props.navigation')) }
		open(){ return this.trigger('navigation', navigation=>(navigation.navigate(this.openField, ...arguments), this)) }
		get openField(){ return this.get('props.open') }
		press(){
			let field = this.openField
			if(field) return this.open(this.data)
			field = this.toggleField
			if(field) this.toggle()
			if(this.props.onPress) this.props.onPress(this.actionContext)
			return this
		}
		pushState(state){ return this.trigger('component', component=>(component.setState(state),this)) }
		get params(){ return this.get('route.params', {}) }
		get route(){ return this.get('navigation.state', {}) }
		toggle(){ return (this.pushState({[this.toggleField]: {active:!this.active}}), this) }
		get toggleField(){ return this.get('props.toggle') }
		trigger(){ return trigger(this, ...arguments) }
		get value(){ return this.get('props.value') }
	}
}


//scope actions
function get(component, notation, preset=null){ return Data.get(component,notation) || preset }

function trigger(component, notation, action){
	try{ return action(get(component, notation)) }
	catch(error){
		throw new ActionContextFailure(error, `Property: "${notation}" in "${component.name}" is not defined.`)
	}
}