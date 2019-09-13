import React from 'react';
import Type from 'prop-types';
import {View, StatusBar, RefreshControl, ScrollView} from 'react-native';
import {StateActivity} from './State';
import Prototype from 'Hitract/Prototype/ScrollView';
import Api,{Valid} from 'Hitract/Api';
import {color,letting,viewport} from 'Hitract/UI';


export default class Area extends React.Component{
	static propTypes = {
		activity: Type.object,
		areaStyle: Type.object,
		bar: Type.object,
		flex: Type.number,
		footer: Type.number.isRequired,
		header: Type.number.isRequired,
		loading: Type.bool,
		transparent: Type.bool.isRequired,
		refresh: Type.func,
		scrolls: Type.bool.isRequired,
		statusBar: Type.oneOf(['light','dark']).isRequired,
		style: Type.object
	}
	static defaultProps = {
		flex: 1,
		footer: letting.medium,
		header: letting.none,
		loading: true,
		scrolls: true,
		statusBar: 'light',
		transparent: false
	}
	state={ refreshing:false }
	componentDidMount(){
		Api.mount(this)
		if(this.props.refresh) this.props.refresh(false, this)
	}
	componentWillUnmount(){ Api.unmount(this) }
	async onRefresh(){
		this.setState({refreshing:true})
		await this.props.refresh(true, this)
		this.setState({refreshing:false})
	}
	render(){
		const stateActivity = Valid.data(this.props.activity) ? this.props.activity:{}
		const scrollView = Prototype(this.props,{
			style: areaStyle(this),
			contentContainerStyle:this.props.style,
			scrollEnabled: this.props.scrolls
		})

		if(this.props.refresh) {
			scrollView.refreshControl=(<RefreshControl refreshing={this.state.refreshing} onRefresh={()=>this.onRefresh()}/>)
		}

		return (<ScrollView {...scrollView} keyboardDismissMode="interactive">
			<StatusBar {...viewport.status.bar[this.props.statusBar]} />
			<View style={{height: this.props.header}}></View>
			{this.props.loading === true && <StateActivity {...stateActivity} loading={this.props.loading} />}
			{this.props.loading !== true && this.props.children}
			<View style={{height: this.props.footer}}></View>
		</ScrollView>)
	}
}

//scope actions
function areaStyle({props}){
	const style = [{ backgroundColor: props.transparent ? color.transparent:color.backgroundColor }]
	if(Valid.number(props.flex)) style[0].flex = props.flex
	if(props.areaStyle) style.push(props.areaStyle)
	return style
}