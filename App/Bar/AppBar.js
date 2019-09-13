import React from 'react';
import {Animated, Dimensions, Text,InteractionManager, LayoutAnimation, StyleSheet, PanResponder, View} from 'react-native';
import NavigationStyle from '../Navigation/NavigationStyle.js'


//Style Sheet
export default class AppBar extends React.Component{
	constructor(props){
		super(props);
		this._panResponder = PanResponder.create({
			// Ask to be the responder:
			onStartShouldSetPanResponder: (evt, gestureState)=>true,
			onStartShouldSetPanResponderCapture: (evt, gestureState)=>true,
			onMoveShouldSetPanResponder: (evt, gestureState)=>true,
			onMoveShouldSetPanResponderCapture: (evt, gestureState)=>true,

			onPanResponderGrant: (evt, gestureState)=>{
				// The gesture has started. Show visual feedback so the user knows
				// what is happening!
				// gestureState.d{x,y} will be set to zero now

			},
			// The most recent move distance is gestureState.move{X,Y}
			// The accumulated gesture distance since becoming responder is
			// gestureState.d{x,y}
			onPanResponderMove: Animated.event([null, {dx: this._panX}],
				// gestureState arg
				{listener: (event, gestureState)=>{
					this.setState({
						x:gestureState.moveX,
						y:gestureState.moveY
					})
				}
			}),


			onPanResponderTerminationRequest: (evt, gestureState)=>true,
			onPanResponderRelease: (evt, gestureState)=>{
				// The user has released all touches while this view is the
				// responder. This typically means a gesture has succeeded
			},
			onPanResponderTerminate: (evt, gestureState)=>{
				// Another component has become the responder, so this gesture
				// should be cancelled
			},
			onShouldBlockNativeResponder: (evt, gestureState)=>{
				// Returns whether this component should block native components from becoming the JS
				// responder. Returns true by default. Is currently only supported on android.
				return true;
			},
		});
	}
	roundIn(){
		return Animated.timing(// Animate value over time
			this.state.fadeAnim, {toValue: 1} // Animate to final value of 1 },
		).start(); // Start the animation
	}
	roundIn(){
		return Animated.timing(// Animate value over time
			this.state.fadeAnim, {toValue: 1} // Animate to final value of 1 },
		).start(); // Start the animation
	}
	state = {scale:1,y:0}
	render(){
		//const backgroundColor: 'blue'
		//const width = null
		//const height = 104
		return <View style={NavigationStyle} {...this._panResponder.panHandlers}>

		</View>
		const {height, width} = Dimensions.get('window')
		return <Animated.ScrollView  scrollEventThrottle={1}>
			<Animated.View style={{transform: [{scale: this.state.scale},{rotateY: `${this.state.y}deg`},{rotateX: `${-this.state.x}deg`},{perspective: 100}]}}>
				<Text style={{padding:20, fontSize:40, backgroundColor:'rgba(39,200,399,0.5)'}}>LEFT</Text>
			</Animated.View>
		</Animated.ScrollView>;
	}
}
// without this line this Animation will not render on Android while working fine on iOS
//scope actions
//<-- Use the Animated ScrollView wrapper
// <-- Use 1 here to make sure no events are ever missed

function fadeOut(){
	return Animated.timing(// Animate value over time
		this.state.fadeAnim, {toValue: 1} // Animate to final value of 1 },
	).start(); // Start the animation
}
