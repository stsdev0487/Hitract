import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TabView} from './Tab';
import Tabs from './Tabs';
import {Form} from 'Hitract/Component';
import {FormProtocol,Data,Valid} from 'Hitract/Api';
import App, {Account} from 'Hitract/App';


export default FormProtocol(class AccountEditor extends React.Component{
	state = createState({loading:false, disabled:false})
	onCancelAction(){
		if(App.mounted(this)){ console.log(this.form.data); }
		else{ }
	}
	onSaveAction(){
		if(App.mounted(this)){
			console.log(this.form.data);
		}
		else{

		}
	}
	onTab(index){
		this.setState({index})
	}
	render(){
		if('index' in this.state === false){
			const tab = Data.get(this, 'props.navigation.state.params.tab')
			this.state.index = getTabIndex(tab)
		}
		return (<TabView onTab={this.onTab.bind(this)}
						 scene={renderScene.bind(this)}
						 state={this.state}/>);
	}
	validate(){
		const invalid = this.form.invalid
		if(invalid.length){
			const feedback = []
			for(const input of invalid){
				const message = input.feedback || `Please enter a valid value for "${input.label}" to submit`
				feedback.push(message)
			}
			this.setState({
				invalidFeedback: feedback.join('\n')
			})
		}
	}
})




//scope actions
function getTab(route){
	return Tabs.filter(filter)[0]
	//scope actions
	function filter(Tab){ return Tab.name === route.key }
}

function getTabIndex(identifier){
	identifier = getTabName(identifier)
	for(let index =0;index<Tabs.length;index++){
		if(Tabs[index].name === identifier) return index
	}
	return 0
}

function getTabName(identifier){
	if(Valid.text(identifier)){
		if(identifier.endsWith('Tab') === false){
			return `${identifier}Tab`
		}
	}
	return identifier
}

function renderScene({route}){
	/*Each scene receives the following props:
		route: the current route rendered by the component
		jumpTo: method to jump to other tabs, takes a route.key as it's argument
		position: animated node which represents the current position
		this.props.jumpTo('albums'); */
	const Tab = getTab(route)
	return Tab ? <Tab form={this.form} />:null;
}

function createState(state={}){
	state.routes = []
	for(const Tab of Tabs){
		state.routes.push({
			key: Tab.name,
			title: Tab.title
		})
	}
	return state
}
