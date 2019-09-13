import React from 'react';
import {Alert} from 'react-native';
import DocumentModal from '../Modal';
import {OnBoard} from 'Hitract/App';
import {source} from './HTML';


export default class Index{
	static show = showDocument
	static Document = Document
}



//scope actions
function Document(props){
	return (<DocumentModal source={{html:source}} {...props}   />)
}

function showDocument(){

	return new Promise(onShowDocumentPromise)
	//scope actions
	function onShowDocumentPromise(success,failed){
		Alert.alert(
			OnBoard.Cookies.tagLine,
			OnBoard.Cookies.notice,
			[
				{text: OnBoard.Cookies.learnMore, onPress: onLearnMore},
				{text: 'Cancel', onPress: onCancel, style: 'cancel'},
				{text: OnBoard.Cookies.accept, onPress: onAccept},
			],
			{cancelable: false},
		);

		//scope actions
		function onLearnMore(){
			success({learnMore:true})
		}

		function onCancel(){
			success({canceled: true})
		}

		function onAccept(){
			success({accepted: true})
		}
	}
}

