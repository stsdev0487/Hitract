import React from 'react';
import {StyleSheet,ScrollView, Image, Text, View, TouchableOpacity as Touch} from 'react-native';
import Api, {Type, Data} from 'Hitract/Api';
import {align, color, font, layer, letting} from 'Hitract/UI';
import {Layout} from '../Design';
import Card from '../Card';
import {Edit, SeeMore} from '../Action';
import {Career,Screen} from 'Hitract/App';
import Bookmark from 'Hitract/Bookmark';

import mocks from './samples/profile'

const ui = StyleSheet.create({

	center: {
		paddingRight: letting.medium,
		textAlign: align.left,
		fontSize: font.standard,
		color: color.gray
	},
	component: {
		...layer.radius[0],
		flexDirection: align.row,
		alignItems: align.center,
		backgroundColor: color.whiteShade,
		height: 33,
		marginTop: letting.standard
	},
	institution: {
		alignItems: align.center,
		flexDirection: align.row,
		flexShrink: 0,
		minWidth: 220
	},
	label: {
		color: color.grayLight,
		fontSize: font.standard,
		marginLeft: letting.line,
		marginRight: letting.single
	},
	left: {
		paddingLeft: letting.line,
		textAlign: align.right,
		fontSize: font.standard,
		color: color.gray
	},
	right: {
		paddingRight: letting.line,
		textAlign: align.left,
		fontSize: font.standard,
		color: color.gray
	},
	thumbnail: {
		flexShrink:0,
		minWidth: 45,
		maxWidth:45,
		width: 45,
		height: 45,
		minHeight: 45,
		maxHeight: 45,
		marginLeft: letting.half
	}
})

export default class Courses extends React.Component{
	static defaultProps = {
		studentCourses: [],
		institutions: []
	};
	static identifier = 'Courses';
	static propTypes = {
		studentCourses: Type.array,
		institutions: Type.array
	};

	state = {seeMore:false}
	onPress(screen, detail){
		this.props.navigation.navigate(screen, detail)
	}
	render(){
		const screen = Screen[this.constructor.identifier]
		const studentCourses = Data.get(this,'props.studentCourses.length') ? this.props.studentCourses:mocks.studentCourses
		const institutions = Data.get(this, 'props.institutions.length') ? this.props.institutions:mocks.institutions
		const total = studentCourses.length
		const courses = studentCourses.slice(0, this.state.seeMore !== true ? 7:studentCourses.length)

		return (<Card.Frame>
			<Card.Header>
				<Card.Title>{screen.label}</Card.Title>
				<Edit component={this} tab={screen.tab}/>
			</Card.Header>

			<InstitutionList onPress={this.onPress.bind(this)} institutions={institutions}/>
			<CourseList onPress={this.onPress.bind(this)} type={'extraInterest'} courses={courses.filter(item=>item.important)}/>
			<CourseList onPress={this.onPress.bind(this)} type={'interest'} courses={courses.filter(item=>item.important !== true)}/>

			<View style={{height: letting.standard}}></View>
			{total>0 && <SeeMore component={this} />}
		</Card.Frame>)
	}
}


//scope actions
function InstitutionCourse(props){
	return (<Touch key={props.index} onPress={props.onPress} style={ui.institution}>
		<Image source={{uri: Api.url(props.smallImageUrl)}} style={ui.thumbnail}/>
		<Text style={{fontSize: 13, color: color.grayLight}}>{props.institutionName}</Text>
	</Touch>)
}

function InstitutionList(props){
	if(props.institutions.length === 0) return null
	return ([
		<Text key={`institutions-label`} style={[ui.label, {marginTop: letting.medium, marginBottom: letting.standard}]}>{Career.Course.studying}</Text>,
		 <Card.Content key={'institutions'}>
			 <ScrollView horizontal={true} style={{flexDirection: 'row'}}>
				 {props.institutions.map((item, index)=>(<InstitutionCourse
					 key={index}
					 index={index}
					 onPress={()=>props.onPress(Bookmark.University, {university:item})}
					 {...item}
				 />))}
			 </ScrollView>
		 </Card.Content>
	])
}

function CourseList(props){
	const type = props.type
	if(props.courses.length === 0) return null
	return ([
		<Text key={`${type}-label`} style={[ui.label, {marginTop: letting.medium, marginBottom: letting.standard}]}>{Career.Course[type]}</Text>,
		<Card.Content key={type}>
			{props.courses.map((item,index)=>(<CourseItem
				key={index}
				index={index}
				item={item}
				onPress={()=>props.onPress(Bookmark.Course, item)}
				type={type}  />))}
		</Card.Content>
	])
}


function CourseItem({item,type,index, onPress}){
	const key = `${type}-${index}`
	const institutionName = Data.get(item,'course.institution.institutionShortName')
	const courseCode = Data.get(item, 'course.courseCode')
	const title = Data.get(item, 'course.titleSv')
	return (<Touch onPress={onPress} key={key} style={ui.component}>{Layout.columnLayout({
		items: [
			{
				attributes: {size: 2},
				children: [<Text key='left' style={ui.left}>{courseCode} - </Text>]
			}, {
				attributes: {size: 6},
				children: [<Text numberOfLines={1} key='center' style={ui.center}> {title}</Text>]
			}, {
				attributes: {size: 1},
				children: [<Text numberOfLines={1} key='right' style={ui.right}>{institutionName}</Text>]
			}
		]
	})}</Touch>)
}



