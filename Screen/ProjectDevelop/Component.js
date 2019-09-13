import React from 'react';
import Type from 'prop-types';
import {Image, StyleSheet, Text, View} from "react-native";
import {Edit, Tag, SeeAll, SeeMore} from 'Hitract/Component';
import {align, color, font, layer, letting} from 'Hitract/UI';
import Api from 'Hitract/Api';


const ui = StyleSheet.create({
	containerTitleText: {
		...font.variant.bold,
		color: color.azureBlue,
		fontSize: font.large,
		paddingHorizontal: letting.standard,
		paddingVertical: letting.mid
	},
	containerTitleView:{
		...layer.shadow[3],
		...layer.radius[3],
		backgroundColor: color.white,
		padding: letting.standard,
	},
	containerView: {
		alignItems: align.center,
		flex:1,
		paddingHorizontal: letting.standard,
		paddingVertical: letting.mid,
		backgroundColor:color.transparentLight
	}
})

export default class StackComponent extends React.Component{
	static propTypes = {
		loading: Type.bool.isRequired,
		navigation: Type.object.isRequired
	}
	static defaultProps = {
		loading: false
	}
	static navigationOptions = {}
	state = {
		authenticated: Api.authenticated,
		title: 'Project Component Stacks'
	}
	componentDidMount(){
		Api.mount(this)
		this.setState({authenticated:Api.authenticated})
	}
	componentWillUnmount(){ Api.unmount(this) }
	render(){
		const seeMore = this.state.seeMore === true ? 'blue':'green'
		return (<SectionView>
			<View style={ui.containerView}>
				<View style={ui.containerTitleView}>
					<Text style={ui.containerTitleText}>{this.state.title}</Text>

					<Edit target='InvitationCode' tab='Code' component={this}></Edit>

					<SeeAll target='MediaGallery' component={this}></SeeAll>

					<View>
						<View style={{backgroundColor:seeMore, height:29, width:100 }}></View>
						<SeeMore component={this}></SeeMore>
					</View>

				</View>
				<View style={{ flexDirection:'row', flexWrap:'wrap', justifyContent:'space-between', alignContent:'space-between', width:200  }}>
					<Tag target='OnBoard' component={this}/>
					<Tag target='OnBoard' component={this}/>
					<Tag target='OnBoard' component={this}/>
					<Tag target='OnBoard' component={this}/>
					<Tag target='OnBoard' component={this}/>
				</View>
				<View>
					{listSamples(this)}
				</View>
			</View>
		</SectionView>)
	}
}


//scope actions
function listSamples({props}){
	const {navigation} = props
	console.log(props)
	return (<View></View>)
}