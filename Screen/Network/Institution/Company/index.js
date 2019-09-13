import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, ImageBackground, Linking, Image, Dimensions} from 'react-native';
import {Fonts, Colors} from '../themes';

import {Area, Gradient, Card, Space, SeeMore} from 'Hitract/Component';
import Api, {Data,Valid, not} from 'Hitract/Api';
import{letting} from 'Hitract/UI';
import Feed from '../../Feed';
const styles = StyleSheet.create({
	backgroundImage: {
		width: '100%',
		height: 400,
		resizeMode: 'contain',
		position:'absolute',
		top:0
	},
	header: {
		width: '100%',
		height: 200
	},
	logoView: {
		position: 'absolute',
		top: -56,
		width: 112,
		height: 112,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor:'white',
		alignSelf: 'center',
		borderRadius: 20,
		overflow:'hidden'
	},
	logoImage: {
		width: 106,
		height: 106,
		borderRadius: 20
	},
	title: {
		fontSize: Fonts.size.large,
		color: Colors.dark,
		textAlign: 'center',
		marginBottom: 10
	},
	subTitle: {
		fontSize: Fonts.size.medium,
		lineHeight: 18,
		letterSpacing: 0,
		color: Colors.dark,
		marginBottom: 10
	},
	text: {
		fontSize: Fonts.size.small,
		lineHeight: 16,
		letterSpacing: 0,
		color: Colors.gray
	},
	subText: {
		color: Colors.dark,
	},
	link: {
		color: Colors.lightBlue,
	}
});



export default class CompanyProfile extends React.Component{
	state = {
		loading: true,
		data: null
	}
	componentDidMount(){Api.mount(this)}
	componentWillUnmount(){Api.unmount(this)}
	refresh(reload = true){
		const parameters = Data.get(this, 'props.navigation.state.params.company')
		if(not.data(parameters)) return this.props.navigation.goBack()
		authorizedState(this, ()=>(Api.get.company(parameters, {reload, storageKey: `company-${parameters.id}`}))).then(response=>{
			if(Api.mounted(this)) this.setState(response)
		})

	}
	render(){
		const data = this.state.data
		const background = Data.get(data, 'headerPictureUrl')
		const logo = Data.get(data, 'pictureUrl')
		const industries = (Data.get(data, 'industries') || []).map(industry=>industry.industryName)
		const companySize = Data.get(data, 'companySize')
		const companyName = Data.get(data, 'companyName')
		const about = Data.get(data, 'about')
		const employees = Data.get(data, 'employed')
		const revenue = Data.get(data, 'revenue')
		const county = Data.get(data, 'counties.0')
		const founded = Data.get(data, 'founded')
		const website = Data.get(data, 'homepage')
		return (<Area refresh={(...input)=>this.refresh(...input)} loading={this.state.loading}>


			<View style={styles.header}>
				{background && <ImageBackground source={{uri: background}} style={styles.backgroundImage}></ImageBackground>}
				{!background && <Gradient name='hitract' type='diagonal'/>}
			</View>

			<Card.Frame header={70} footer={30} style={{paddingHorizontal: 20, top: -50, marginBottom: -33}}>
				<View style={styles.logoView}>
					{logo && <Image source={{uri: logo}} style={styles.logoImage}/>}
				</View>
				<Text style={styles.title}>{companyName}</Text>
				<Text style={styles.subTitle}>Fakta</Text>
				<View>
					{industries.length && <Text description='industry' style={styles.text}>Bransch: <Text style={styles.subText}>{industries.join(', ')}</Text></Text>}
					{employees && <Text description='employees' style={styles.text}>Anstallda: <Text style={styles.subText}>{employees}</Text></Text>}
					{revenue && <Text description='revenue' style={styles.text}>Omsattning: <Text style={styles.subText}>{revenue}</Text></Text>}
					{county && <Text description='Headquarters' style={styles.text}>Huvudkontor: <Text style={styles.subText}>{county.countyName}</Text></Text>}
					{founded && <Text description='founded' style={styles.text}>Grundat: <Text style={styles.subText}>{founded}</Text></Text>}
					{website && <Text description='Website' style={styles.text}>Hemsida: <Text style={styles.link} onPress={()=>Linking.openURL(website)}>{website}</Text></Text>}
				</View>
			</Card.Frame>

			<Card.Frame header={18} footer={30} style={{paddingHorizontal: 20}}>
				<Card.Title>{companyName}</Card.Title>
				<Space/>
				<Text numberOfLines={this.state.seeMoreAbout ? null:7}>{about}</Text>
				<Space />
				<SeeMore component={this} target='seeMoreAbout' />
			</Card.Frame>

			<Space by='double'/>

			{Feed.List(this.state.posts)}

			{this.state.data && <View style={{margin:20}}>{Object.entries(this.state.data).map(mapFieldValue)}</View>}
		</Area>)
	}
}

//scope actions
function authorizedState(component, loader){
	if(Api.authenticated) return loadStateDataSource(loader)
	return {loading: true}
}

async function companyPosts({companyId}){
	const posts = await Feed.Posts()
	return posts.filter(post=>Data.get(post,'object.postAuthor.companyId') === companyId)
}

async function loadStateDataSource(loader){
	let state = {data:null,loading:true}
	try{
		state.data = await loader()
		state.posts = await companyPosts(state.data)
	}
	catch(error){ state.data = null }
	state.loading = state.data === null
	return state
}

function mapFieldValue(entry, index){
	let value = entry[1]
	if(Valid.object(value)){
		try{
			value = JSON.stringify(value, null, 2)
		}
		catch(error){
			value = null
		}

	}
	return (<View key={index} style={{borderBottomWidth: 1, borderBottomColor: 'gray'}}><Text style={{color: 'gray'}}>{entry[0]}: </Text><Text>{value}</Text></View>)
}



