import{Data,Valid} from 'Hitract/Api';


export default function Navigator(component, attribute = {}){
	return function navigationOptions(stack){
		const navigator = NavigatorControl(component, stack, attribute)
		const title = navigator.nest.get('title', navigator.name)
		const tabBarLabel = navigator.nest.get('tabBarLabel', title) || navigator.nest.get('tabBarLabel', title)
		const navigationOptions = {
			header: navigator.nest.get('header'),
			headerTitle: navigator.nest.get('headerTitle'),
			tabBarLabel,
			title
		};
		return navigationOptions
	};
}

function NavigatorControl(component, stack, attributes = {}){
	return getNavigator()

	//scope actions
	function getNavigator(){

		return {
			name: component.name,
			get navigation(){ return getNavigation(stack) },
			get options(){ return getOptions(stack) },
			get properties(){ return getProperties(component) },
			get parameters(){ return getParameters(stack) },
			parameter(){ return getParameter(stack, ...arguments) },
			get route(){ return getRoute(stack) },
			get screen(){ return getScreen(stack) },
			get state(){ return getState(stack) },
			get nest(){ return Nest(attributes, this.parameters, this.properties, this.options) }
		}
	}

	function getNavigation(stack){ return Data.get(stack, 'navigation') || {getParam(field, value){ return null }} }

	function getOptions(stack){ return Data.get(stack, 'navigationOptions') || {} }

	function getProperties(component){ return Data.get(component, 'defaultProps') || {} }

	function getParameter(stack, ...parameter){ return getNavigation(stack).getParam(...parameter) }

	function getParameters(stack){ return Data.get(stack, 'navigation.state.params') || {} }

	function getRoute(stack){ return Data.get(stack, 'navigation.state.routeName') || '' }

	function getScreen(stack){ return Data.get(stack, 'screenProps') || {} }

	function getState(stack){ return Data.get(stack, 'navigation.state') || {} }
}

function Nest(...objects){
	return {
		delete: deleteProperty,
		get: getProperty,
		has: hasProperty,
		set: setProperty
	}

	//scope actions
	function deleteProperty(field){ }

	function getProperty(field, default_value = null){
		let value = default_value
		for(const object of objects){
			if(Data.has(object, field)){
				value = Data.get(object, field)
				break
			}
		}
		return value
	}

	function hasProperty(field){
		for(const object of objects){
			if(Data.has(object, field)) return true
		}
		return false
	}

	function setProperty(field, value){ }
}