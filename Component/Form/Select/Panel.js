import React, {StyleSheet, Text, View, Image, TouchableHighlight, Animated} from 'react-native'; //Step 1
const stylesheet = StyleSheet.create({
	container: {
		backgroundColor: '#ffffff',
		margin: 10,
		overflow: 'hidden'
	},
	titleContainer: {
		flexDirection: 'row'
	},
	title: {
		flex: 1,
		padding: 10,
		color: '#2a2f43',
		fontWeight: 'bold'
	},
	button: {},
	buttonImage: {
		width: 30,
		height: 25
	},
	body: {
		padding: 10,
		paddingTop: 0
	}
});

export default class Panel extends React.Component{
	constructor(props){
		super(props);

		this.icons = {
			'up': 'expand-less',
			'down': 'expand-more'
		};

		this.state = {
			title: props.title,
			expanded: true,
			animation: new Animated.Value()
		};
	}

	toggle(){
		let initialValue = this.state.expanded ? this.state.maxHeight + this.state.minHeight:this.state.minHeight,
			finalValue = this.state.expanded ? this.state.minHeight:this.state.maxHeight + this.state.minHeight;

		this.setState({
			expanded: !this.state.expanded
		});

		this.state.animation.setValue(initialValue);
		Animated.spring(
			this.state.animation,
			{
				toValue: finalValue
			}
		).start();
	}
	render(){
		let icon = this.icons['down'];

		if(this.state.expanded){
			icon = this.icons['up'];
		}

		return (
			<Animated.View style={[stylesheet.container, {height: this.state.animation}]}>
				<View style={stylesheet.titleContainer} onLayout={setMinimumHeight.bind(this)}>
					<Text style={stylesheet.title}>{this.state.title}</Text>
					<TouchableHighlight
						style={stylesheet.button}
						onPress={this.toggle.bind(this)}
						underlayColor="#f1f1f1">
						<Image
							style={stylesheet.buttonImage}
							source={icon}
						></Image>
					</TouchableHighlight>
				</View>

				<View style={stylesheet.body} onLayout={setMaximumHeight.bind(this)}>
					{this.props.children}
				</View>

			</Animated.View>
		);
	}

}

//scope actions
function setMinimumHeight(){
	this.setState({
		minHeight: event.nativeEvent.layout.height
	});
}
function setMaximumHeight(){
	this.setState({
		maxHeight: event.nativeEvent.layout.height
	});

}