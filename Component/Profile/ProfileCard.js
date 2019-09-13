import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {align, color, font, layer, letting} from 'Hitract/UI';
import {Buddies, Tags} from '../List'
import {Edit, SeeMore} from '../Action';
import Card from '../Card';
import {Space} from '../Design';
import Api, {Data, Type} from 'Hitract/Api';
import {Account, Career, Screen} from 'Hitract/App';
import {avatar} from 'Hitract/Bookmark';

const ui = StyleSheet.create({
	avatar: {
		alignSelf: align.center,
		borderColor: color.white,
		height: 120,
		get borderRadius(){ return this.height / 2 },
		borderWidth: 5,
		get marginTop(){ return this.height / -2 },
		position: layer.absolute,
		get width(){ return this.height }
	},
	component: {
		paddingTop: 0,
		marginTop: -40
	},
	detail: {
		alignSelf: align.center,
		fontSize: font.print,
		color: color.gray
	},
	edit: {marginTop: letting.single, marginRight: letting.single},
	header: {paddingLeft: letting.medium, paddingRight: letting.standard},
	name: {
		alignSelf: align.center,
		marginTop: letting.single,
		fontSize: font.large
	},
	unverified: {
		alignSelf: align.center,
		marginTop: letting.double,
		color: color.red
	},
	verified: {
		alignSelf: align.center,
		marginTop: letting.double,
		color: color.azureBlue
	}
})

//exports
export default class ProfileCard extends React.Component{
	static defaultProps = {
		buddies: [],
		companySizes: [],
		employmentTypes: [],
		counties: [],
		primaryInstitution: null,
		studentIndustries: [],
		verified: false
	}
	static identifier = 'ProfileCard';
	static propTypes = {
		buddies: Type.array,
		companySizes: Type.array,
		employmentTypes: Type.array,
		counties: Type.array,
		primaryInstitution: Type.object,
		studentIndustries: Type.array,
		verified: Type.bool.isRequired
	}
	state = {seeMore:false}
	render(){
		const screen = Screen[this.constructor.identifier]
		const {buddies, primaryInstitution, studentIndustries, companySizes, employmentTypes, counties, verified} = this.props
		const {user} = Api.account
		const total = studentIndustries.length + companySizes.length + employmentTypes.length + counties.length
		const seeMore = this.state.seeMore === true
		const institutionName = Data.get(primaryInstitution, 'institutionName')

		return (<Card.Frame style={ui.component}>

			<Image source={{uri: Api.url(user.pictureUrl)}}
				   defaultSource={{uri:avatar}}
				   style={ui.avatar}/>

			<Edit component={this} tab={screen.tab} style={ui.edit} />

			<View style={ui.header}>
				<Space />
				{verified === true && <Text style={ui.verified}>{Account.verified}</Text>}
				{verified === false && <Text style={ui.unverified}>{Account.unverified}</Text>}
				<Text style={ui.name}>{user.firstName} {user.lastName}</Text>
				{institutionName && <Text style={ui.detail}>{institutionName}</Text>}
				<Space/>
				<Buddies buddies={buddies}/>

				<Card.Label style={{marginBottom: letting.standard}}>{Account.personal.message.lookingForMe}</Card.Label>

				<Tags label={Career.Business.category} item={item=>item.industryName} items={studentIndustries}></Tags>

				{seeMore && <Tags label={Career.Business.size} item={onCompanySize}  items={companySizes}></Tags>}

				{seeMore && <Tags label={Career.Business.employment}  items={employmentTypes}></Tags>}

				{seeMore && <Tags label={Career.Business.regions} item={item=>item.countyName} items={counties}></Tags>}
			</View>

			<View style={{height: letting.standard}}></View>

			{total>0 && <SeeMore component={this} />}

		</Card.Frame>)
	}
}

//scope actions
function onCompanySize(item){ return item in Career.Business.sizes ? Career.Business.sizes[item]:item }