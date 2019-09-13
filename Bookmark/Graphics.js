import * as Data from 'Hitract/Api/Data';
export const Background = {
	mountains: {
		large: require('../images/OnBoard/Background/mountains-double.png')
	},
	party: {
		large: require('../images/OnBoard/Background/party-double.png')
	}
}

export const OnBoard = {
	dark: [
		{
			name: 'community',
			graphic: require('../images/OnBoard/Network/white-double.png')
		},
		{
			name: 'education',
			graphic: require('../images/OnBoard/Education/white-double.png')
		},
		{
			name: 'passion',
			graphic: require('../images/OnBoard/Passion/white-double.png')
		}
	],
	light: [
		{
			name: 'community',
			graphic: require('../images/OnBoard/Network/black-double.png')
		},
		{
			name: 'education',
			graphic: require('../images/OnBoard/Education/black-double.png')
		},
		{
			name: 'passion',
			graphic: require('../images/OnBoard/Passion/black-double.png')
		}
	]
}


export const Ratings = [
	{
		name: 'accommodation',
		source: {uri: 'https://test.hitract.se/resources/assets/img/institution_rating/accomodation.jpg'},
		sv: 'Bostäder',
		value: 'ACCOMODATION'
	},
	{
		name:'brigades',
		source:{uri:'https://test.hitract.se/resources/assets/img/institution_rating/brigades.jpg'},
		sv: 'Studentliv',
		value: 'BRIGADES'
	},
	{
		name: 'businessConnection',
		source: {uri: 'https://test.hitract.se/resources/assets/img/institution_rating/businessConnection.jpg'},
		sv: 'Koppling till näringsliv',
		value: 'BUSINESS_CONNECTION'
	},
	{
		name: 'difficulty',
		source: {uri: 'https://test.hitract.se/resources/assets/img/course_rating/difficulty.jpg'},
		sv: 'Lämplig svårighetsgrad',
		value: 'DIFFICULTY'
	},
	{
		name: 'facilities',
		source: {uri: 'https://test.hitract.se/resources/assets/img/institution_rating/facilities.jpg'},
		sv: 'Lokaler',
		value:'FACILITIES'
	},
	{
		name: 'funny',
		source: {uri: 'https://test.hitract.se/resources/assets/img/course_rating/funny.jpg'},
		sv: 'Rolig',
		value: 'FUNNY'
	},
	{
		name: 'social',
		source: {uri: 'https://test.hitract.se/resources/assets/img/institution_rating/social.jpg'},
		sv: 'Socialt',
		value: 'SOCIAL'
	},
	{
		name: 'teacher',
		source:{uri:'https://test.hitract.se/resources/assets/img/course_rating/teacher.jpg'},
		sv:'Lärarens insats',
		value:'TEACHER'
	},
	{
		name:'tempo',
		source:{uri:'https://test.hitract.se/resources/assets/img/course_rating/tempo.jpg'},
		sv:'Tempo',
		value: 'TEMPO'
	},
	{
		name:'whatLearnt',
		source:{uri:'https://test.hitract.se/resources/assets/img/course_rating/whatLearnt.jpg'},
		sv:'Givande',
		value:'WHAT_LEARNT'
	}
]
Ratings.get = getRating
Ratings.graphic = getRatingGraphic
Ratings.title = getRatingTitle

//scope actions
function getRating(ratingType){
	return this.filter(filter)[0]
	//scope actions
	function filter({value}){ return value === ratingType }
}

function getRatingGraphic(ratingType){ return Data.get(this.get(ratingType), 'source') || {uri: Background.mountains.large} }
function getRatingTitle(ratingType){ return Data.get(this.get(ratingType), 'sv') || 'omdöme' }
