import React, {Fragment} from 'react';
import {SafeAreaView, StyleSheet, View, Text, ImageBackground, Image} from 'react-native';
import {Fonts, Colors} from '../themes';
import {Area,Box, Action, Gradient, Card, Rating, Space, SeeMore, Topic, UniversityModel} from 'Hitract/Component';
import Api, {Data, Valid, not} from 'Hitract/Api';
import  {align} from 'Hitract/UI';
import {Network} from 'Hitract/App';
import GraphicMetadata from '../../GraphicMetadata';

const styles = StyleSheet.create({
	backgroundImage: {
		width: '100%',
		height: 200,
		resizeMode: 'contain',
		position: 'absolute',
		top: 0
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
		backgroundColor: 'white',
		alignSelf: 'center',
		borderRadius: 20,
		overflow: 'hidden'
	},
	logoImage: {
		width: 106,
		height: 106,
		borderRadius: 20,
		padding:10,
		resizeMode:'contain'
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



export default class UniversityProfile extends React.Component{
	state = {loading: true, data: null,seeMore:false}
	componentDidMount(){Api.mount(this)}
	componentWillUnmount(){Api.unmount(this)}
	refresh(reload = true){
		const parameters = Data.get(this, 'props.navigation.state.params.university')
		if(not.data(parameters)) return this.props.navigation.goBack()
		authorizedState(this, ()=>(Api.get.university(parameters, {reload,storageKey:`university-${parameters.id}`}))).then(response=>{
			if(Api.mounted(this)) this.setState(response)
		})

	}
	render(){
		const {data} = this.state
		const {navigation} = this.props
		const background = Data.get(data, 'pictureUrl')
		const logo = Data.get(data, 'logo')
		const name = Data.get(data, 'institutionName')
		const about = Data.get(data, 'description')
		const ratings = Data.get(data, 'ratings')
		const institutionTopics = Data.get(data, 'institutionTopics')
		const institutionRatings = Data.get(data, 'institutionRatings')
		const averageScore = Data.get(data, 'averageScore')
		const website = Data.get(data, 'homepage')
		const university = new UniversityModel(data)
		return (<Area refresh={(...input)=>this.refresh(...input)} loading={this.state.loading}>
			<View style={styles.header}>
				{background && <ImageBackground source={{uri: Api.url(background)}} style={styles.backgroundImage}></ImageBackground>}
				{!background && <Gradient name='hitract' type='diagonal'/>}
				<GraphicMetadata title={university.pictureDescription} />
			</View>

			<Card.Frame header={70} footer={30} style={{paddingHorizontal: 20, top: -50, marginBottom: -33}}>
				<View style={styles.logoView}>{logo && <Image source={{uri: Api.url(logo)}} style={styles.logoImage}/>}</View>
				<Text style={styles.title}>{name}</Text>
				<Space/>
				<Rating.Stars disabled value={university.averageScore}/>
				<Space/>
				<Text numberOfLines={this.state.seeMore ? null:5}>{about}</Text>
				<Space/>
				<SeeMore component={this} target='seeMore'/>
			</Card.Frame>

			<Topic.Card header={18} footer={30}
						title='Frågor och svar'
						label='Senaste frågorna'
						items={university.topics}
						onItem={onTopicItem}
						renderItem={renderTopic}>
				<Action flex onPress={onTopics}>Se alla frågor</Action>
				<Space/>
				<Action flex active onPress={onTopicCreate}>Ställ en fråga</Action>
			</Topic.Card>


			<Card.Frame header={18}>
				<Card.Content card><Card.Title>{Network.University.rating}</Card.Title></Card.Content>
				<Space by='median'/>
				<Rating ratings={university.ratings}/>
				<Space by='median'/>
				<Card.Content card>
					<Box x center style={{justifyContent: align.center}}>
						<Action shadow active onPress={onReview}>{Network.Rate.review}</Action>
					</Box>
					<Space by='median'/>
					<Card.Label description='Written evaluations'>Skriftliga utvärderingar...</Card.Label>
				</Card.Content>

			</Card.Frame>


			{this.state.data && <View style={{margin: 20}}>{Object.entries(this.state.data).map(mapFieldValue)}</View>}
		</Area>)
		//scope actions
		function onReview(){
			navigation.navigate('Rate', {title: university.name, model: university})
		}

		function onTopicCreate(){
			navigation.navigate('UniversityTopicCreate', {university})
		}

		function onTopicItem(topic){
			navigation.navigate('Topic', {topic})
		}

		function onTopics(){
			navigation.navigate('Topics', {
				topics: university.topics,
				description: `Alla frågor och svar för ${university.institutionName}`,
				title: 'Frågor och svar'
			})
		}

		function renderTopic(topic){
			return topic.header
		}
	}
}

//scope actions

function authorizedState(component, loader){
	if(Api.authenticated) return loadStateDataSource(loader)
	return {loading: true}
}

async function loadStateDataSource(loader){
	let data = null
	try{ data = await loader() }
	catch(error){ data = null }
	return {loading: data === null, data}
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