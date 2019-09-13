import React from 'react';
import {Image, StyleSheet, Text, View} from "react-native";
import {Area, Card, Topics, CourseTopicDataset} from 'Hitract/Component';
import {align, color, font, layer, letting} from 'Hitract/UI';
import Api,{Type} from 'Hitract/Api';

import sample from './course'

console.log({sample})
export default class TopicsTest extends React.Component{
	state = {}
	componentDidMount(){
		this.state = {
			topics: new CourseTopicDataset(sample.courseTopics)
		}
	}
	render(){
		const topics = new CourseTopicDataset(sample.courseTopics)
		return (<Area loading={false}>
			{this.state.topics || <Topics topics={topics} />}

		</Area>)
	}
}

//scope actions
