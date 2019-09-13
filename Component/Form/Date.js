import React from 'react';
import {DatePickerAndroid, DatePickerIOS, View} from 'react-native';
//https://facebook.github.io/react-native/docs/datepickerios
//https://facebook.github.io/react-native/docs/datepickerandroid

export default class DatePicker extends React.Component{
	constructor(props){
		super(props);
		this.state = {chosenDate: new Date()};

		this.setDate = this.setDate.bind(this);
	}

	setDate(newDate){
		this.setState({chosenDate: newDate});
	}

	render(){
		return (
			<View style={styles.container}>
				<DatePickerIOS
					date={this.state.chosenDate}
					onDateChange={this.setDate}
				/>
			</View>
		);
	}
}




function androidDatePicker(){

}

function iosDatePicker(){

}





function getDatePicker(){
	return {
		android: androidDatePicker,
		ios: iosDatePicker
	}
}