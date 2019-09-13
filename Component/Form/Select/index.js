import React, {AppRegistry, StyleSheet, Text, ScrollView} from 'react-native';
import Panel from './Panel';  // Step 1
const stylesheet = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f4f7f9',
		paddingTop: 30
	},

});
export default class FieldsetSelect extends React.Component{
	render(){
		return (  //Step 2
			<ScrollView style={stylesheet.container}>
				<Panel title="A Panel with short content text">
					<Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
				</Panel>
				<Panel title="A Panel with long content text">
					<Text>Lorem ipsum...</Text>
				</Panel>
				<Panel title="Another Panel">
					<Text>Lorem ipsum dolor sit amet...</Text>
				</Panel>
			</ScrollView>
		);
	}
};

