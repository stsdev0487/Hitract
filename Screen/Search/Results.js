import React from 'react';
import {StyleSheet, TouchableNativeFeedback as Touch, Text, View} from "react-native";
import {Area} from 'Hitract/Component';
import {align, color, font, layer, letting} from 'Hitract/UI';
import Api,{Type} from 'Hitract/Api';

const ui = StyleSheet.create({})

export default class OnBoard extends React.Component{
	render(){
		return (<Area>
				<View>
					<Text>Search Results</Text>
				</View>
			</Area>)
	}
}