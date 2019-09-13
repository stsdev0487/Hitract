import React from 'react';
import {ScrollView, Text, View, Image, TouchableOpacity as Touch, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {align, color, font, letting, viewport, Icon} from 'Hitract/UI';
import Api from 'Hitract/Api';
import {Account} from 'Hitract/App';
import Bookmark,{avatar,Icon as icon} from 'Hitract/Bookmark';



const ui = StyleSheet.create({
	footerContainer: {
		padding: letting.double,
		backgroundColor: color.grayLight
	},
	componentView: {
		flex: 1
	},
	componentContentView: {
		alignContent: align.center,
		flex: 1,
		flexDirection: align.column,
		height: viewport.height,
		justifyContent: align.start
	},
	profileImage: {
		width: 60,
		marginTop: letting.single,
		height: 60,
		get borderRadius(){ return this.width / 2 }
	},
	profileNameText: {
		...font.variant.semibold,
		color: color.white,
		fontSize: font.prime + 1,
		marginTop: letting.mid
	},
	profileVerifiedButton: {
		height: 20,
		minWidth: 100,
		width: 80,
		marginTop: letting.standard,
		borderRadius: 4,
		backgroundColor: color.whiteShade,
		alignContent: align.center,
		alignItems: align.center,
		justifyContent: align.center
	},
	profileVerifiedButtonText: {
		fontSize: font.print,
		color: color.azureBlue,
		paddingHorizontal: letting.standard,
		textTransform:'uppercase'
	},
	profileView: {
		maxHeight: 200,
		paddingTop: letting.large,
		paddingBottom: letting.line,
		paddingLeft: letting.triple
	},
	navigationSegment: {
		backgroundColor: color.white,
		flex: 1,
		flexGrow: 1
	},

	navigationButton: {
		flexDirection: align.row,
		marginTop: letting.double,
		marginLeft: letting.double,
		alignItems: align.center,
		justifyContent: align.start,

	},
	navigationIcon:{
		fontSize: font.icon.medium,
		marginRight: letting.standard,
		color: color.gray
	},
	navigationLabel:{
		fontSize: font.medium,
		color:color.gray
	}
})

const attribute = {
	icon: {
		active: true,
		size: font.icon.medium,
		style: ui.navigationIcon
	},
	button:{
		style:ui.navigationButton
	},
	label:{
		numberOfLines: 1,
		uppercase: true,
		style: ui.navigationLabel
	},
	linearGradient:{
		colors: [color.azureBlue, color.tiffanyBlue],
		end: {x: 1.1, y: 0.1},
		start:{x: 0.47, y: 0.35},
		style:StyleSheet.absoluteFill
	}
}

export default class NavigationMenu extends React.Component{
	static defaultProps = {}
	state = {profile: null}
	async componentDidMount(){
		Api.mount(this)
		Api.app.observe('studentProfile', change=>{
			if(Api.mounted(this)){
				this.setState({profile: change.to})
			}
		})
		try{ this.setState({profile: Api.authenticated ? await Api.account.profile():null}) }
		catch(error){ this.setState({profile: null}) }
	}
	componentWillUnmount(){ Api.unmount(this) }
	async logout(){
		await Api.app.logout()
		this.props.navigation.navigate(Bookmark.OnBoard)
	}
	render(){
		const profile = this.state.profile || {}
		const uri = profile.pictureUrl ? Api.url(profile.pictureUrl):avatar
		const username = profile.fullName ? profile.fullName:'Username'
		return (<View style={ui.componentView}>
				<LinearGradient {...attribute.linearGradient}></LinearGradient>
				<ScrollView>
					<View style={ui.componentContentView}>
						<View style={ui.profileView}>
							<Image source={{uri}} style={ui.profileImage}/>
							<Text style={ui.profileNameText}>{username}</Text>
							<Touch style={ui.profileVerifiedButton}>
								<Text style={ui.profileVerifiedButtonText}>{Account.verified}</Text>
							</Touch>
						</View>

						<View style={ui.navigationSegment}>

							<Touch {...attribute.button} onPress={()=>this.props.navigation.navigate(Bookmark.Profile)}>
								<Icon {...attribute.icon} name={icon.profile}/>
								<Text {...attribute.label}>{Account.profile}</Text>
							</Touch>


							<Touch {...attribute.button} onPress={()=>this.props.navigation.navigate(Bookmark.Settings)}>
								<Icon {...attribute.icon} name={icon.settings} />
								<Text {...attribute.label}>{Account.settings}</Text>
							</Touch>


							<Touch {...attribute.button} onPress={()=>this.logout()}>
								<Icon {...attribute.icon} name={icon.logout}/>
								<Text {...attribute.label}>{Account.logout}</Text>
							</Touch>

							<Touch {...attribute.button} onPress={onCatalog.bind(this)}>
								<Icon {...attribute.icon} name={icon.happy}/>
								<Text {...attribute.label}>CATALOG (Testing)</Text>
							</Touch>
							<Touch {...attribute.button} onPress={onEmpty.bind(this)}>
								<Icon {...attribute.icon} name={icon.happy}/>
								<Text {...attribute.label}>EMPTY STORAGE (Testing)</Text>
							</Touch>
						</View>

					</View>
				</ScrollView>
			</View>)
	}
}


//scope actions

//TESTING
import AsyncStorage from '@react-native-community/async-storage';

function onCatalog(){
	this.props.navigation.navigate(Bookmark.Catalog)
}
async function onEmpty(){
	await Api.app.logout()
	await AsyncStorage.clear()
	this.props.navigation.navigate(Bookmark.OnBoard)
}
//TESTING
