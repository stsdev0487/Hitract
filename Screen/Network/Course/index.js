import React from 'react';
import {SafeAreaView, StyleSheet, View, Text, ImageBackground, Linking, Image, Dimensions} from 'react-native';
import {Colors} from '../Institution/themes';
import {Action, Area, Gradient, Card, CourseModel, Rating, Space, SeeMore, Hit, Topic, Box, FileViewer} from 'Hitract/Component';
import Api, {Data, Valid,not} from 'Hitract/Api';
import {align,font,color} from 'Hitract/UI';
import {Network} from 'Hitract/App';
import RelatedCourses from './RelatedCourses';
import GraphicMetadata from '../GraphicMetadata';

//MOCKED DATA
import MOCKED_DATA from './mocks';

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
		padding: 10,
		resizeMode: 'contain'
	},
	title: {
		fontSize: font.large,
		color: color.black,
		textAlign: align.center,
	},
	subTitle: {
		fontSize: font.print,
		color: color.black,
		textTransform:'capitalize',
		...font.serif
	},
	text: {
		fontSize: font.standard,
		color: color.grayLight,
		...font.serif
	},
	subText: {
		color: Colors.dark,
	},
	link: {
		color: Colors.lightBlue,
	},
	logo:{
		height:33,
		width:33,
		resizeMode:'contain',
		borderRadius: 33/2,
		overflow:'hidden'
	}
});

const Preset = {
	description: 'Beskrivning saknas '
}

//exports
export default class CourseProfile extends React.Component{

	state = {
		loading: true,
		data: null,
		items:MOCKED_DATA.items,
		seeMore: false
	}
	componentDidMount(){Api.mount(this)}
	componentWillUnmount(){Api.unmount(this)}
	refresh(reload = true){
		const parameters = Data.get(this, 'props.navigation.state.params.course')
		if(not.data(parameters)) return this.props.navigation.goBack()
		authorizedState(this, ()=>Api.get.course(parameters, {reload,storageKey:`course-${parameters.id}`})).then(response=>{
			if(Api.mounted(this)) this.setState(response)
		})
	}
	render(){
		const {navigation} = this.props
		const {data,items} = this.state
		const name = Data.get(data, 'titleSv') || Data.get(data, 'titleEn')
		const code = Data.get(data, 'courseCode')
		const institution = Data.get(data, 'institution')
		const institutionLogo = Data.get(data, 'institution.smallImageUrl')
		const institutionName = Data.get(data, 'institution.institutionName')
		const credits = Data.get(data, 'credits')
		let logo = institutionLogo ? Api.url(institutionLogo):null
		if(logo && logo.endsWith('/')) logo = logo.slice(0, logo.length - 1)

		const course = new CourseModel(data)
		const description = course.description || Preset.description
		const descriptionCount = description === Preset.description ? 1:5
		const descriptionLines = descriptionCount > 1 && this.state.seeMore ? null:descriptionCount

		const background = course.pictureUrl || course.randomMetadataImageUrl
		const graphicMetadata = getGraphicMetadata()

		return (<Area refresh={(...input)=>this.refresh(...input)} loading={this.state.loading}>

			<View style={styles.header}>
				{background && <ImageBackground source={{uri: Api.url(background)}} style={styles.backgroundImage}></ImageBackground>}
				{!background && <Gradient name='hitract' type='diagonal'/>}
				<GraphicMetadata {...graphicMetadata}/>
			</View>

			<Card.Frame header={20} footer={30} style={{paddingHorizontal: 20, top: -50, marginBottom: -33}}>
				<Text style={styles.title}>{name}{code && <Text> ({code})</Text>}{credits && <Text>- {credits}</Text>}</Text>
				<Space by='single' />
				<Rating.Stars disabled value={course.averageScore}/>
				<Space by='medium'/>
				<Text style={styles.subTitle}>beskrivning...</Text>
				<Text numberOfLines={descriptionLines} style={styles.text}>{description}</Text>
				<Space/>
				{descriptionCount > 1 && <SeeMore component={this} target='seeMore'/>}

				<Space by='medium'/>
				<Text style={styles.subTitle}>Kursen ges på...</Text>
				<Space />

				<Hit avatar={logo}
					 medium
					 label={institutionName}
					 onPress={()=>navigation.navigate('University', {university: institution})}/>

			</Card.Frame>

			<Topic.Card header={18} title='Frågor och svar' label='Senaste frågorna'
						items={course.topics} onItem={onTopicItem} renderItem={renderTopic}>
				<Action flex onPress={onTopics}>Se alla frågor</Action>
				<Space/>
				<Action flex active onPress={onTopicCreate}>Ställ en fråga</Action>
			</Topic.Card>

			<Card.Frame header={18} footer={30} description='In-depth university evaluation'>
				<Card.Content card><Card.Title>{Network.Course.rating}</Card.Title></Card.Content>
				<Space by='median'/>
				<Rating ratings={course.ratings}/>
				<Space by='median'/>
				<Card.Content card>
					<Box x center style={{justifyContent: align.center}}>
						<Action shadow active onPress={onReview}>{Network.Rate.review}</Action>
					</Box>
					<Space by='median'/>
					<Card.Label>Skriftliga utvärderingar...</Card.Label>
				</Card.Content>
			</Card.Frame>

			<FileViewer header={18} footer={30} style={{paddingHorizontal: 20}}></FileViewer>

			<RelatedCourses style={{flex: 1}} currentSelectIndex={0} data={items}/>

			{this.state.data && <View style={{margin: 20}}>{Object.entries(this.state.data).map(mapFieldValue)}</View>}
		</Area>)

		//scope actions
		function getGraphicMetadata(meta={description:null, title:null}){
			const randomImage = course.randomMetadataImageUrl
			const data = course.metadata
			if(Array.isArray(data)){
				for(const item of data){
					if('metadataImages' in item){
						for(const image of item.metadataImages){
							if(image.imageUrl === randomImage){
								if(Data.has(image, 'wikilinkDisplayName')) meta.title = image.wikilinkDisplayName
								if(Data.has(image, 'tagline')) meta.description = image.tagline
								break
							}
						}
					}
				}
			}
			return meta
		}

		function onReview(){ navigation.navigate('Rate', {title: course.name, model: course}) }

		function onTopicCreate(){ navigation.navigate('CourseTopic', {course}) }

		function onTopicItem(topic){ navigation.navigate('Topic', {topic}) }

		function onTopics(){
			navigation.navigate('Topics', {
				topics: course.topics,
				description: `Alla frågor och svar för ${course.name}`,
				title: 'Frågor och svar'
			})
		}

		function renderTopic(topic){ return topic.header }
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
		try{ value = JSON.stringify(value, null, 2) }
		catch(error){ value = null }
	}
	return (<View key={index} style={{borderBottomWidth: 1, borderBottomColor: 'gray'}}><Text style={{color: 'gray'}}>{entry[0]}: </Text><Text>{value}</Text></View>)
}