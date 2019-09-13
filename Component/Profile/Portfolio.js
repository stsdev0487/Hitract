import React from 'react';
import {StyleSheet, Image, Text, View} from 'react-native';
import {Col, Grid} from 'react-native-easy-grid';
import Card from '../Card';
import {Tags} from '../List';
import {Edit} from '../Action';
import {avatar} from 'Hitract/Bookmark';
import {align, font, color, letting} from 'Hitract/UI';
import Api, {Data,Type,Valid} from 'Hitract/Api';
import {Account,Screen} from 'Hitract/App';

const thumbnailFrame = {
	height: 62, width: 62,
	get borderRadius(){ return this.width / 2 },
}

const ui = StyleSheet.create({
	label: {
		color: color.grayLight,
		fontSize: font.standard,
		marginLeft: letting.line,
		marginRight: letting.single
	},
	thumbnail: {
		...thumbnailFrame,
		flexShrink: 0,
		minWidth: 62,
		maxWidth: 62,
		minHeight: 62,
		maxHeight: 62
	},
	thumbnailView: {
		...thumbnailFrame,
		backgroundColor: color.white,
		shadowColor: color.shadow,
		shadowOffset: {width: 0, height: 2},
		shadowRadius: 2.7,
		shadowOpacity: 0.6,
		marginRight: letting.medium
	},
})


//exports
export default class Portfolio extends React.Component{
	static defaultProps = { workExperiences: [] };
	static identifier = 'Portfolio';
	static propTypes = { workExperiences: Type.array.isRequired };
	state = { }
	render(){
		const screen = Screen[this.constructor.identifier]
		const {workExperiences} = this.props
		return (<Card.Frame>
			<Card.Header>
				<Card.Title>{screen.label}</Card.Title>
				<Edit component={this} tab={screen.tab}/>
			</Card.Header>

			<Text style={ui.label}>{Account.personal.experiences}</Text>

			<View style={{marginTop:letting.standard}}>
			{workExperiences.map(item=>{
				return (<View key={item.id} style={{marginTop: letting.standard}}>
					<Grid>
						<Col size={30} style={{alignItems: align.end}}>
							<View style={ui.thumbnailView}>
								<Image source={{uri: Api.url(Data.get(item,'company.pictureUrl'))}}
									   defaultSource={{uri:avatar}}
									   style={ui.thumbnail}/>
							</View>
						</Col>
						<Col size={70} style={{paddingLeft: letting.minor}}>
							<Text numberOfLines={1} style={{fontSize: font.print, color: color.grayLight}}>
								{item.workExperienceRole}
							</Text>
							<Text numberOfLines={1} style={{fontSize: font.print, color: color.grayWhite}}>
								{item.workExperienceCompany}
							</Text>
							<Text numberOfLines={1} style={{fontSize: font.single, color: color.grayWhite}}>
								{getDateRange(item)}
							</Text>
							<Tags items={item.metadatas} item={item=>item.metadataName}></Tags>
						</Col>
					</Grid>
				</View>)
			})}
			</View>
		</Card.Frame>)
	}
}

//scope actions
function getDateRange(item){
	const range = [new Date(item.workExperienceFrom), item.onGoing ? new Date():new Date(item.workExperienceTo)]
	return range.map(date=>Valid(date) ? `${date.getMonth() + 1}/${date.getFullYear()}`:null).filter(Valid.text).join(' - ')
}
