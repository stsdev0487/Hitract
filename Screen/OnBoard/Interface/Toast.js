import React from 'react';
import {Data, Type} from 'Api';
import {View, Button, ToastAndroid} from 'react-native';
//https://test.hitract.se/anvandarvillkor



export default function ToastInterface(Base){
	Base.propTypes = Data.copy({ toastVisible: Type.bool.isRequired },Base.propTypes)
	Base.defaultProps = Data.copy({ toastVisible: true }, Base.defaultProps)
	return class extends Base{

		state = Data.copy(Base.prototype.state, {toastVisible: Base.defaultProps.toastVisible})
		render(){
			return (
				<View style={styles.container}>
					<Toast visible={this.state.visible} message="Example"/>
					<Button title="Toggle Modal" onPress={this.handleButtonPress}/>
				</View>
			);
		}
	}


}

//scope actions
function CookieNotice(props){
	if(props.visible){
		ToastAndroid.showWithGravityAndOffset(
			props.message,
			ToastAndroid.LONG,
			ToastAndroid.BOTTOM,
			25,
			50,
		);
		return null
	}
	return null
}

function onPress(){
	this.setState(
		{
			visible: true,
		},
		()=>{
			this.hideToast();
		},
	);
}
function onDismiss(){
	this.setState({ toastVisible: false })
}